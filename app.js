const express=require('express');
const app=express();
const port= process.env.port || 9000;
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');
const mongoose=require('mongoose');
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Apple-support");
}
// setting structure of database
const ContactSchema = new mongoose.Schema({
    name: String,
    help : String,
});
// locking the structure or schema
const Contact = mongoose.model("Contact", ContactSchema);
// EXPRESS SPECIFIC STUFF //
app.use('/static',express.static('static'));  // for serving static file in app.js
app.use(express.urlencoded()); // to transefer all data of our website to express
// PUG SPECIFIC STUFF //
app.set('view engine','html') //set the templete engine
app.set('views',path.join(__dirname,'views')); //set the views directory                
// ENDPOINTS //
app.get("/",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/index.html');
});
app.get("/music",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/music.html');
});
app.get("/tv",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/tv.html');
});
app.get("/fitness",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/fitness.html');
});
app.get("/arcade",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/arcade.html');
});
app.get("/icloud",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/icloud.html');
});
app.get("/contact",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/contact.html');
});
app.get("/pay",(req,res)=>{
    const param={};
    res.sendFile(__dirname + '/views/pay.html');
});
app.post("/contact",(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("Thanks ! our experts will contact you soon......... ")
    })
    .catch(()=>{
        res.status(404).send("Not found");
    })
});
// app.post("/contact",(req,res)=>{
//     // console.log(req.body);
//     name=req.body.name;
//     query=req.body.help;
//     let outputToWrite=`name of client is ${name},My query is ${query}`;

//     fs.writeFileSync('output.txt',outputToWrite)

//     const param={'message':'Your form is submitted successfully.'}
//     // res.status(300).render('contact.html',param);
//     // res.sendFile('contact.html',param);
//     res.sendFile(__dirname + '/views/contact.html');
//      res.send("Our expert will e-mail you soon...........");
// });
// START THE SERVER
app.listen(port,()=>{
    console.log(`App successfully started on ${port}`)
});
