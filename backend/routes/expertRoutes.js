const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

router.get('/' , expertController.getAllExperts);
router.get('/:expertID', expertController.findExpert);
router.post('/', expertController.createExpert);
router.put('/:expertID', expertController.updateExpert);
router.delete('/:expertID', expertController.deleteExpert);

module.exports = router;