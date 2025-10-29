const {
    createPortfolios,
    getAllPortfolioes,
    getPortfolioByIds,
    updatePortfolios,
    deletePortfolios,
} = require('../Dao/portfolioDao');

// Create a new portfolio item
const createPortfolio = async (req, res) => {
    const { subHeading, textOnImage, status } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const portfolioId = await createPortfolios(subHeading, image, textOnImage, status);
        return res.status(201).json({
            success: true,
            message: 'Portfolio item created successfully!',
            id: portfolioId
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to create portfolio item' });
    }
};

// Get all portfolio items
const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await getAllPortfolioes();
        return res.status(200).json({
            success: true,
            portfolios
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to fetch portfolios' });
    }
};

// Get portfolio by ID
const getPortfolioById = async (req, res) => {
    const { id } = req.params;
    try {
        const portfolio = await getPortfolioByIds(id);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio item not found' });
        }
        return res.status(200).json({
            success: true,
            portfolio
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to fetch portfolio' });
    }
};

// Update portfolio item
const updatePortfolio = async (req, res) => {
    const { id } = req.params;
    const { subHeading, textOnImage, status, oldImage } = req.body;

    try {
        // Use new uploaded file OR keep the old one
        const image = req.file ? req.file.filename : oldImage;

        // Update record
        const updated = await updatePortfolios(id, subHeading, image, textOnImage, status);

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Portfolio item not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Portfolio item updated successfully'
        });

    } catch (err) {
        console.error('Error updating portfolio:', err);
        return res.status(500).json({ success: false, message: 'Failed to update portfolio item' });
    }
};



// Delete portfolio item
const deletePortfolio = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deletePortfolios(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Portfolio item not found' });
        }
        return res.status(200).json({
            success: true,
            message: 'Portfolio item deleted successfully'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to delete portfolio item' });
    }
};

module.exports = {
    createPortfolio,
    getAllPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
};
