const express = require('express');
const router = express.Router();
const scaleController = require('../controllers/scaleController');
router.get('/:pageID', scaleController.getScales)
    .post('/:pageID', scaleController.addScale);

module.exports = router;
