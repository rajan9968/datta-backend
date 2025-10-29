const db = require('../config/db');

// Create new career entry
const createCareers = async (career) => {
    const [id] = await db('case_studies_banner').insert({
        sub_heading: career.sub_heading,
        image_carousel: career.image_carousel,
        status: career.status || 'active',
    });
    return id;
};

// Get all career entries
const getAllCareeres = async () => {
    return await db('case_studies_banner').select('*').orderBy('id', 'desc');
};

// Get career by ID
const getCareerByIds = async (id) => {
    return await db('case_studies_banner').where({ id }).first();
};

// Update career by ID
const updateCareerByIds = async (id, career) => {
    const result = await db('case_studies_banner')
        .where({ id })
        .update({
            sub_heading: career.sub_heading,
            image_carousel: career.image_carousel,
            status: career.status,
            updated_at: db.fn.now(),
        });
    return result;
};

// Delete career by ID
const deleteCareerByIds = async (id) => {
    const result = await db('case_studies_banner').where({ id }).del();
    return result;
};

module.exports = {
    createCareers,
    getAllCareeres,
    getCareerByIds,
    updateCareerByIds,
    deleteCareerByIds,
};
