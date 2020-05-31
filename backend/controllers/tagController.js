const Tag = require('../models/tag');
exports.getTags = function getTags(req, res) {
    Tag.findById(req.params.scaleID,(err, tags) => res.json(err || tags));

}

exports.addTag = function addTag(req, res) {
    const tag = new Tag(req.body);
    tag.save((err, savedTag) => res.json(err || savedTag));
}

exports.uploadFile = function uploadFile(req, res, next) {
    let filedata = req.file;
    if (!filedata) {
        res.send("Ошибка при загрузке файла");
    } else {
        res.send("Файл загружен");
    }
}
