const {
    createClientLogo,
    getAllClientLogos,
    getClientLogoById,
    updateClientLogoById,
    deleteClientLogoById,
} = require('../Dao/clientLogoDao');

// Create logo (with image upload)
const createLogo = async (req, res) => {
    try {
        const logo = {
            image: req.file ? req.file.filename : null,
            status: req.body.status || 1,
        };

        if (!logo.image) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const id = await createClientLogo(logo);
        res.json({ success: true, message: 'Client logo created successfully', id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all logos
const getAllLogos = async (req, res) => {
    try {
        const logos = await getAllClientLogos();
        res.json({ success: true, logos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get logo by ID
const getLogoById = async (req, res) => {
    try {
        const logo = await getClientLogoById(req.params.id);
        if (!logo) {
            return res.status(404).json({ success: false, message: 'Logo not found' });
        }
        res.json({ success: true, logo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update logo
const updateLogo = async (req, res) => {
    try {
        const updatedData = {
            status: req.body.status,
        };

        if (req.file && req.file.filename) {
            updatedData.image = req.file.filename;
        }

        const result = await updateClientLogoById(req.params.id, updatedData);

        if (result === 0) {
            return res.status(404).json({ success: false, message: 'Logo not found or not updated' });
        }

        res.json({ success: true, message: 'Client logo updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete logo
const deleteLogo = async (req, res) => {
    try {
        const result = await deleteClientLogoById(req.params.id);
        res.json({
            success: true,
            message: result ? 'Client logo deleted' : 'Logo not found',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createLogo,
    getAllLogos,
    getLogoById,
    updateLogo,
    deleteLogo,
};
