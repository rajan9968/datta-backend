const { createBanner, getAllBanner, getBannerByIds, updateBannerById, deleteBannerById } = require('../Dao/bannerDao');
const e = require("express");
const db = require('../config/db');


// Create banner
const createBanners = async (req, res) => {
    try {
        // Build banner object combining text fields and uploaded file
        const banner = {
            heading: req.body.heading,
            subheading: req.body.subheading,
            content: req.body.content,
            number: req.body.number,
            image: req.file ? req.file.filename : null, // important for file upload
            status: req.body.status || 1
        };

        const id = await createBanner(banner);
        res.json({ success: true, message: "Banner created", id });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all banners
const getAllBanners = async (req, res) => {
    try {
        const banners = await getAllBanner();
        res.json({ success: true, banners });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getBannerById = async (req, res) => {
    try {
        const banner = await getBannerByIds(req.params.id);
        if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });
        res.json({ success: true, banner });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update banner
const updateBanner = async (req, res) => {
    try {
        // Prepare data
        const banner = {
            heading: req.body.heading,
            subheading: req.body.subheading,
            content: req.body.content,
            number: req.body.number,
            status: req.body.status || 1
        };

        // Only update image if a new file is uploaded
        if (req.file && req.file.filename) {
            banner.image = req.file.filename;
        }

        // Call your update function
        const result = await updateBannerById(req.params.id, banner);

        if (result === 0) {
            return res.status(404).json({ success: false, message: "Banner not found or nothing to update" });
        }

        res.json({ success: true, message: "Banner updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete banner
const deleteBanner = async (req, res) => {
    try {
        const deleted = await deleteBannerById(req.params.id);
        res.json({ success: true, message: deleted ? "Banner deleted" : "Banner not found" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {
    createBanners,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};