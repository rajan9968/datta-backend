const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    createContactController,
    getAllContactsController,
    getContactByIdController,
    updateContactController,
    deleteContactController,
} = require('../controller/contactController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/contact/'); // ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.post('/add-contact', upload.single('contact_banner'), createContactController); // Create
router.get('/get-contacts', getAllContactsController); // Read all
router.get('/get-contact/:id', getContactByIdController); // Read by ID
router.put('/update-contact/:id', upload.single('contact_banner'), updateContactController); // Update
router.delete('/delete-contact/:id', deleteContactController); // Delete

module.exports = router;
