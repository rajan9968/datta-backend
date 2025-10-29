const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const blogDetailController = require('../Controller/BlogDetailController.js');

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
    '/add-blog-detail',
    upload.fields([
        { name: 'banner_image', maxCount: 1 },
        { name: 'blog_inner_image', maxCount: 1 },
    ]),
    blogDetailController.createBlogDetail
);

// 📋 Get all blogs
router.get('/getall-blog-detail', blogDetailController.getAllBlogDetails);

// 🔍 Get blog by ID
router.get('/get-blog-detailid/:id', blogDetailController.getBlogDetailById);

// ✏️ Update blog by ID
router.put(
    '/update-blog-detail/:id',
    upload.fields([
        { name: 'banner_image', maxCount: 1 },
        { name: 'blog_inner_image', maxCount: 1 },
    ]),
    blogDetailController.updateBlogDetailById
);

// ❌ Delete blog by ID
router.delete('/delete-blog-detail/:id', blogDetailController.deleteBlogDetailById);

module.exports = router;
