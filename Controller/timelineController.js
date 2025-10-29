const {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
} = require('../Dao/timelineDao');

// Create About Banner (with image upload)
const createAboutBannerController = async (req, res) => {
    try {
        const banner = {
            sub_heading: req.body.sub_heading,
            year: req.body.year, // added year field
            status: req.body.status || 1,
            image: req.file ? req.file.filename : null // added image field (from file upload)
        };


        // Call DAO or service
        const id = await createAboutBanner(banner);
        res.json({ success: true, message: 'About banner created successfully', id });

    } catch (error) {
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
        // Build update data
        const updatedData = {
            sub_heading: req.body.sub_heading,
            year: req.body.year,
            status: req.body.status,
        };

        // If a new image is uploaded, include it in the update
        if (req.file) {
            updatedData.image = req.file.filename;
        }

        // Call DAO update function
        const result = await updateAboutBannerById(req.params.id, updatedData);

        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: 'About banner not found or not updated',
            });
        }

        res.json({
            success: true,
            message: 'About banner updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
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
