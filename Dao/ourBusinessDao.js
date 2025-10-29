const db = require('../config/db');

// Create
const createOurBusiness = async (business) => {
    const [id] = await db('our_business').insert({
        sub_heading: business.sub_heading,
        card_content: business.card_content,
        card_url: business.card_url,
        status: business.status
    });
    return id;
};

// Get all
const getAllOurBusiness = async () => {
    return await db('our_business').select('*');
};

// Get by ID
const getOurBusinessById = async (id) => {
    return await db('our_business').where({ id }).first();
};

// Update
const updateOurBusinessById = async (id, business) => {
    const result = await db('our_business')
        .where({ id })
        .update({
            sub_heading: business.sub_heading,
            card_content: business.card_content,
            card_url: business.card_url,
            status: business.status
        });
    return result; // Returns number of affected rows
};

// Delete
const deleteOurBusinessById = async (id) => {
    const result = await db('our_business').where({ id }).del();
    return result; // Returns number of deleted rows
};

module.exports = {
    createOurBusiness,
    getAllOurBusiness,
    getOurBusinessById,
    updateOurBusinessById,
    deleteOurBusinessById
};
