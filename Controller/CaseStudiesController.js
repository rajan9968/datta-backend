const {
    createBlogs,
    getAllBloges,
    getBlogByIds,
    updateBlogByIds,
    deleteBlogByIds,
} = require('../Dao/CaseStudiesDao.js');

// ➕ Create new blog detail
const createBlogDetail = async (req, res) => {
    try {
        const { sub_heading, content, blog_date, status } = req.body;
        const banner_image = req.files?.banner_image?.[0]?.filename || null;
        const blog_inner_image = req.files?.blog_inner_image?.[0]?.filename || null;

        const id = await createBlogs({
            sub_heading,
            banner_image,
            content,
            blog_inner_image,
            blog_date,
            status,
        });

        res.status(201).json({ message: 'Blog detail created successfully', id });
    } catch (error) {
        console.error('Error creating blog detail:', error);
        res.status(500).json({ error: 'Failed to create blog detail' });
    }
};

// 📋 Get all blog details
const getAllBlogDetailsController = async (req, res) => {
    try {
        const blogs = await getAllBloges();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blog details:', error);
        res.status(500).json({ error: 'Failed to fetch blog details' });
    }
};

// 🔍 Get blog detail by ID
const getBlogDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await getBlogByIds(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog detail not found' });
        }

        res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error('Error fetching blog detail:', error);
        res.status(500).json({ error: 'Failed to fetch blog detail' });
    }
};

// ✏️ Update blog detail by ID
const updateBlogDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const { sub_heading, content, blog_date, status, existingBanner, existingInner } = req.body;

        const banner_image = req.files?.banner_image?.[0]?.filename || existingBanner;
        const blog_inner_image = req.files?.blog_inner_image?.[0]?.filename || existingInner;

        const result = await updateBlogByIds(id, {
            sub_heading,
            banner_image,
            content,
            blog_inner_image,
            blog_date,
            status,
        });

        if (result === 0) {
            return res.status(404).json({ error: 'Blog detail not found' });
        }

        res.status(200).json({ message: 'Blog detail updated successfully' });
    } catch (error) {
        console.error('Error updating blog detail:', error);
        res.status(500).json({ error: 'Failed to update blog detail' });
    }
};

// ❌ Delete blog detail by ID
const deleteBlogDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteBlogByIds(id);

        if (result === 0) {
            return res.status(404).json({ error: 'Blog detail not found' });
        }

        res.status(200).json({ message: 'Blog detail deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog detail:', error);
        res.status(500).json({ error: 'Failed to delete blog detail' });
    }
};

module.exports = {
    createBlogDetail,
    getAllBlogDetails: getAllBlogDetailsController,
    getBlogDetailById,
    updateBlogDetailById,
    deleteBlogDetailById,
};
