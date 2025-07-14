const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
require('dotenv').config();

//make the express app
const app = express();
//register view engine
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
const dbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';

//we need the bodyParser to parse the data coming with the html form
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}));


//make a use of the public folder for the static files
app.use(express.static('public'));

MongoClient.connect(dbConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(client=>{
    console.log('Connected to Database dbRabbits');
    const db = client.db('dbRabbits');
    const collectionOtters = db.collection('otters');
    const collectionOwls = db.collection('owls');
    const collectionChipmunks = db.collection('chipmunks');
    const collectionSubjects = db.collection('subjectNumbers');

    app.get('/', (req, res) => {
      res.render('index', {title: 'Experiments', myVar: "what?"} );
    })

    app.get('/task1', (req, res) => {
        res.render('task1', {title: 'Task One'} );
    })

    app.get('/task2', (req, res) => {
      res.render('task2');
    })

    app.get('/task3', (req, res) => {
      res.render('task3');
    })

    app.get('/logOtters', (req, res) => {
      // res.sendFile(__dirname + '/public/');
      db.collection('otters').find().toArray()
        .then(results =>{
          console.log(results);
          res.json(results);
        })
        .catch(error=>console.error(error));
    })
    
    app.get('/logOwls', (req, res) => {
      // res.sendFile(__dirname + '/public/');
      db.collection('owls').find().toArray()
        .then(results =>{
          console.log(results);
          res.json(results);
        })
        .catch(error=>console.error(error));
    })

    app.get('/logChipmunks', (req, res) => {
      // res.sendFile(__dirname + '/public/');
      db.collection('chipmunks').find().toArray()
        .then(results =>{
          console.log(results);
          res.json(results);
        })
        .catch(error=>console.error(error));
    })
    
    app.get('/subjects', (req, res) => {
      //do something
      // res.sendFile(__dirname + '/public/');
      db.collection('subjectNumbers').find().toArray()
        .then(results =>{
          res.json(results);
          // console.log(results);
        })
        .catch(error=>console.error(error));
    })

    app.get('/single_subject/:id',(req,res)=>{
      console.log("object id: "+req.params.id);
      let o_id = new mongo.ObjectId(req.params.id);
      let collection = db.collection("subjectNumbers");
      collection.findOne({"_id": o_id})
      .then(result=>{
        // res.send(result);
        res.json(result);
      })
      .catch(error => console.error(error));
    })


    //POST
    app.post('/otters',(req,res)=>{
      console.log(req.body);
      collectionOtters.insertOne(req.body)
        .then(result=>{
          console.log(result);
          res.json(result);
          // res.redirect('/')
        })
        .catch(error => console.error(error));
    })

    app.post('/owls',(req,res)=>{
      console.log(req.body);
      collectionOwls.insertOne(req.body)
        .then(result=>{
          console.log(result);
          res.json(result);
          // res.redirect('/')
        })
        .catch(error => console.error(error));
    })

    app.post('/chipmunks',(req,res)=>{
      console.log(req.body);
      collectionChipmunks.insertOne(req.body)
        .then(result=>{
          console.log(result);
          res.json(result);
          // res.redirect('/')
        })
        .catch(error => console.error(error));
    })

    app.post('/subjects',(req,res)=>{
      console.log(req.body);
      collectionSubjects.insertOne(req.body)
        .then(result=>{
          console.log("you posted something on the subject collection. " + result.insertedId);
          res.json(result);
          // res.redirect('/')
        })
        .catch(error => console.error(error));
    })

    app.put('/update_subject', (req, res)=>{
      res.send('Got a PUT request');
      console.log(req.body);
      // console.log(req.body.data.data);
      let o_id = new mongo.ObjectId(req.body.data.id);
      let collection = db.collection("subjectNumbers");
      collection.findOneAndUpdate({_id: o_id}, {$set: {experiment: req.body.data.experiment}}, {upsert: false}, function(err,doc) {
       if (err) { throw err; }
       else {
         console.log("Updated");
       }
     });
    })

  })
  .catch(error => console.error(error));

app.listen(port, function(){
  console.log(`listening on ${port}`);
})

