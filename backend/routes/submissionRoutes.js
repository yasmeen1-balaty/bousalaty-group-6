const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { analyzeAndSuggestMajors } = require('../controllers/aiController'); // AI api

router.post('/', submissionController.createSubmission);
router.get('/student/:studentID/latest', submissionController.getLatestSubmission);
router.get('/student/:studentID', submissionController.getStudentSubmissions);
router.post('/:submissionID/analyze', analyzeAndSuggestMajors); // AI api
router.get('/:submissionID', submissionController.getSubmissionById);

module.exports = router;