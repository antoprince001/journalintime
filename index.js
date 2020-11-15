var express = require('express');
var bodyParser= require('body-parser')
//var urlencoderparser=bodyparser.urlencoded({ extended : false });
const mongoose =require('mongoose');
const uri = "mongodb+srv://anto:anto@cluster0-y2p9h.mongodb.net/test?retryWrites=true&w=majority";
const Journal = require('./models/journalSchema');
const Task = require('./models/taskSchema');

var app= express();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('01dd9bdbb831421da729c605300ec9e2');


app.use('/assets',express.static('assets'));
app.set('view engine','ejs');
app.use(bodyParser.json());                     //Post requests
app.use(bodyParser.urlencoded({ extended: false }));


/* Home Page */
app.get('/',(req,res)=>{
    res.render('home.ejs');
});

/* Login Page */
app.get('/log',(req,res)=>{
    res.render('dash.ejs');
});


app.get('/dashboard',function(req,res){
    res.render('dashboard.ejs');

});

app.post('/signup',function(req,res){

   res.render('dashboard.ejs');
  
    
});





/* Journal actions */

app.get('/journal',function(req,res){

    Journal.find({})
    .then((data)=>{
        res.render('journal.ejs', { journal : data});
    })
    .catch((err)=>{
        res.send(err);
    });
   

});

app.get('/addentry',function(req,res){

    res.render('addentry.ejs');
});

app.post('/addJournal', function(req,res){
   
    const newJournal = new Journal(
        {
            "journalTitle" :  req.body.title, 
            "journalDesc" : req.body.content,
            "dateOfEntry"    : req.body.date,
         }
        );
        newJournal.save()
            .then((data)=> {

               res.redirect('/journal')

            })
            .catch((err)=> {
              console.log(err);
              res.json({ msg : err});
            })
     
});


app.post('/deleteEntry',function(req,res){
   
    Journal.findByIdAndRemove({ _id : req.body.id })
      .then(()=>{
          res.redirect('/journal')
      })
      .catch((err)=>{
          res.json({ error : err.message})
      })
});
/* Project actions */
app.get('/news',function(req,res){

    newsapi.v2.everything({
        q: req.query.find === undefined ? 'news' : req.query.find,
      }).then(response => {
        console.log(response);
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
       res.render('news.ejs',{ news : response});
      })
      .catch((err)=>{
          console.log(err);
      })
    
});

app.get('/tasks',function(req,res){

    Task.find({})
    .then((data)=>{
        res.render('tasks.ejs',{ tasks : data});
    })
    .catch((err)=>{
        res.render('tasks.ejs');
    })
    
});

app.post('/deleteTask',function(req,res){

    //res.send(req.body.taskid)
    console.log(req.body.taskid);
    Task.findByIdAndRemove({ _id : req.body.taskid })
      .then(()=>{
          res.redirect('/tasks')
      })
      .catch((err)=>{
          res.json({ error : err.message})
      })
    
});

app.post('/addTask',function(req,res){

    const newTask = new Task(
        {
            "task" :  req.body.task, 
            "date" : new Date(),
         }
        );
        newTask.save()
            .then((data)=> {

               res.redirect('/tasks')

            })
            .catch((err)=> {
              console.log(err);
              res.json({ msg : err});
            })
     
    
});

mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=>{
    console.log('database connected!');})
  .catch(err => console.log(err));

app.listen(3000);