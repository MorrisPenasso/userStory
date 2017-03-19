//import nodejs libraries

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require("./config");
var mongo = require("mongoose");
var app = new express();

var http = require("http").Server(app);

var io = require("socket.io")(http);

//connect at database
mongo.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to the database");
    }
});

    //use middleweare functions
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan("dev"));

    //call external module and pass express instance (app) and library
    var api = require("./app/routes/api")(app, express, io);

    //middleware function that when user call "/" URL , call api variable that contain an external module
    app.use("/api", api);

    //for all url request arrived from the client, load entire folder
    app.use(express.static(__dirname + "/public"));

    //send a specific file
    app.get("*", function (req, res) {

        res.sendFile(__dirname + "/public/app/views/index.html");

    });

    http.listen(config.port, function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log("Listening on port: " + config.port);
        }
    })