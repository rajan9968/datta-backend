const db = require('../config/db');

// Create new about banner
const createAboutBanner = async (banner) => {
    const [id] = await db('about_timeline').insert({
        sub_heading: banner.sub_heading,
        year: banner.year,
        image: banner.image,
        status: banner.status,
    });

    return id;
};


// Get all about banners
const getAllAboutBanners = async () => {
    return await db('about_timeline').select('*').orderBy('id', 'desc');
};

// Get about banner by ID
const getAboutBannerById = async (id) => {
    return await db('about_timeline').where({ id }).first();
};

// Update about banner by ID
const updateAboutBannerById = async (id, banner) => {
    const updateData = {
        sub_heading: banner.sub_heading,
        year: banner.year,
        status: banner.status,
    };

    // Include image only if provided
    if (banner.image) {
        updateData.image = banner.image;
    }

    const result = await db('about_timeline')
        .where({ id })
        .update(updateData);

    return result;
};

// Delete about banner by ID
const deleteAboutBannerById = async (id) => {
    const result = await db('about_timeline').where({ id }).del();
    return result;
};

module.exports = {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
};
