const db = require('../config/db');

// Create new client logo
const createClientLogo = async (logo) => {
    const [id] = await db('client_logo').insert({
        image: logo.image,
        status: logo.status,
    });
    return id;
};

// Get all logos
const getAllClientLogos = async () => {
    return await db('client_logo').select('*').orderBy('id', 'desc');
};

// Get logo by ID
const getClientLogoById = async (id) => {
    return await db('client_logo').where({ id }).first();
};

// Update logo by ID
const updateClientLogoById = async (id, logo) => {
    const result = await db('client_logo')
        .where({ id })
        .update({
            image: logo.image,
            status: logo.status,
        });
    return result;
};

// Delete logo by ID
const deleteClientLogoById = async (id) => {
    const result = await db('client_logo').where({ id }).del();
    return result;
};

module.exports = {
    createClientLogo,
    getAllClientLogos,
    getClientLogoById,
    updateClientLogoById,
    deleteClientLogoById,
};
