const {
    createOurBusiness,
    getAllOurBusiness,
    getOurBusinessById,
    updateOurBusinessById,
    deleteOurBusinessById
} = require('../Dao/ourBusinessDao');
const e = require("express");
const db = require('../config/db');

// Create OurBusiness record
const createOurBusinessRecord = async (req, res) => {
    try {
        const business = {
            sub_heading: req.body.sub_heading,
            card_content: req.body.card_content,
            card_url: req.body.card_url || null,
            status: req.body.status || 1
        };

        const id = await createOurBusiness(business);
        res.json({ success: true, message: "Our Business record created", id });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all OurBusiness records
const getAllOurBusinessRecords = async (req, res) => {
    try {
        const businesses = await getAllOurBusiness();
        res.json({ success: true, businesses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get a single OurBusiness record by ID
const getOurBusinessRecordById = async (req, res) => {
    try {
        const business = await getOurBusinessById(req.params.id);
        if (!business) {
            return res.status(404).json({ success: false, message: "Our Business record not found" });
        }
        res.json({ success: true, business });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update OurBusiness record
const updateOurBusinessRecord = async (req, res) => {
    try {
        const business = {
            sub_heading: req.body.sub_heading,
            card_content: req.body.card_content,
            card_url: req.body.card_url,
            status: req.body.status
        };

        const result = await updateOurBusinessById(req.params.id, business);

        if (result === 0) {
            return res.status(404).json({ success: false, message: "Our Business record not found or nothing to update" });
        }

        res.json({ success: true, message: "Our Business record updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete OurBusiness record
const deleteOurBusinessRecord = async (req, res) => {
    try {
        const deleted = await deleteOurBusinessById(req.params.id);
        res.json({ success: true, message: deleted ? "Our Business record deleted" : "Our Business record not found" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createOurBusinessRecord,
    getAllOurBusinessRecords,
    getOurBusinessRecordById,
    updateOurBusinessRecord,
    deleteOurBusinessRecord
};
