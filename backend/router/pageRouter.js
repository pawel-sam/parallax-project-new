const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
router.get('/:pageID', pageController.getPageById)
    .post('/', pageController.addPage)
    .post('/:pageID',  pageController.updatePageById)
    .delete('/:pageID', pageController.deletePageById);

module.exports = router;



