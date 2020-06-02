const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
router.get('/:scaleID', tagController.getTags)
    .post('/:scaleID', tagController.addTag)
    .post('/image/:tagID', tagController.uploadFile);

module.exports = router;