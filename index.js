var express = require('express');
var mongoose = require('mongoose');
var body_Parser  = require('body-parser');

const path = require('path')
var app= express();
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/formdb", { 
    useNewUrlParser: true,
    useUnifiedTopology: true

});
var db = mongoose.connection;
db.on('error',()=>console.log('error ocuuored'));
db.once('open',()=>console.log('open'))
app.post("/sign_up",(req,res)=>{
    var email = req.body.email;
    var pass = req.body.pass;
    var name = req.body.name;
    var age = req.body.age;
    var phno = req.body.phno;

    var data= {
    "name" :name,
    "email":email,
    "pass":pass,
    "phno":phno,
    "age":age

}
console.log( req.body.email);
console.log( req.body.pass);
console.log( req.body.name);
console.log( req.body.pho);
console.log( req.body.age);

app.use(express.static(__dirname + '/images'));

db.collection('users').insertOne(data,(err,collection)=>{
    if(err){
        throw err;
    }
    console.log("record stored");
})
return res.redirect('signup_success.html');
});

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-origin" :'*'
    })
    return res.redirect('index.html')
}).listen(4000);

console.log("Listening ")