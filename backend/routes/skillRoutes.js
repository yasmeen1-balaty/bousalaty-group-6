const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/', skillController.getAllSkills);
router.post('/', skillController.createSkill);
router.put('/:skillID', skillController.updateSkill);
router.delete('/:skillID', skillController.deleteSkill);

module.exports = router;