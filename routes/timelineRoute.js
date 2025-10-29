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
} = require('../controller/timelineController');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/about-banners/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Optional: accept only images
        const fileTypes = /jpeg|jpg|png|webp|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    },
});

// ✅ Routes
router.post('/add-timeline', upload.single('image'), createAboutBannerController); // Create (with image)
router.get('/get-timelines', getAllAboutBannerController); // Read all
router.get('/get-timelines/:id', getAboutBannerByIdController); // Read by ID
router.put('/update-timelines/:id', upload.single('image'), updateAboutBannerController); // Update (with image)
router.delete('/delete-timelines/:id', deleteAboutBannerController); // Delete

module.exports = router;
