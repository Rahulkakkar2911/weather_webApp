// This project has various dependencies : look on to the package.json

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// Performing the get request => when the user make a request on his browser to the home route ,the below callback function responds to the GET request.


app.get("/", function(req,res){
    
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function(req,res){
   const query = String(req.body.cityName);
   const apiKey =  "1e92c02b348e43b2ba3e98030de0bcca";
   const unit = "metric"
   const apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?"
   const url = apiEndPoint +"appid=" + apiKey +"&q=" + query + "&units=" + unit;
   
   https.get(url ,function(response){
        
            response.on("data", function(data){
                
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const wheatherDesc = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.write("<h1>The weather is Currently " + wheatherDesc + "</h1>");
                res.write("<h1>Temperature in "+ query + " is " + temp + " &degC</h1>");
                res.write("<img src =" + icon_url + ">")
                res.send();
            })
    
    
        })

})
app.listen(3000, function(){
    console.log("server is Running on server 3000");
});