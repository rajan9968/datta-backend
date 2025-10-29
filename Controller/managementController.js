const {
    createKeyManagement,
    getAllKeyManagement,
    getKeyManagementById,
    updateKeyManagementById,
    deleteKeyManagementById,
} = require('../Dao/managementDao');

// Create Key Management
const createKeyManagementController = async (req, res) => {
    try {
        const record = {
            name: req.body.name,
            desc: req.body.desc,
            image: req.file ? req.file.filename : null,
            facebook: req.body.facebook || null,
            instagram: req.body.instagram || null,
            linkedin: req.body.linkedin || null,
            twitter: req.body.twitter || null,
            key_status: req.body.key_status || 1,
            status: req.body.status || 1,
        };

        // Validation
        if (!record.name || !record.desc) {
            return res.status(400).json({ success: false, message: 'Name and Description are required' });
        }

        if (!record.image) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const id = await createKeyManagement(record);
        res.json({ success: true, message: 'Key Management record created successfully', id });
    } catch (error) {
        console.error('Error creating Key Management record:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Key Management
const getAllKeyManagementController = async (req, res) => {
    try {
        const records = await getAllKeyManagement();
        res.json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Key Management by ID
const getKeyManagementByIdController = async (req, res) => {
    try {
        const record = await getKeyManagementById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }
        res.json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Key Management
const updateKeyManagementController = async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            desc: req.body.desc,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            linkedin: req.body.linkedin,
            twitter: req.body.twitter,
            key_status: req.body.key_status,
            status: req.body.status,
        };

        if (req.file && req.file.filename) {
            updatedData.image = req.file.filename;
        }

        const result = await updateKeyManagementById(req.params.id, updatedData);

        if (result === 0) {
            return res.status(404).json({ success: false, message: 'Record not found or not updated' });
        }

        res.json({ success: true, message: 'Key Management record updated successfully' });
    } catch (error) {
        console.error('Error updating Key Management record:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Key Management
const deleteKeyManagementController = async (req, res) => {
    try {
        const result = await deleteKeyManagementById(req.params.id);
        res.json({
            success: true,
            message: result ? 'Record deleted successfully' : 'Record not found',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createKeyManagementController,
    getAllKeyManagementController,
    getKeyManagementByIdController,
    updateKeyManagementController,
    deleteKeyManagementController,
};
