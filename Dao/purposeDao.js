const db = require('../config/db');

// Create new about banner
const createAboutBanner = async (banner) => {
    const [id] = await db('about_purpose').insert({
        sub_heading: banner.sub_heading,
        status: banner.status,
    });
    return id;
};

// Get all about banners
const getAllAboutBanners = async () => {
    return await db('about_purpose').select('*').orderBy('id', 'desc');
};

// Get about banner by ID
const getAboutBannerById = async (id) => {
    return await db('about_purpose').where({ id }).first();
};

// Update about banner by ID
const updateAboutBannerById = async (id, banner) => {
    const result = await db('about_purpose')
        .where({ id })
        .update({
            sub_heading: banner.sub_heading,
            status: banner.status,
        });
    return result;
};

// Delete about banner by ID
const deleteAboutBannerById = async (id) => {
    const result = await db('about_purpose').where({ id }).del();
    return result;
};

module.exports = {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
};
