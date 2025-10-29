const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    addSustainability,
    getAll,
    getById,
    updateById,
    deleteById
} = require('../Controller/sustainabilityController');

// Multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/sustainability/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
router.post('/add-sustainability', upload.single('image'), addSustainability);
router.get('/getsustainability', getAll);
router.get('/getsustainability/:id', getById);
router.put('/update-sustainability/:id', upload.single('image'), updateById);
router.delete('/delete-sustainability/:id', deleteById);

module.exports = router;
