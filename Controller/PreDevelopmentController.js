const {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
} = require('../Dao/PreDevelopmentDao.js');

// Create About Banner (with image upload)
const createAboutBannerController = async (req, res) => {
    try {
        // Step 1: Extract base fields
        const banner = {
            sub_heading: req.body.sub_heading,
            banner_image: req.files?.banner_image ? req.files.banner_image[0].filename : null,
            status: req.body.status || 1,
            overview_text: req.body.overview_text || '',
            page_type: req.body.page_type || '',
            overview_image: req.files?.overview_image ? req.files.overview_image[0].filename : null,
            our_projects: req.body.our_projects || '',
        };

        // Step 2: Validate required fields
        if (!banner.sub_heading) {
            return res.status(400).json({ success: false, message: 'Sub-heading is required' });
        }
        if (!banner.banner_image) {
            return res.status(400).json({ success: false, message: 'Banner image is required' });
        }

        // Step 3: Parse JSON fields safely
        let key_highlights = [];
        let our_approach = [];

        try {
            if (req.body.key_highlights) {
                key_highlights = JSON.parse(req.body.key_highlights);
            }
            if (req.body.our_approach) {
                our_approach = JSON.parse(req.body.our_approach);
            }
        } catch (err) {
            console.error('Error parsing JSON fields:', err);
        }

        // Step 4: Collect approach images (if uploaded)
        const approachImages = [];
        if (req.files) {
            Object.keys(req.files).forEach((key) => {
                if (key.startsWith('approach_image_')) {
                    approachImages.push(req.files[key][0].filename);
                }
            });
        }

        // Step 5: Build full data object
        const aboutBannerData = {
            ...banner,
            key_highlights: JSON.stringify(key_highlights),
            our_approach: JSON.stringify(
                our_approach.map((item, index) => ({
                    ...item,
                    image: approachImages[index] || null,
                }))
            ),
        };

        // Step 6: Save in DB via DAO
        const id = await createAboutBanner(aboutBannerData);

        res.json({
            success: true,
            message: 'About banner created successfully',
            id,
        });
    } catch (error) {
        console.error('Error creating About banner:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get all About Banners
const getAllAboutBannerController = async (req, res) => {
    try {
        const banners = await getAllAboutBanners();
        res.json({ success: true, banners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get About Banner by ID
const getAboutBannerByIdController = async (req, res) => {
    try {
        const banner = await getAboutBannerById(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, message: 'About banner not found' });
        }
        res.json({ success: true, banner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update About Banner
const updateAboutBannerController = async (req, res) => {
    try {
        // ✅ Prepare updated data object
        const updatedData = {
            sub_heading: req.body.sub_heading,
            overview_text: req.body.overview_text,
            status: req.body.status,
            page_type: req.body.page_type,
        };

        // ✅ Handle overview image
        if (req.files?.overview_image?.[0]) {
            updatedData.overview_image = req.files.overview_image[0].filename;
        }

        // ✅ Handle banner image (top section)
        if (req.files?.banner_image?.[0]) {
            updatedData.banner_image = req.files.banner_image[0].filename;
        }

        // ✅ Handle Key Highlights (JSON array)
        if (req.body.key_highlights) {
            try {
                updatedData.key_highlights = JSON.stringify(
                    typeof req.body.key_highlights === "string"
                        ? JSON.parse(req.body.key_highlights)
                        : req.body.key_highlights
                );
            } catch (err) {
                console.warn("Invalid JSON for key_highlights:", err);
                updatedData.key_highlights = "[]";
            }
        }

        // ✅ Handle Our Approach (images + text + heading)
        const approaches = [];
        if (req.body.our_approach) {
            try {
                const parsedApproach =
                    typeof req.body.our_approach === "string"
                        ? JSON.parse(req.body.our_approach)
                        : req.body.our_approach;

                parsedApproach.forEach((item, index) => {
                    const imageFile =
                        req.files && req.files[`approach_image_${index}`]
                            ? req.files[`approach_image_${index}`][0].filename
                            : item.image || null;

                    approaches.push({
                        heading: item.heading,
                        text: item.text,
                        image: imageFile,
                    });
                });
            } catch (err) {
                console.warn("Invalid JSON for our_approach:", err);
            }
        }

        if (approaches.length > 0) {
            updatedData.our_approach = JSON.stringify(approaches);
        }

        // ✅ Update DB
        const result = await updateAboutBannerById(req.params.id, updatedData);

        if (result === 0) {
            return res
                .status(404)
                .json({ success: false, message: "About banner not found or not updated" });
        }

        res.json({
            success: true,
            message: "About banner updated successfully",
            updatedData,
        });
    } catch (error) {
        console.error("Error updating banner:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete About Banner
const deleteAboutBannerController = async (req, res) => {
    try {
        const result = await deleteAboutBannerById(req.params.id);
        res.json({
            success: true,
            message: result ? 'About banner deleted' : 'About banner not found',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createAboutBannerController,
    getAllAboutBannerController,
    getAboutBannerByIdController,
    updateAboutBannerController,
    deleteAboutBannerController,
};
