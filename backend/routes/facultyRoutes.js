const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/' , facultyController.getAllFaculties)
router.get('/:facultyID/majors', facultyController.getMajors);
router.post('/', facultyController.createFaculty);
router.get('/:facultyID', facultyController.findFaculty);  // return faculty name only
router.put('/:facultyID', facultyController.updateFaculty);
router.delete('/:facultyID', facultyController.deleteFaculty);
router.get('/:facultyID/experts', facultyController.getExperts);

module.exports = router;
