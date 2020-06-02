const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scaleSchema = new Schema({
    startDate: { type: Number, default: 2010 },
    endDate: { type: Number, default: 2028},
    step: { type: Number, default: 1},
    ratio: Number,
    pageId: Number
});
module.exports = mongoose.model('Scale', scaleSchema, 'scales');