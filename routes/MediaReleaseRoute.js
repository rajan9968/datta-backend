const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    createPressRelease,
    getAllPressReleases,
    getPressReleaseById,
    updatePressRelease,
    deletePressRelease,
} = require('../controller/mediaReleaseController');

// ========== Multer Storage ==========
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/press-releases/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// ========== Routes ==========

// Create (multiple file fields)
router.post(
    '/add-media-release',
    upload.fields([
        { name: 'press_release_picture', maxCount: 1 },
        { name: 'detail_banner_image', maxCount: 1 },
    ]),
    createPressRelease
);

// Read all
router.get('/get-media-releases', getAllPressReleases);

// Read by ID
router.get('/get-media-releases/:id', getPressReleaseById);

// Update
router.put(
    '/update-media-release/:id',
    upload.fields([
        { name: 'press_release_picture', maxCount: 1 },
        { name: 'detail_banner_image', maxCount: 1 },
    ]),
    updatePressRelease
);

// Delete
router.delete('/delete-media-release/:id', deletePressRelease);

module.exports = router;
