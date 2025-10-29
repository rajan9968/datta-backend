const db = require('../config/db');

// ✅ Create new career entry
const createCareers = async (career) => {
    const [id] = await db('career_page').insert({
        banner_sub_heading: career.banner_sub_heading,
        banner_image: career.banner_image,
        why_join: career.why_join,
        key_highlights: career.key_highlights,
        employee_testimonials: career.employee_testimonials,
    });
    return id;
};

// ✅ Get all career entries
const getAllCareeres = async () => {
    return await db('career_page').select('*').orderBy('id', 'desc');
};

// ✅ Get career by ID
const getCareerByIds = async (id) => {
    return await db('career_page').where({ id }).first();
};

// ✅ Update career by ID
const updateCareerByIds = async (id, career) => {
    const result = await db('career_page')
        .where({ id })
        .update({
            banner_sub_heading: career.banner_sub_heading,
            banner_image: career.banner_image,
            why_join: career.why_join,
            key_highlights: career.key_highlights,
            employee_testimonials: career.employee_testimonials,
            updated_at: db.fn.now(),
        });
    return result;
};

// ✅ Delete career by ID
const deleteCareerByIds = async (id) => {
    const result = await db('career_page').where({ id }).del();
    return result;
};

module.exports = {
    createCareers,
    getAllCareeres,
    getCareerByIds,
    updateCareerByIds,
    deleteCareerByIds,
};
