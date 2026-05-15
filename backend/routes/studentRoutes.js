const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/:studentID/saved-majors', studentController.getSavedMajors);
router.post('/:studentID/add-saved-major', studentController.addToSavedMajors);
router.delete('/:studentID/remove-saved-major', studentController.removeFromSavedMajors);
router.get('/:studentID', studentController.findStudent);
router.post('/', studentController.createStudent);
router.put('/:studentID', studentController.updateStudent);
router.delete('/:studentID', studentController.deleteStudent);

module.exports = router;