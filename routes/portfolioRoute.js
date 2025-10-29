const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/portfolio-images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create a new portfolio item (with image upload)
router.post('/add-portfolio', upload.single('image'), portfolioController.createPortfolio);

// Get all portfolio items
router.get('/get-all-portfolios', portfolioController.getAllPortfolios);

// Get portfolio item by ID
router.get('/get-portfolio/:id', portfolioController.getPortfolioById);

// Update portfolio item (with image upload)
router.put('/update-portfolio/:id', upload.single('image'), portfolioController.updatePortfolio);

// Delete portfolio item
router.delete('/delete-portfolio/:id', portfolioController.deletePortfolio);

module.exports = router;
