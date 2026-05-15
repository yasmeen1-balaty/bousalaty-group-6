const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { analyzeAndSuggestMajors } = require('../controllers/aiController'); // ←  هذا

router.post('/', submissionController.createSubmission);
router.get('/student/:studentID/latest', submissionController.getLatestSubmission);
router.get('/student/:studentID', submissionController.getStudentSubmissions);
router.post('/:submissionID/analyze', analyzeAndSuggestMajors); // ← هذا

module.exports = router;