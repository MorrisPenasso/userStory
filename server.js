var express = require("express");
var bodyParser = require("body-parser");
var mongo = require("mongoose");

var config = require("./config");

var app = new express();
app.use(bodyParser.json());

//connection with mongodb
mongo.connect(config.database, function (err) {

    if (err) {
        throw err;
    } else {
        console.log("Database connected!!");
    }

});

//for send html file 
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/public/app/views/index.html");
});

app.use(express.static(__dirname + "/public"));

var api = require("./routes/api")(express);

app.use("/api", api)


app.listen(config.port, function (err) {

    if (err) {
        throw err;
    } else {
        console.log("Server started!");
    }

});