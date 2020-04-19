const functions = require('firebase-functions');
var express = require('express');
var bodyparser= require('body-parser')
var urlencoderparser=bodyparser.urlencoded({ extended : false });
const mongoose =require('mongoose');
const uri = "mongodb+srv://anto:anto@cluster0-y2p9h.mongodb.net/test?retryWrites=true&w=majority";
const user = require('./models/userschema');
const firebase=require('firebase/app');
const firebaseConfig = {
    
}
  firebase.initializeApp(firebaseConfig);

var app= express();
app.use('/assets',express.static('assets'));
app.set('view engine','ejs');
  
app.get('/',(req,res)=>{
    res.render('home.ejs');
});

app.get('/log',(req,res)=>{
    res.render('dash.ejs');
});

app.post('/signup',urlencoderparser,async function(req,res){

   //res.render('dashboard.ejs');
   var email=req.body.smail;
   var password=req.body.spassword;

   const User = new user({
       _id: email,
       password: password
     });
    await User.save()
       .then(() => {
         // console.log(req.body.title);
         
         console.log('in here');
         res.render('dashboard.ejs');
       })
       .catch(err => {
         console.log('email id exists');
         res.status(400).send(err);
       });
    
});



app.post('/login',urlencoderparser,  async function(req,res){
   
    var email=req.body.email;
    var password=req.body.password;
    let val={
        _id:email,
        password: password
    }
    await user.findOne(val) //filters the posts by Id
    .then(result => {
      if(result !== null)
      {  
        res.render('dashboard.ejs');
      }
      else
      {
        res.redirect('login');
      } 
    }).catch(err => {
      res.status(400).send(err);
    })
    

   
     

});

app.get('/dashboard',function(req,res){
    res.render('dashboard.ejs');

});


app.get('/journal',function(req,res){

    res.render('journal.ejs');

});

app.get('/addentry',function(req,res){

    res.render('addentry.ejs');
});

app.get('/projects',function(req,res){

    res.render('project.ejs');
});
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=>{
    console.log('database connected!');})
  .catch(err => console.log(err));

//exports.app = functions.https.onRequest(app);
app.listen(3000);