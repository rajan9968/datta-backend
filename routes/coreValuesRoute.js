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
} = require('../controller/coreValuesController');


// Routes
router.post('/add-core-values', createAboutBannerController); // Create
router.get('/get-core-values', getAllAboutBannerController); // Read all
router.get('/get-core-values/:id', getAboutBannerByIdController); // Read by ID
router.put('/update-add-core-values/:id', updateAboutBannerController); // Update
router.delete('/delete-add-core-values/:id', deleteAboutBannerController); // Delete

module.exports = router;
