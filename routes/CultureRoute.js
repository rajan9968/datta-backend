const express = require('express');
const router = express.Router();
const {
    createOurCultureController,
    getAllOurCultureController,
    getOurCultureByIdController,
    updateOurCultureController,
    deleteOurCultureController,
} = require('../Controller/OurCultureController.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure folder exists
const uploadPath = 'uploads/about-banners/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        cb(null, true); // Accept all file types (you can restrict if needed)
    },
});


router.post('/add-culture', upload.any(), createOurCultureController);


// READ ALL
router.get('/get-culture', getAllOurCultureController);

// READ BY ID
router.get('/get-culture/:id', getOurCultureByIdController);

router.put('/update-culture/:id', upload.any(), updateOurCultureController);



// DELETE
router.delete('/delete-culture/:id', deleteOurCultureController);

module.exports = router;


// // ============================
// // Routes for Our Culture
// // ============================

// // CREATE
// router.post('/add-culture', upload, createOurCultureController);

// // READ ALL
// router.get('/get-all-our-culture', getAllOurCultureController);

// // READ BY ID
// router.get('/get-our-culture/:id', getOurCultureByIdController);

// // UPDATE
// router.put('/update-our-culture/:id', upload, updateOurCultureController);

// // DELETE
// router.delete('/delete-our-culture/:id', deleteOurCultureController);

// module.exports = router;
