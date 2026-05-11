const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/:questionID', questionController.getQuestionText);
router.delete('/:questionID', questionController.deleteQuestion);
router.post('/', questionController.createQuestion);
router.put('/:questionID', questionController.updateQuestion);
router.get('/:questionID/options',questionController.getOptionsForQuestion);
router.get('/', questionController.getAllQuestions);

module.exports = router;