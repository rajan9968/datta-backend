const {
    createSustainability,
    getAllSustainability,
    getSustainabilityById,
    updateSustainabilityById,
    deleteSustainabilityById
} = require('../Dao/sustainabilityDao');

// Create
const addSustainability = async (req, res) => {
    try {
        const data = {
            sub_heading: req.body.sub_heading,
            heading: req.body.heading,
            content: req.body.content,
            image: req.file ? req.file.filename : null,
            status: req.body.status || 1
        };

        const id = await createSustainability(data);
        res.json({ success: true, message: "Sustainability record created", id });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all
const getAll = async (req, res) => {
    try {
        const records = await getAllSustainability();
        res.json({ success: true, records });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get by ID
const getById = async (req, res) => {
    try {
        const record = await getSustainabilityById(req.params.id);
        if (!record) return res.status(404).json({ success: false, message: "Record not found" });
        res.json({ success: true, record });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update
const updateById = async (req, res) => {
    try {
        const data = {
            sub_heading: req.body.sub_heading,
            heading: req.body.heading,
            content: req.body.content,
            status: req.body.status || 1
        };

        if (req.file && req.file.filename) data.image = req.file.filename;

        const updated = await updateSustainabilityById(req.params.id, data);
        if (!updated) return res.status(404).json({ success: false, message: "Record not found or nothing to update" });

        res.json({ success: true, message: "Record updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete
const deleteById = async (req, res) => {
    try {
        const deleted = await deleteSustainabilityById(req.params.id);
        res.json({ success: true, message: deleted ? "Record deleted" : "Record not found" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    addSustainability,
    getAll,
    getById,
    updateById,
    deleteById
};
