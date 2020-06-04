const express = require('express');
const router = express.Router();
const pageRouter = require('./pageRouter');
const scaleRouter = require('./scaleRouter');
const tagRouter = require('./tagRouter');
router.use('/', pageRouter)
    .use('/scale/', scaleRouter)
    .use('/tag/', tagRouter);
module.exports = router;