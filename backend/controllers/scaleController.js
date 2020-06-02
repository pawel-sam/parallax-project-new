const Scale = require('../models/scale');

exports.getScales = function (req, res) {
 Scale.findById(req.params.pageId,(err,scales) => res.json(scales));
}

exports.addScale = function (req, res) {
    const scale = new Scale(req.body);
    scale.save((err,savedScale) => res.json(savedScale));
}

