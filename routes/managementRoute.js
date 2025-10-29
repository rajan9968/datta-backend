const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // ✅ You missed importing this
const {
    createKeyManagementController,
    getAllKeyManagementController,
    getKeyManagementByIdController,
    updateKeyManagementController,
    deleteKeyManagementController
} = require('../controller/managementController');

// ✅ Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/key-management/'); // 💡 better folder name
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // keeps original filename
    },
});

const upload = multer({ storage });

// ✅ Routes
router.post('/add-key-management', upload.single('image'), createKeyManagementController);
router.get('/all-key-management', getAllKeyManagementController);
router.get('/key-management/:id', getKeyManagementByIdController);
router.put('/key-management/:id', upload.single('image'), updateKeyManagementController);
router.delete('/key-management/:id', deleteKeyManagementController);

module.exports = router;
