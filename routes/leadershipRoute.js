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
} = require('../controller/leadershipBannerController');

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
router.post('/add-leadership-banner', upload.single('banner_image'), createAboutBannerController); // Create
router.get('/get-leadership-banners', getAllAboutBannerController); // Read all
router.get('/get-leadership-banner/:id', getAboutBannerByIdController); // Read by ID
router.put('/update-leadership-banner/:id', upload.single('banner_image'), updateAboutBannerController); // Update
router.delete('/delete-leadership-banner/:id', deleteAboutBannerController); // Delete

module.exports = router;
