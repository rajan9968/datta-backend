const db = require('../config/db');

// Create new about banner
const createAboutBanner = async (data) => {
    const [id] = await db('about_portfolio_overview').insert({
        sub_heading: data.sub_heading,
        project_name: data.project_name,
        location: data.location,
        image: data.image,
        status: data.status || 1,
    });

    return id;
};


// Get all about banners
const getAllAboutBanners = async () => {
    return await db('about_portfolio_overview').select('*').orderBy('id', 'desc');
};

// Get about banner by ID
const getAboutBannerById = async (id) => {
    return await db('about_portfolio_overview').where({ id }).first();
};

// Update about banner by ID
const updateAboutBannerById = async (id, banner) => {
    const updateData = {
        sub_heading: banner.sub_heading,
        project_name: banner.project_name,
        location: banner.location,
        status: banner.status,
    };

    // Include image only if provided
    if (banner.image) {
        updateData.image = banner.image;
    }

    const result = await db('about_portfolio_overview')
        .where({ id })
        .update(updateData);

    return result;
};


// Delete about banner by ID
const deleteAboutBannerById = async (id) => {
    const result = await db('about_portfolio_overview').where({ id }).del();
    return result;
};

module.exports = {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
};
