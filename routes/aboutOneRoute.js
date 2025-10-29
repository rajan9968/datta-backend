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
} = require('../controller/aboutBannerController');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/about-banners/'); // make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.post('/add-about-banner', upload.single('banner_image'), createAboutBannerController); // Create
router.get('/get-about-banners', getAllAboutBannerController); // Read all
router.get('/get-about-banner/:id', getAboutBannerByIdController); // Read by ID
router.put('/update-about-banner/:id', upload.single('banner_image'), updateAboutBannerController); // Update
router.delete('/delete-about-banner/:id', deleteAboutBannerController); // Delete

module.exports = router;
