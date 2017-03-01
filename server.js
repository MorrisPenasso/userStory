var express = require("express");
var bodyParser = require("body-parser");
var mongo = require("mongoose");

var config = require("./config");

var app = new express();

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/views/index.html");
});

app.listen(config.port, function (err) {

    if (err) {
        throw err;
    } else {
        console.log("Server started!");
    }

});