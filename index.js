var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
require("dotenv").config()

mongoose.set('strictQuery', false);

const app = express()

app.use(bodyParser.json())
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(
    `mongodb+srv://jishnu:jishnu@cluster0.albdou3.mongodb.net/?retryWrites=true&w=majority&ssl=false`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
  

app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/home/deadpool/Desktop/JISHNU/PRJT/TAKE PART/Front-End/public/03_user_registration.html.html');
}).listen(3000,()=>{
  console.log("listening on port 3000")
});


app.post("/userreg",(req,res) => {
    var username = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "username" : username,
        "email" : email,
        "phone" : phone,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully");
    });

    return res.redirect('00_reg_success.html');
})

app.get('/about',(req,res)=>{
    console.log("about")
    res.status(200).send('about')
})

