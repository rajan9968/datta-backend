const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    createAboutBannerController,
    getAllAboutBannerController,
    getAboutBannerByIdController,
    updateAboutBannerController,
    deleteAboutBannerController,
} = require('../Controller/PreDevelopmentController.js');

// ============================
// Multer Configuration
// ============================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/about-banners/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// ============================
// Routes
// ============================

// CREATE (handles multiple file fields)
router.post(
    '/add-pre-development-banner',
    upload.fields([
        { name: 'banner_image', maxCount: 1 },
        { name: 'overview_image', maxCount: 1 },
        { name: 'approach_image_0', maxCount: 1 },
        { name: 'approach_image_1', maxCount: 1 },
        { name: 'approach_image_2', maxCount: 1 },
        // Add more if you allow dynamic tiles
    ]),
    createAboutBannerController
);

// READ ALL
router.get('/get-pre-development-banners', getAllAboutBannerController);

// READ BY ID
router.get('/get-pre-development-banner/:id', getAboutBannerByIdController);

// UPDATE (supports new fields and multiple image updates)
router.put(
    '/update-pre-development-banner/:id',
    upload.fields([
        { name: 'banner_image', maxCount: 1 },
        { name: 'overview_image', maxCount: 1 },
        { name: 'approach_image_0', maxCount: 1 },
        { name: 'approach_image_1', maxCount: 1 },
        { name: 'approach_image_2', maxCount: 1 },
    ]),
    updateAboutBannerController
);

// DELETE
router.delete('/delete-pre-development-banner/:id', deleteAboutBannerController);

module.exports = router;
