const db = require('../config/db');

// Create new about banner
const createAboutBanner = async (banner) => {
    const [id] = await db('faqs_ques_ans').insert({
        sub_heading: banner.sub_heading,
        content: banner.content,
        status: banner.status,
    });
    return id;
};

// Get all about banners
const getAllAboutBanners = async () => {
    return await db('faqs_ques_ans').select('*').orderBy('id', 'desc');
};

// Get about banner by ID
const getAboutBannerById = async (id) => {
    return await db('faqs_ques_ans').where({ id }).first();
};

// Update about banner by ID
const updateAboutBannerById = async (id, banner) => {
    const result = await db('faqs_ques_ans')
        .where({ id })
        .update({
            sub_heading: banner.sub_heading,
            content: banner.content,
            status: banner.status,
        });
    return result;
};

// Delete about banner by ID
const deleteAboutBannerById = async (id) => {
    const result = await db('faqs_ques_ans').where({ id }).del();
    return result;
};

module.exports = {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
};
