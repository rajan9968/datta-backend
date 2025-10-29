const db = require('../config/db'); // Adjust to your DB config

// Create
const createKeyManagement = async (data) => {
    const [id] = await db('about_Key_Management').insert(data);
    return id;
};

// Get All
const getAllKeyManagement = async () => {
    return db('about_Key_Management').select('*').orderBy('id', 'desc');
};

// Get by ID
const getKeyManagementById = async (id) => {
    return db('about_Key_Management').where({ id }).first();
};

// Update
const updateKeyManagementById = async (id, data) => {
    return db('about_Key_Management').where({ id }).update(data);
};

// Delete
const deleteKeyManagementById = async (id) => {
    return db('about_Key_Management').where({ id }).del();
};

module.exports = {
    createKeyManagement,
    getAllKeyManagement,
    getKeyManagementById,
    updateKeyManagementById,
    deleteKeyManagementById,
};
