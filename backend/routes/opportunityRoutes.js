const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

router.get('/', opportunityController.getAllOpportunities);
router.post('/', opportunityController.createOpportunity);
router.put('/:oppoID', opportunityController.updateOpportunity);
router.delete('/:oppoID', opportunityController.deleteOpportunity);

module.exports = router;