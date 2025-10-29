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
} = require('../controller/projectBannerController');

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
router.post('/add-project-banner', upload.single('banner_image'), createAboutBannerController); // Create
router.get('/get-project-banners', getAllAboutBannerController); // Read all
router.get('/get-project-banner/:id', getAboutBannerByIdController); // Read by ID
router.put('/update-project-banner/:id', upload.single('banner_image'), updateAboutBannerController); // Update
router.delete('/delete-project-banner/:id', deleteAboutBannerController); // Delete

module.exports = router;
