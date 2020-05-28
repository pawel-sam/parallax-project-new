const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    annotation: String,
    fullText: String,
    position: Number,
    type: String,
    imageId: Number,
    version: Number,
    scaleId: Number
});
module.exports = mongoose.model('Tag', tagSchema, 'tags');