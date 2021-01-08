// This project has various dependencies : look on to the package.json

const express = require('express');
const app = express();

app.get('/', function(req,res){
    res.send("<h1>Hello, Server is responding to the GET request completely fine.</h1>");
});


app.listen(3000, function(){
    console.log("server is Running on server 3000");
});