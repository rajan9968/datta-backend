const router = require('express').Router();
const express = require('express');
const multer = require('multer');
const { createBanners, getAllBanners, getBannerById, updateBanner, deleteBanner } = require('../Controller/BannerController');

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// router.post('/add-banner', createBanners);
router.post('/add-banner', upload.single('image'), createBanners);
router.get('/getbanners', getAllBanners);
router.get('/banners/:id', (req, res) => getBannerById(req, res));
router.put('/banners/:id', upload.single('image'), updateBanner);
router.delete('/banners/:id', (req, res) => deleteBanner(req, res));




// router.post('/sigup', sigupValidation, signup);

module.exports = router;    