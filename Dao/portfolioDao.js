const db = require('../config/db');  // Assuming you are using Knex.js or a similar query builder

// Create a new portfolio item
const createPortfolios = async (subHeading, image, textOnImage, status) => {
    console.log(subHeading, image, textOnImage, status);
    return db('our_portfolio').insert({
        sub_heading: subHeading,
        image: image,
        text_on_image: textOnImage,
        status: status
    });
};


// Get all portfolio items
const getAllPortfolioes = async () => {
    return db('our_portfolio').select('*').orderBy('created_at', 'desc');
};

// Get portfolio by ID
const getPortfolioByIds = async (id) => {
    return db('our_portfolio').where({ id }).first();
};

// Update a portfolio item
const updatePortfolios = async (id, subHeading, image, textOnImage, status) => {
    return db('our_portfolio')
        .where({ id })
        .update({
            sub_heading: subHeading,
            image: image,
            text_on_image: textOnImage,
            status: status
        });
};

// Delete a portfolio item
const deletePortfolios = async (id) => {
    return db('our_portfolio').where({ id }).del();
};

module.exports = {
    createPortfolios,
    getAllPortfolioes,
    getPortfolioByIds,
    updatePortfolios,
    deletePortfolios
};
