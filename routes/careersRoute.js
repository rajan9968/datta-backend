const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Import controllers
const {
    createCareer,
    getAllCareers,
    getCareerById,
    updateCareerById,
    deleteCareerById,
} = require('../Controller/careersController.js');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/careers/'); // ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.random().toString(36).substr(2, 9) + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// ======================= ROUTES =======================

// Create Career - Handle multiple files
router.post('/add-admin-career', upload.fields([
    { name: 'banner_image', maxCount: 1 },
    { name: 'why_join_icons', maxCount: 10 } // Adjust maxCount as needed
]), createCareer);

// Get all Careers
router.get('/get-admin-careers', getAllCareers);

// Get Career by ID
router.get('/get-admin-career/:id', getCareerById);

// Update Career - Handle multiple files
router.put('/update-admin-career/:id', upload.fields([
    { name: 'banner_image', maxCount: 1 },
    { name: 'why_join_icons', maxCount: 10 }
]), updateCareerById);

// Delete Career
router.delete('/delete-admin-career/:id', deleteCareerById);

// ======================================================

module.exports = router;