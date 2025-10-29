const db = require('../config/db');

// CREATE
const createAward = async (award) => {
    const [id] = await db('awards').insert({
        sub_heading: award.sub_heading,
        banner_image: award.banner_image,
        spotlight: JSON.stringify(award.spotlight),
        all_awards: JSON.stringify(award.all_awards),
        status: award.status || 1,
    });
    return id;
};

// READ ALL
const getAllAwards = async () => {
    const rows = await db('awards').select('*').orderBy('id', 'desc');
    return rows;
};

// READ BY ID
const getAwardById = async (id) => {
    const row = await db('awards').where('id', id).first();
    return row || null;
};

// UPDATE
const updateAwardById = async (id, award) => {
    const updateData = {
        sub_heading: award.sub_heading,
        spotlight: JSON.stringify(award.spotlight),
        all_awards: JSON.stringify(award.all_awards),
        status: award.status,
        updated_at: db.fn.now(),
    };

    if (award.banner_image) {
        updateData.banner_image = award.banner_image;
    }

    const result = await db('awards').where('id', id).update(updateData);
    return result;
};

// DELETE
const deleteAwardById = async (id) => {
    const result = await db('awards').where('id', id).del();
    return result;
};

module.exports = {
    createAward,
    getAllAwards,
    getAwardById,
    updateAwardById,
    deleteAwardById,
};
