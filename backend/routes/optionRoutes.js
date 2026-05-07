const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.get('/:optionID', optionController.getOptionText);
router.delete('/:optionID', optionController.deleteOption);
router.post('/', optionController.createOption);
router.put('/:optionID', optionController.updateOption);

module.exports = router;