const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const mdl = require('./model');
var ObjectId = require('mongodb').ObjectID;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// create new record
app.post('/', function (req, res) {
    const data = new mdl({
        title: req.body.title,
        content: req.body.content
    })
    // insert to database.
    data.save((err, result) => {
        if (err) throw err;
        console.log(result);
    });
    data.on('es-indexed', (err, result) => {
        console.log('indexed to elastic search');
    });

    res.send('inserted');
});
// Delete record
app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const myquery = { _id: ObjectId(id) };
    // find
    const doc = await mdl.findOne(myquery);
    if (!doc) return res.send('no doc');

    doc.remove((err) => {
        if (err) throw err;
        doc.on('es-removed', function (err, res) {
            if (err) throw err;
            /* Docuemnt is unindexed */
            console.log('Unindex done');
        });
        res.json('deleted');
    })
})
// Update 
app.patch('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const myquery = { _id: ObjectId(id) };
    mdl.findOneAndUpdate(myquery,{title:"update title 1212"},(err, data)=>{
        if(err) throw err;
        console.log(data);
    })
    res.json('updated');
})



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});