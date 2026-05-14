const express = require('express');
const router = express.Router();
const majorController = require('../controllers/majorController');

router.get('/' , majorController.getAllMajors);
router.get('/:majorID', majorController.findMajor);
router.get('/:majorID/skills', majorController.getMajorsSkills);
router.get('/:majorID/opportunities', majorController.getMajorsJobOpportuneties);
router.get('/:majorID/faculty', majorController.getMajorsFaculty);
router.post('/', majorController.createMajor);
router.put('/:majorID', majorController.updateMajor);
router.delete('/:majorID', majorController.deleteMajor);

module.exports = router;