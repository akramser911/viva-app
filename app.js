const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
//const productRoute = require('./route/products');
const projectRoute = require('./route/projects');




const port = 5000;
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://akramser:Dzgamer12@cluster0.gzbhhcb.mongodb.net/?retryWrites=true&w=majority"

).then(()=> {
    app.listen(port, ()=>{
        console.log('it is working');
    })
    console.log('DBCONNECTION successfull!')}).catch((err)=>{
    console.log(err);
});


app.use([bodyParser.urlencoded({extended : true}), express.json()]);
app.use('/projects', projectRoute);


app.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
