const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const PORT = process.env.PORT || 5000;
const mongoClient = new MongoClient('mongodb://Alexferdinand:Rb2i8C!grMe$Bzn@ds113505.mlab.com:13505/heroku_wvvx3cb8', {useNewUrlParser: true, useUnifiedTopology: true});//process.env.MONGODB_URI

const app = express();
let dbCollections = {};
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public/index.html'))} )
    .post('/', addPage)
    .get('/:pageID', getPageById)
    .post('/:pageID', updatePageById)
    .delete('/:pageID', deletePageById)
    .get('/scale/:pageID', getScales)
    .post('/scale/:pageID', addScale)
    .get('/tag/:scaleID', getTags)
    .post('/tag/:scaleID', addTag)
    .post('/image/:tagID', uploadFile)
    .listen(PORT, () => {
        console.log(`Listening on ${ PORT }`);
        mongoClient.connect((err, client) => {
            const db = client.db('heroku_wvvx3cb8');
            dbCollections.pages = db.collection("pages");
            dbCollections.scales = db.collection("scales");
            dbCollections.tags = db.collection("tags");
            dbCollections.images = db.collection("images");
        });
        console.log('Connected to MongoDB');

    });

function addPage(req, res) {
    console.log('At "addPage"');
    const page = req.body;
    dbCollections.pages.insertOne(page, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(result.ops[0]._id);
        }
    });
}

function getPageById(req, res) {
    console.log('At "getPageById"');
    const pageID = req.params.pageID;
    const details = {"_id": new ObjectID(pageID)};
    dbCollections.pages.findOne(details, function (err, page) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(page);
        }
    });
}

function updatePageById(req, res) {
    console.log('At "updatePageById"');
    const pageID = req.params.pageID;
    const page = req.body;
    console.log(pageID, page);
    const details = {"_id": new ObjectID(pageID)};
    dbCollections.pages.updateOne(details, page, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(result);
        }
    });
}

function deletePageById(req, res) {
    console.log('At "deletePageById"');
    const pageID = req.params.pageID;
    const details = {"_id": new ObjectID(pageID)};
    dbCollections.pages.removeOne(details, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(`Страница #${pageID} успешно удалена`);
        }
    });
}

function getScales(req, res) {
    console.log('At "getScales"');
    const pageID = req.params.pageID;
    const details = {"pageID": pageID};
    dbCollections.scales.find(details, function (err, scales) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(scales);
        }
    });
}

function addScale(req, res) {
    console.log('At "addScale"');
    const pageID = req.params.pageID;
    const scale = req.body;
    scale.pageID = pageID;
    dbCollections.scales.insertOne(scale, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(result);
        }
    });
}

function getTags(req, res) {
    console.log('At "getTags"');
    const scaleID = req.params.scaleID;
    const details = {"scaleID": scaleID};
    dbCollections.tags.find(details, function (err, tags) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(tags);
        }
    });
}

function addTag(req, res) {
    console.log('At "addTag"');
    const tag = req.body;
    dbCollections.tags.insertOne(tag, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(result);
        }
    });
}

function uploadFile(req, res) {
    console.log('At "uploadFile"');
    const file = req.body;
    dbCollections.images.insertOne(file, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(result);
        }
    });
}