const express = require('express');
const router = express.Router();

const responseController = require('../controllers/responseController');

router.post('/', responseController.createResponse);
router.get('/', responseController.getAllResponses);
router.get('/submission/:submissionID', responseController.getResponsesBySubmission);
router.get('/:responseID', responseController.getResponseById);
router.put('/:responseID', responseController.updateResponse);
router.delete('/:responseID', responseController.deleteResponse);

module.exports = router;