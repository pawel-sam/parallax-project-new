const Tag = require('../models/tag');
exports.getTags = function getTags(req, res) {
  Tag.findById(req.params.scaleId,(err,tags) => res.json(tags));
}

exports.addTag = function addTag(req, res) {
    const tag = new Tag(req.body);
    tag.save((err,savedTag) => res.json(savedTag));
}

exports.uploadFile = function uploadFile(req, res, next) {
    let filedata = req.file;
    if(!filedata) {
        res.send("Ошибка при загрузке файла");
    } else {
        res.send("Файл загружен");
    }
}
