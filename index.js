var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
const { MongoClient } = require('mongodb');
const fs = require('fs');
// const { JSDOM } = require('jsdom');
const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/group0')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/contact",(req,res) => {
  var fname = req.body.fname
  var lname = req.body.lname
  var email = req.body.email
  var addtional = req.body.addtional

  var data={
      "fname":fname,
      "lname":lname,
      "email":email,
      "additional":addtional
  }
  db.collection('Contact').insertOne(data,(err,collection) => {
      if(err){
          throw err;
      }
      console.log("Record Inserted Succesfully")
  })
  return res.redirect('home.html')
})

app.post("/signup",(req,res) => {
    var usr_name = req.body.usr_name
    var usr_pass = req.body.usr_pass
    var usr_mail = req.body.usr_mail
    // var usr_dob = req.body.usr_dob
    // var usr_email = req.body.usr_email

    var data={
        "userName":usr_name,
        "password":usr_pass,
        "Email":usr_mail
        // "dob":usr_dob,
        // "email":usr_email
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('index2.html')
})


app.post('/log', async (req, res) => {
  var usr_name = req.body.username;
  var pass = req.body.user_pass; 
  console.log(usr_name);
  console.log(pass);
  try {
    const user = await db.collection('users').findOne({ password:pass, userName:usr_name });
    
    if (user) {
      console.log("Access Given!");
      return  res.redirect('home.html');
    } else {
      window.open("index4.html");
      console.log("Invalid Credintials!");
      console.log("Error");
      // res.redirect('index4.html');      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index2.html');
}).listen(3000);

console.log("Listening on port 3000");

