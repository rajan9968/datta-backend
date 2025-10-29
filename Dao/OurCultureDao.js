const db = require('../config/db'); // your Knex or DB connection

// =========================
// CREATE
// =========================
const createOurCulture = async (data) => {
    const [id] = await db('culture').insert({
        banner_sub_heading: data.banner_sub_heading || null,
        banner_image: data.banner_image || null,

        // ✅ Store arrays as JSON
        our_culture: data.our_culture || '[]',
        community_initiatives: data.community_initiatives || '[]',

        key_sub_heading: data.key_sub_heading || null,
        key_image: data.key_image || null,
        key_text_on_image: data.key_text_on_image || null,

        employee_sub_heading: data.employee_sub_heading || null,
        employee_heading: data.employee_heading || null,
        employee_description: data.employee_description || null,
        employee_image: data.employee_image || null,

        type: data.type || null,
        status: data.status ?? 1,
        created_at: new Date(),
    });

    return id;
};


// =========================
// READ ALL
// =========================
const getAllOurCulture = async () => {
    return await db('culture').select('*').orderBy('id', 'desc');
};

// =========================
// READ BY ID
// =========================
const getOurCultureById = async (id) => {
    const record = await db('culture').where({ id }).first();
    return record || null;
};

// =========================
// UPDATE BY ID
// =========================
// dao/ourCultureDAO.js

const updateOurCultureById = async (id, updatedData) => {
    try {
        const result = await db("culture")
            .where({ id })
            .update(updatedData);
        return result;
    } catch (error) {
        console.error("Error in updateOurCultureById:", error);
        throw error;
    }
};

module.exports = { updateOurCultureById };

// =========================
// DELETE BY ID
// =========================
const deleteOurCultureById = async (id) => {
    const result = await db('culture').where({ id }).del();
    return result; // returns number of rows deleted (0 or 1)
};

module.exports = {
    createOurCulture,
    getAllOurCulture,
    getOurCultureById,
    updateOurCultureById,
    deleteOurCultureById,
};
