const db = require('../config/db');

// ➕ Create new contact
const createContact = async (contact) => {
    const [id] = await db('contact_page').insert({
        contact_banner: contact.contact_banner,
        contact_sub_heading: contact.contact_sub_heading,
        office_main: contact.office_main,
        office_other: contact.office_other,
        status: contact.status,
    });
    return id;
};

// 📋 Get all contacts
const getAllContacts = async () => {
    const contacts = await db('contact_page').select('*').orderBy('id', 'desc');
    return contacts;
};

// 🔍 Get contact by ID
const getContactById = async (id) => {
    const contact = await db('contact_page').where({ id }).first();
    return contact;
};

// ✏️ Update contact
const updateContactById = async (id, updatedData) => {
    const result = await db('contact_page').where({ id }).update(updatedData);
    return result;
};

// ❌ Delete contact
const deleteContactById = async (id) => {
    const result = await db('contact_page').where({ id }).del();
    return result;
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteContactById,
};
