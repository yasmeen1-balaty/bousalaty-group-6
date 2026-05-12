const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/:resultID/suggested-majors', resultController.getSuggestedMajors);

module.exports = router;