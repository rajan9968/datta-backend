const { createCareers, getAllCareeres, deleteCareerByIds, updateCareerByIds, getCareerByIds } = require('../dao/CaseStudiesBannerDao');

// Create new career entry
const createCareer = async (req, res) => {
    try {
        const { sub_heading, status } = req.body;
        const image_carousel = req.file ? req.file.filename : null;

        const id = await createCareers({
            sub_heading,
            image_carousel,
            status,
        });

        res.status(201).json({ message: 'Career created successfully', id });
    } catch (error) {
        console.error('Error creating career:', error);
        res.status(500).json({ error: 'Failed to create career' });
    }
};


// Get all careers
const getAllCareers = async (req, res) => {
    try {
        const careers = await getAllCareeres();
        res.status(200).json(careers);
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ error: 'Failed to fetch careers' });
    }
};

// Get career by ID
const getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await getCareerByIds(id);

        if (!career) {
            return res.status(404).json({ error: 'Career not found' });
        }

        res.status(200).json({ success: true, career: career });
    } catch (error) {
        console.error('Error fetching career:', error);
        res.status(500).json({ error: 'Failed to fetch career' });
    }
};

// Update career by ID
const updateCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const { sub_heading, status, existingImage } = req.body;

        // If a new file is uploaded, use its filename
        const image_carousel = req.file ? req.file.filename : existingImage;

        const result = await updateCareerByIds(id, {
            sub_heading,
            image_carousel,
            status,
        });

        if (result === 0) {
            return res.status(404).json({ error: 'Career not found' });
        }

        res.status(200).json({ message: 'Career updated successfully' });
    } catch (error) {
        console.error('Error updating career:', error);
        res.status(500).json({ error: 'Failed to update career' });
    }
};

// Delete career by ID
const deleteCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteCareerByIds(id);

        if (result === 0) {
            return res.status(404).json({ error: 'Career not found' });
        }

        res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
        console.error('Error deleting career:', error);
        res.status(500).json({ error: 'Failed to delete career' });
    }
};

module.exports = {
    createCareer,
    getAllCareers,
    getCareerById,
    updateCareerById,
    deleteCareerById,
};
