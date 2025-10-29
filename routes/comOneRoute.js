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
} = require('../controller/comBannerController');

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
router.post('/add-com-banner', upload.single('banner_image'), createAboutBannerController); // Create
router.get('/get-com-banners', getAllAboutBannerController); // Read all
router.get('/get-com-banner/:id', getAboutBannerByIdController); // Read by ID
router.put('/update-com-banner/:id', upload.single('banner_image'), updateAboutBannerController); // Update
router.delete('/delete-com-banner/:id', deleteAboutBannerController); // Delete

module.exports = router;
