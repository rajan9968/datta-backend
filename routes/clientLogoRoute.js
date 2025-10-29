const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    createLogo,
    getAllLogos,
    getLogoById,
    updateLogo,
    deleteLogo,
} = require('../controller/clientLogoController');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/client-logos/'); // make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.post('/add-client', upload.single('image'), createLogo); // Create
router.get('/getclient', getAllLogos); // Read all
router.get('/getclient/:id', getLogoById); // Read by ID
router.put('/update-logo/:id', upload.single('image'), updateLogo); // Update
router.delete('/getclient/:id', deleteLogo); // Delete

module.exports = router;
