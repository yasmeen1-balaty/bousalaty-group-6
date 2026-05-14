const express = require('express');

const router = express.Router();

const submissionController = require('../controllers/submissionController');

router.post('/', submissionController.createSubmission);

router.get('/student/:studentID/latest', submissionController.getLatestSubmission);

router.get('/student/:studentID', submissionController.getStudentSubmissions );
module.exports = router;
