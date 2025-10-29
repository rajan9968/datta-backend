const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
    createAwards,
    getAllAwardsController,
    getAwardByIdController,
    updateAwardController,
    deleteAwardController
} = require("../Controller/awardsController");

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/awards"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post("/add-awards", upload.any(), createAwards);
router.get("/get-awards", getAllAwardsController);
router.get("/get-awards/:id", getAwardByIdController);
router.put("/update-award/:id", upload.any(), updateAwardController);
router.delete("/delete-award/:id", deleteAwardController);

module.exports = router;
