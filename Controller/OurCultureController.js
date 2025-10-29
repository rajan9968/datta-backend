const {
    createOurCulture,
    getAllOurCulture,
    getOurCultureById,
    updateOurCultureById,
    deleteOurCultureById,
} = require('../Dao/OurCultureDao.js');

// =========================
// Create Our Culture
// =========================
const createOurCultureController = async (req, res) => {
    try {
        // ========== Parse main body fields ==========
        const {
            banner_sub_heading,
            key_sub_heading,
            key_text_on_image,
            employee_sub_heading,
            employee_heading,
            employee_description,
            type,
            status,
        } = req.body;

        // Parse dynamic array data safely
        const our_culture = JSON.parse(req.body.our_culture || '[]');
        const community_initiatives = JSON.parse(req.body.community_initiatives || '[]');

        // ========== Handle uploaded images ==========
        const files = req.files || [];

        // Helper: get single file by name
        const getFile = (name) =>
            files.find((file) => file.fieldname === name)?.filename || null;

        // Helper: get multiple dynamic files by prefix
        const getFilesByPrefix = (prefix) =>
            files
                .filter((file) => file.fieldname.startsWith(prefix))
                .map((f) => f.filename);

        // Map uploaded our_culture images
        const ourCultureImages = getFilesByPrefix('our_culture_image_');
        our_culture.forEach((item, i) => {
            item.image = ourCultureImages[i] || null;
        });

        // Map uploaded community initiative images
        const communityImages = getFilesByPrefix('community_image_');
        community_initiatives.forEach((item, i) => {
            item.image = communityImages[i] || null;
        });

        // ========== Prepare final data for DB ==========
        const data = {
            banner_sub_heading,
            banner_image: getFile('banner_image'),
            our_culture: JSON.stringify(our_culture),
            community_initiatives: JSON.stringify(community_initiatives),
            key_sub_heading,
            key_image: getFile('key_image'),
            key_text_on_image,
            employee_sub_heading,
            employee_heading,
            employee_description,
            employee_image: getFile('employee_image'),
            type,
            status,
        };

        // ========== Save data in DB ==========
        const id = await createOurCulture(data);

        return res.json({
            success: true,
            message: 'Our Culture section created successfully.',
            id,
        });
    } catch (error) {
        console.error('Error creating Our Culture:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};


// =========================
// Get All
// =========================
const getAllOurCultureController = async (req, res) => {
    try {
        const cultures = await getAllOurCulture();
        res.json({ success: true, cultures });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// =========================
// Get By ID
// =========================
const getOurCultureByIdController = async (req, res) => {
    try {
        const culture = await getOurCultureById(req.params.id);
        if (!culture) {
            return res
                .status(404)
                .json({ success: false, message: 'Our Culture record not found' });
        }
        res.json({ success: true, culture });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// =========================
// Update Our Culture
// =========================
const updateOurCultureController = async (req, res) => {
    try {
        const id = req.params.id;

        // Convert req.files array into a map (for easier lookup)
        const filesMap = {};
        if (req.files && Array.isArray(req.files)) {
            req.files.forEach(file => {
                filesMap[file.fieldname] = file.filename;
            });
        }

        // Prepare updated data
        const updatedData = {
            banner_sub_heading: req.body.banner_sub_heading,
            key_sub_heading: req.body.key_sub_heading,
            key_text_on_image: req.body.key_text_on_image,
            employee_sub_heading: req.body.employee_sub_heading,
            employee_heading: req.body.employee_heading,
            employee_description: req.body.employee_description,
            type: req.body.type,
            status: req.body.status,
        };

        // Handle main images with fallback
        updatedData.banner_image =
            filesMap.banner_image || req.body.existing_banner_image;

        updatedData.key_image =
            filesMap.key_image || req.body.existing_key_image;

        updatedData.employee_image =
            filesMap.employee_image || req.body.existing_employee_image;

        // ===== Handle dynamic array fields =====
        // Parse JSON arrays from frontend
        const ourCultureItems = JSON.parse(req.body.our_culture || '[]');
        const communityItems = JSON.parse(req.body.community_initiatives || '[]');

        // Replace item.image if a new file uploaded
        ourCultureItems.forEach((item, i) => {
            const fieldName = `our_culture_image_${i}`;
            if (filesMap[fieldName]) {
                item.image = filesMap[fieldName];
            }
        });

        communityItems.forEach((item, i) => {
            const fieldName = `community_image_${i}`;
            if (filesMap[fieldName]) {
                item.image = filesMap[fieldName];
            }
        });

        // Store updated JSON strings in DB
        updatedData.our_culture = JSON.stringify(ourCultureItems);
        updatedData.community_initiatives = JSON.stringify(communityItems);

        // ===== Run update query =====
        const result = await updateOurCultureById(id, updatedData);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Culture record not found or not updated',
            });
        }

        return res.json({
            success: true,
            message: 'Culture updated successfully',
        });
    } catch (error) {
        console.error('Error updating Culture:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};





// =========================
// Delete
// =========================
const deleteOurCultureController = async (req, res) => {
    try {
        const result = await deleteOurCultureById(req.params.id);
        res.json({
            success: true,
            message: result
                ? 'Our Culture record deleted successfully.'
                : 'Our Culture record not found.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createOurCultureController,
    getAllOurCultureController,
    getOurCultureByIdController,
    updateOurCultureController,
    deleteOurCultureController,
};
