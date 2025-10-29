const {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
} = require('../Dao/leaderBannerDao');

// Create About Banner (with image upload)
const createAboutBannerController = async (req, res) => {
    try {
        const banner = {
            sub_heading: req.body.sub_heading,
            banner_image: req.file ? req.file.filename : null,
            status: req.body.status || 1,
        };

        if (!banner.banner_image) {
            return res.status(400).json({ success: false, message: 'Banner image is required' });
        }

        if (!banner.sub_heading) {
            return res.status(400).json({ success: false, message: 'Sub-heading is required' });
        }

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
        const updatedData = {
            sub_heading: req.body.sub_heading,
            status: req.body.status,
        };

        if (req.file && req.file.filename) {
            updatedData.banner_image = req.file.filename;
        }

        const result = await updateAboutBannerById(req.params.id, updatedData);

        if (result === 0) {
            return res.status(404).json({ success: false, message: 'About banner not found or not updated' });
        }

        res.json({ success: true, message: 'About banner updated successfully' });
    } catch (error) {
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
