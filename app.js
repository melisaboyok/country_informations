const exp = require("constants");
const express = require("express");
const https = require("https");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, function(){
    console.log("Server is started at port" + port);
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    let name = req.body.country;
    let url = "https://restcountries.com/v3.1/name/" + name;
    console.log(url);
    // let capital = "https://restcountries.com/v3.1/capital/" + name;

    https.get(url, function(response){
        var responseData ="";

       response.on("data", function(dataChunk){
        responseData += dataChunk;
       });

       response.on("end", function(){
        var countryInfo = JSON.parse(responseData);
        var countryRegion = countryInfo[0].region;
        var countryCapital = countryInfo[0].capital;
        var countrySubregion = countryInfo[0].subregion;
        var countryPopulation = countryInfo[0].population;
        var countryArea = countryInfo[0].area;
        res.setHeader('Content-Type', 'text/html');
        res.write("<h2>Region: " + countryRegion+ "</h2>");
        res.write("<h2>Capital: " + countryCapital+ "</h2>");
        res.write("<h2>Subregion: " + countrySubregion+ "</h2>");
        res.write("<h2>Population: " + countryPopulation+ "</h2>");
        res.write("<h2>Area: " + countryArea+ "</h2>");
        res.send();
        
       });
      
    });

});

