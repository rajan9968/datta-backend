const {
    createAward,
    getAllAwards,
    getAwardById,
    updateAwardById,
    deleteAwardById
} = require('../Dao/awardsDao.js');

// CREATE
const createAwards = async (req, res) => {
    try {
        const { sub_heading, status } = req.body;
        const spotlight = JSON.parse(req.body.spotlight || "[]");
        const all_awards = JSON.parse(req.body.all_awards || "[]");

        // Get banner image
        const bannerFile = req.files?.find(f => f.fieldname === "banner_image");
        const banner_image = bannerFile ? bannerFile.filename : null;

        // Handle spotlight and all_awards images
        const spotlightWithImages = spotlight.map((item, i) => {
            const file = req.files?.find(f => f.fieldname === `spotlight_image_${i}`);
            return { ...item, carousel_image: file ? file.filename : item.carousel_image };
        });

        const allAwardsWithImages = all_awards.map((item, i) => {
            const file = req.files?.find(f => f.fieldname === `all_award_image_${i}`);
            return { ...item, image: file ? file.filename : item.image };
        });

        const award = {
            sub_heading,
            banner_image,
            spotlight: spotlightWithImages,
            all_awards: allAwardsWithImages,
            status
        };

        const id = await createAward(award);
        res.json({ success: true, message: "Award section created", id });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// READ ALL
const getAllAwardsController = async (req, res) => {
    try {
        const awards = await getAllAwards();
        res.json({ success: true, awards });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// READ BY ID
const getAwardByIdController = async (req, res) => {
    try {
        const award = await getAwardById(req.params.id);
        if (!award) return res.status(404).json({ success: false, message: "Award not found" });
        res.json({ success: true, award });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE
const updateAwardController = async (req, res) => {
    try {
        const { id } = req.params;
        const { sub_heading, status } = req.body;
        const spotlight = JSON.parse(req.body.spotlight || "[]");
        const all_awards = JSON.parse(req.body.all_awards || "[]");

        const bannerFile = req.files?.find(f => f.fieldname === "banner_image");
        const banner_image = bannerFile ? bannerFile.filename : null;

        const spotlightWithImages = spotlight.map((item, i) => {
            const file = req.files?.find(f => f.fieldname === `spotlight_image_${i}`);
            return { ...item, carousel_image: file ? file.filename : item.carousel_image };
        });

        const allAwardsWithImages = all_awards.map((item, i) => {
            const file = req.files?.find(f => f.fieldname === `all_award_image_${i}`);
            return { ...item, image: file ? file.filename : item.image };
        });

        const award = {
            sub_heading,
            banner_image,
            spotlight: spotlightWithImages,
            all_awards: allAwardsWithImages,
            status
        };

        const updated = await updateAwardById(id, award);
        if (updated === 0)
            return res.status(404).json({ success: false, message: "Award not found or nothing to update" });

        res.json({ success: true, message: "Award updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE
const deleteAwardController = async (req, res) => {
    try {
        const deleted = await deleteAwardById(req.params.id);
        res.json({ success: true, message: deleted ? "Award deleted" : "Award not found" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createAwards,
    getAllAwardsController,
    getAwardByIdController,
    updateAwardController,
    deleteAwardController
};
