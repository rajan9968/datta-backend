const {
    createPressReleaseDao,
    getAllPressReleasesDao,
    getPressReleaseByIdDao,
    updatePressReleaseByIdDao,
    deletePressReleaseByIdDao,
} = require('../Dao/mediaReleaseDao');

// ===================== CREATE =====================
const createPressRelease = async (req, res) => {
    try {
        const pressRelease = {
            press_release_picture: req.files?.press_release_picture?.[0]?.filename || null,
            press_release_heading: req.body.press_release_heading,
            press_release_date: req.body.press_release_date,
            press_release_publication: req.body.press_release_publication,

            detail_banner_subheading: req.body.detail_banner_subheading,
            detail_banner_image: req.files?.detail_banner_image?.[0]?.filename || null,

            social_media_link_facebook: req.body.social_media_link_facebook,
            social_media_link_instagram: req.body.social_media_link_instagram,
            social_media_link_linkedin: req.body.social_media_link_linkedin,
            social_media_link_twitter: req.body.social_media_link_twitter,
        };

        // Validation
        if (!pressRelease.press_release_heading) {
            return res.status(400).json({ success: false, message: 'Heading is required' });
        }

        const id = await createPressReleaseDao(pressRelease);
        res.json({ success: true, message: 'Press release created successfully', id });
    } catch (error) {
        console.error('Error creating press release:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ===================== READ ALL =====================
const getAllPressReleases = async (req, res) => {
    try {
        const pressReleases = await getAllPressReleasesDao();
        res.json({ success: true, pressReleases });
    } catch (error) {
        console.error('Error fetching press releases:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ===================== READ BY ID =====================
const getPressReleaseById = async (req, res) => {
    try {
        const pressRelease = await getPressReleaseByIdDao(req.params.id);
        if (!pressRelease) {
            return res.status(404).json({ success: false, message: 'Press release not found' });
        }
        res.json({ success: true, pressRelease });
    } catch (error) {
        console.error('Error fetching press release by ID:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ===================== UPDATE =====================
const updatePressRelease = async (req, res) => {
    try {
        const updatedData = {
            press_release_heading: req.body.press_release_heading,
            press_release_date: req.body.press_release_date,
            press_release_publication: req.body.press_release_publication,

            detail_banner_subheading: req.body.detail_banner_subheading,
            social_media_link_facebook: req.body.social_media_link_facebook,
            social_media_link_instagram: req.body.social_media_link_instagram,
            social_media_link_linkedin: req.body.social_media_link_linkedin,
            social_media_link_twitter: req.body.social_media_link_twitter,
        };

        if (req.files?.press_release_picture?.[0]?.filename) {
            updatedData.press_release_picture = req.files.press_release_picture[0].filename;
        }
        if (req.files?.detail_banner_image?.[0]?.filename) {
            updatedData.detail_banner_image = req.files.detail_banner_image[0].filename;
        }

        const result = await updatePressReleaseByIdDao(req.params.id, updatedData);

        if (result === 0) {
            return res.status(404).json({ success: false, message: 'Press release not found or not updated' });
        }

        res.json({ success: true, message: 'Press release updated successfully' });
    } catch (error) {
        console.error('Error updating press release:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ===================== DELETE =====================
const deletePressRelease = async (req, res) => {
    try {
        const result = await deletePressReleaseByIdDao(req.params.id);
        res.json({
            success: true,
            message: result ? 'Press release deleted successfully' : 'Press release not found',
        });
    } catch (error) {
        console.error('Error deleting press release:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ===================== EXPORT =====================
module.exports = {
    createPressRelease,
    getAllPressReleases,
    getPressReleaseById,
    updatePressRelease,
    deletePressRelease,
};
