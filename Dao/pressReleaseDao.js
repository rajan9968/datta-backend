const db = require('../config/db');

// ➕ Create new press release
const createPressReleaseDao = async (pressRelease) => {
    const [id] = await db('press_releases').insert({
        press_release_picture: pressRelease.press_release_picture,
        press_release_heading: pressRelease.press_release_heading,
        press_release_date: pressRelease.press_release_date,
        press_release_publication: pressRelease.press_release_publication,
        detail_banner_subheading: pressRelease.detail_banner_subheading,
        detail_banner_image: pressRelease.detail_banner_image,
        social_media_link_facebook: pressRelease.social_media_link_facebook,
        social_media_link_instagram: pressRelease.social_media_link_instagram,
        social_media_link_linkedin: pressRelease.social_media_link_linkedin,
        social_media_link_twitter: pressRelease.social_media_link_twitter,
    });
    return id;
};

// 📋 Get all press releases
const getAllPressReleasesDao = async () => {
    const pressReleases = await db('press_releases').select('*').orderBy('id', 'desc');
    return pressReleases;
};

// 🔍 Get press release by ID
const getPressReleaseByIdDao = async (id) => {
    const pressRelease = await db('press_releases').where({ id }).first();
    return pressRelease;
};

// ✏️ Update press release
const updatePressReleaseByIdDao = async (id, updatedData) => {
    const result = await db('press_releases').where({ id }).update(updatedData);
    return result;
};

// ❌ Delete press release
const deletePressReleaseByIdDao = async (id) => {
    const result = await db('press_releases').where({ id }).del();
    return result;
};

module.exports = {
    createPressReleaseDao,
    getAllPressReleasesDao,
    getPressReleaseByIdDao,
    updatePressReleaseByIdDao,
    deletePressReleaseByIdDao,
};
