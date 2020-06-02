const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pageSchema = new Schema({
    scaleIds: Array,
    version: Number
});
module.exports = mongoose.model('Page', pageSchema, 'pages');