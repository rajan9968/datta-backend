const db = require('../config/db');

// 🟢 Create new blog entry
const createBlogs = async (blog) => {
    const [id] = await db('blog_detail').insert({
        sub_heading: blog.sub_heading,
        banner_image: blog.banner_image,
        content: blog.content,
        blog_inner_image: blog.blog_inner_image,
        blog_date: blog.blog_date,
        status: blog.status || 'active',
    });
    return id;
};

// 🟡 Get all blog entries
const getAllBloges = async () => {
    return await db('blog_detail').select('*').orderBy('id', 'desc');
};

// 🔵 Get blog by ID
const getBlogByIds = async (id) => {
    return await db('blog_detail').where({ id }).first();
};

// 🟠 Update blog by ID
const updateBlogByIds = async (id, blog) => {
    const result = await db('blog_detail')
        .where({ id })
        .update({
            sub_heading: blog.sub_heading,
            banner_image: blog.banner_image,
            content: blog.content,
            blog_inner_image: blog.blog_inner_image,
            blog_date: blog.blog_date,
            status: blog.status,
            updated_at: db.fn.now(),
        });
    return result;
};

// 🔴 Delete blog by ID
const deleteBlogByIds = async (id) => {
    const result = await db('blog_detail').where({ id }).del();
    return result;
};

module.exports = {
    createBlogs,
    getAllBloges,
    getBlogByIds,
    updateBlogByIds,
    deleteBlogByIds,
};
