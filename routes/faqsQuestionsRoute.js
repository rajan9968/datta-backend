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
} = require('../controller/faqsQuestionsController');


// Routes
router.post('/add-faqs-questions', createAboutBannerController); // Create
router.get('/get-faqs-questions', getAllAboutBannerController); // Read all
router.get('/get-faqs-questions/:id', getAboutBannerByIdController); // Read by ID
router.put('/update-faqs-questions/:id', updateAboutBannerController); // Update
router.delete('/delete-faqs-questions/:id', deleteAboutBannerController); // Delete

module.exports = router;
