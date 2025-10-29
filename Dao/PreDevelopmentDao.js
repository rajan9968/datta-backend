const db = require('../config/db');

// Create new about banner
const createAboutBanner = async (banner) => {
    const [id] = await db('business_pre_development').insert({
        sub_heading: banner.sub_heading,
        banner_image: banner.banner_image,
        status: banner.status,
        page_type: banner.page_type,
        overview_text: banner.overview_text || null,
        overview_image: banner.overview_image || null,
        key_highlights: banner.key_highlights || null, // JSON string
        our_approach: banner.our_approach || null,     // JSON string
        our_projects: banner.our_projects || null,
    });

    return id;
};

// Get all about banners
const getAllAboutBanners = async () => {
    return await db('business_pre_development').select('*').orderBy('id', 'desc');
};

// Get about banner by ID
const getAboutBannerById = async (id) => {
    return await db('business_pre_development').where({ id }).first();
};

// Update about banner by ID
const updateAboutBannerById = async (id, banner) => {
    // Build the update object dynamically
    const updateData = {
        sub_heading: banner.sub_heading,
        status: banner.status,
    };

    // Optional fields — include only if provided
    if (banner.banner_image) updateData.banner_image = banner.banner_image;
    if (banner.overview_text) updateData.overview_text = banner.overview_text;
    if (banner.page_type) updateData.page_type = banner.page_type;
    if (banner.overview_image) updateData.overview_image = banner.overview_image;
    if (banner.key_highlights) updateData.key_highlights = banner.key_highlights;
    if (banner.our_approach) updateData.our_approach = banner.our_approach;

    // Run the update query
    const result = await db('business_pre_development')
        .where({ id })
        .update(updateData);

    return result;
};

module.exports = { updateAboutBannerById };


// Delete about banner by ID
const deleteAboutBannerById = async (id) => {
    const result = await db('business_pre_development').where({ id }).del();
    return result;
};

module.exports = {
    createAboutBanner,
    getAllAboutBanners,
    getAboutBannerById,
    updateAboutBannerById,
    deleteAboutBannerById,
};
