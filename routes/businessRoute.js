const express = require('express');
const router = express.Router();

const {
    createOurBusinessRecord,
    getAllOurBusinessRecords,
    getOurBusinessRecordById,
    updateOurBusinessRecord,
    deleteOurBusinessRecord
} = require('../controller/BusinessController');

// =======================
// Our Business Routes
// =======================

// Create new record
router.post('/add-bussiness', createOurBusinessRecord);

// Get all records
router.get('/getbussiness', getAllOurBusinessRecords);

// Get a single record by ID
router.get('/getbussiness/:id', getOurBusinessRecordById);

// Update a record by ID
router.put('/getbussiness/:id', updateOurBusinessRecord);

// Delete a record by ID
router.delete('/deletebussiness/:id', deleteOurBusinessRecord);

module.exports = router;
