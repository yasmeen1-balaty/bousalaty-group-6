const express = require("express");
const router = express.Router();

const {
  analyzeAndSuggestMajors,
} = require("../controllers/aiController");

router.post("/analyze/:submissionID", analyzeAndSuggestMajors);

module.exports = router;