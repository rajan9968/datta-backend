const {
    createCareers,
    getAllCareeres,
    getCareerByIds,
    updateCareerByIds,
    deleteCareerByIds,
} = require('../Dao/careerAdminDao.js');

// ✅ Create new career entry
const createCareer = async (req, res) => {
    try {
        const {
            banner_sub_heading,
            key_highlights,
            employee_testimonials,
            why_join_count
        } = req.body;

        // Handle banner image
        const banner_image = req.files?.banner_image?.[0]?.filename || null;

        // Reconstruct why_join array with uploaded icons
        const whyJoin = [];
        const iconFiles = req.files?.why_join_icons || [];

        for (let i = 0; i < parseInt(why_join_count || 0); i++) {
            const heading = req.body[`why_join_heading_${i}`];
            const text = req.body[`why_join_text_${i}`];

            // Match icon file for this index
            const iconFile = iconFiles[i] || null;

            whyJoin.push({
                icon: iconFile ? iconFile.filename : null,
                heading: heading || "",
                text: text || ""
            });
        }

        // Parse other JSON fields
        const keyHighlightsData = typeof key_highlights === 'string'
            ? JSON.parse(key_highlights)
            : key_highlights;

        const employeeTestimonialsData = typeof employee_testimonials === 'string'
            ? JSON.parse(employee_testimonials)
            : employee_testimonials;

        const id = await createCareers({
            banner_sub_heading,
            banner_image,
            why_join: JSON.stringify(whyJoin),
            key_highlights: JSON.stringify(keyHighlightsData),
            employee_testimonials: JSON.stringify(employeeTestimonialsData),
        });

        res.status(201).json({
            success: true,
            message: 'Career created successfully',
            id
        });
    } catch (error) {
        console.error('Error creating career:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create career',
            message: error.message
        });
    }
};

// ✅ Get all careers
const getAllCareers = async (req, res) => {
    try {
        const careers = await getAllCareeres();
        res.status(200).json(careers);
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ error: 'Failed to fetch careers' });
    }
};

// ✅ Get career by ID
const getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await getCareerByIds(id);

        if (!career) {
            return res.status(404).json({ error: 'Career not found' });
        }

        res.status(200).json({ success: true, career });
    } catch (error) {
        console.error('Error fetching career:', error);
        res.status(500).json({ error: 'Failed to fetch career' });
    }
};

// ✅ Update career by ID
const updateCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            banner_sub_heading,
            key_highlights,
            employee_testimonials,
            why_join_count,
            existing_banner_image
        } = req.body;

        // Handle banner image - use new file if uploaded, otherwise keep existing
        const banner_image = req.files?.banner_image?.[0]?.filename || existing_banner_image;

        // Reconstruct why_join array with uploaded icons
        const whyJoin = [];
        const iconFiles = req.files?.why_join_icons || [];

        for (let i = 0; i < parseInt(why_join_count || 0); i++) {
            const heading = req.body[`why_join_heading_${i}`];
            const text = req.body[`why_join_text_${i}`];
            const existingIcon = req.body[`why_join_existing_icon_${i}`];

            // Use new icon if uploaded, otherwise keep existing icon
            const iconFile = iconFiles[i] || null;
            const icon = iconFile ? iconFile.filename : (existingIcon || null);

            whyJoin.push({
                icon: icon,
                heading: heading || "",
                text: text || ""
            });
        }

        // Parse other JSON fields
        const keyHighlightsData = typeof key_highlights === 'string'
            ? JSON.parse(key_highlights)
            : key_highlights;

        const employeeTestimonialsData = typeof employee_testimonials === 'string'
            ? JSON.parse(employee_testimonials)
            : employee_testimonials;

        // Update career data
        const result = await updateCareerByIds(id, {
            banner_sub_heading,
            banner_image,
            why_join: JSON.stringify(whyJoin),
            key_highlights: JSON.stringify(keyHighlightsData),
            employee_testimonials: JSON.stringify(employeeTestimonialsData),
        });

        if (result === 0) {
            return res.status(404).json({
                success: false,
                error: 'Career not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Career updated successfully'
        });
    } catch (error) {
        console.error('Error updating career:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update career',
            message: error.message
        });
    }
};
// ✅ Delete career by ID
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
