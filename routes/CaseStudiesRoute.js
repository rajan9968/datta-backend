const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const blogDetailController = require('../Controller/CaseStudiesController');

// =============================
// 🔧 MULTER CONFIGURATION
// =============================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/blogs'); // Folder where blog images will be saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// =============================
// 📝 BLOG DETAIL ROUTES
// =============================

// ➕ Add new blog
router.post(
    '/add-case-study',
    upload.fields([
        { name: 'banner_image', maxCount: 1 },
        { name: 'blog_inner_image', maxCount: 1 },
    ]),
    blogDetailController.createBlogDetail
);

// 📋 Get all case studies
router.get('/getall-case-studies', blogDetailController.getAllBlogDetails);

// 🔍 Get case study by ID
router.get('/get-case-study-detail/:id', blogDetailController.getBlogDetailById);

// ✏️ Update case study by ID
router.put(
    '/update-case-study-detail/:id',
    upload.fields([
        { name: 'banner_image', maxCount: 1 },
        { name: 'blog_inner_image', maxCount: 1 },
    ]),
    blogDetailController.updateBlogDetailById
);

// ❌ Delete case study by ID
router.delete('/delete-case-study/:id', blogDetailController.deleteBlogDetailById);

module.exports = router;
