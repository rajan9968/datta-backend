const db = require('../config/db'); // assuming this is a Knex instance

// Create
const createSustainability = async (data) => {
    const [id] = await db('sustainability').insert({
        sub_heading: data.sub_heading,
        heading: data.heading,
        content: data.content,
        image: data.image,
        status: data.status || 1
    });
    return id;
};

// Get all
const getAllSustainability = async () => {
    return await db('sustainability').select('*');
};

// Get by ID
const getSustainabilityById = async (id) => {
    const records = await db('sustainability').where({ id }).first();
    return records;
};

// Update
const updateSustainabilityById = async (id, data) => {
    const result = await db('sustainability')
        .where({ id })
        .update({
            sub_heading: data.sub_heading,
            heading: data.heading,
            content: data.content,
            image: data.image, // optional
            status: data.status
        });
    return result; // affected rows
};

// Delete
const deleteSustainabilityById = async (id) => {
    const result = await db('sustainability').where({ id }).del();
    return result; // affected rows
};

module.exports = {
    createSustainability,
    getAllSustainability,
    getSustainabilityById,
    updateSustainabilityById,
    deleteSustainabilityById
};
