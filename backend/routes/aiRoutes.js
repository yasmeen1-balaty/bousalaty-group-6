const express = require("express");
const router = express.Router();

const {
  recommendMajors,
} = require("../controllers/aiController");

router.post("/recommend-majors", recommendMajors);

module.exports = router;