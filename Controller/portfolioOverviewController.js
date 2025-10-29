const {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
} = require('../Dao/portfolioOverviewDao.js');

// Create About Banner (with image upload)
const createAboutBannerController = async (req, res) => {
    try {
        const portfolioData = {
            sub_heading: req.body.sub_heading,
            project_name: req.body.project_name,
            location: req.body.location,
            status: req.body.status || 1,
            image: req.file ? req.file.filename : null
        };

        // Validate required fields
        if (!portfolioData.sub_heading || !portfolioData.project_name || !portfolioData.location) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Call DAO or service
        const id = await createAboutBanner(portfolioData);

        res.json({
            success: true,
            message: 'Portfolio overview created successfully',
            id
        });

    } catch (error) {
        console.error('Error creating portfolio overview:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
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
        const { id } = req.params;

        // Build updated data
        const updatedData = {
            sub_heading: req.body.sub_heading,
            project_name: req.body.project_name,
            location: req.body.location,
            status: req.body.status || 1,
        };

        // Include image only if a new one is uploaded
        if (req.file) {
            updatedData.image = req.file.filename;
        }

        // Call DAO function to update record
        const result = await updateAboutBannerById(id, updatedData);

        if (!result || result === 0) {
            return res.status(404).json({
                success: false,
                message: 'About banner not found or not updated',
            });
        }

        return res.json({
            success: true,
            message: 'About banner updated successfully',
        });
    } catch (error) {
        console.error('Error updating About banner:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message,
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
