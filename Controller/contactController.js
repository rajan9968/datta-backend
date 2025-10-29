const {
    createContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteContactById,
} = require('../Dao/contactDao.js');

// Create Contact (with image upload)
const createContactController = async (req, res) => {
    try {
        const contact = {
            contact_banner: req.file ? req.file.filename : null,
            contact_sub_heading: req.body.contact_sub_heading || '',
            office_main: req.body.office_main || '',
            office_other: req.body.office_other || '',
            status: req.body.status || 1,
        };

        if (!contact.contact_banner) {
            return res.status(400).json({ success: false, message: 'Banner image is required' });
        }

        const id = await createContact(contact);
        res.json({ success: true, message: 'Contact created successfully', id });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Contacts
const getAllContactsController = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.json({ success: true, contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single Contact by ID
const getContactByIdController = async (req, res) => {
    try {
        const contact = await getContactById(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, contact });
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Contact
const updateContactController = async (req, res) => {
    try {
        const updatedData = {
            contact_sub_heading: req.body.contact_sub_heading,
            office_main: req.body.office_main,
            office_other: req.body.office_other,
            status: req.body.status,
        };

        if (req.file && req.file.filename) {
            updatedData.contact_banner = req.file.filename;
        }

        const result = await updateContactById(req.params.id, updatedData);

        if (result === 0) {
            return res.status(404).json({ success: false, message: 'Contact not found or not updated' });
        }

        res.json({ success: true, message: 'Contact updated successfully' });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Contact
const deleteContactController = async (req, res) => {
    try {
        const result = await deleteContactById(req.params.id);
        res.json({
            success: true,
            message: result ? 'Contact deleted successfully' : 'Contact not found',
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createContactController,
    getAllContactsController,
    getContactByIdController,
    updateContactController,
    deleteContactController,
};
