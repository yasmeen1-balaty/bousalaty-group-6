const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.get('/', optionController.getAllOptions);
router.get('/:optionID', optionController.getOptionText);

router.post('/', optionController.createOption);
router.put('/:optionID', optionController.updateOption);
router.delete('/:optionID', optionController.deleteOption);

module.exports = router;