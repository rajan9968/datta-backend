const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const careerController = require('../controller/careerController');

// =============================
// 🔧 MULTER CONFIGURATION
// =============================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/careers'); // Folder where images will be saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// =============================
// 📦 CAREER ROUTES
// =============================

// ➕ Create new career (with multiple images)
router.post('/add-career', upload.single('image'), careerController.createCareer);

// 📋 Get all careers
router.get('/getallcareer', careerController.getAllCareers);

// 🔍 Get career by ID
router.get('/getcareerbyid/:id', careerController.getCareerById);

// ✏️ Update career by ID (with optional new images)
router.put('/updatecareer/:id', upload.single('image'), careerController.updateCareerById);

// ❌ Delete career by ID
router.delete('/deletecareer/:id', careerController.deleteCareerById);

module.exports = router;
