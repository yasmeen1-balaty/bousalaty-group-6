const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.post('/', skillController.createSkill);
router.put('/:skillID', skillController.updateSkill);
router.delete('/:skillID', skillController.deleteSkill);

module.exports = router;