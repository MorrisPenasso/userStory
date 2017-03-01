var User = require("../modules/user");
var mongo = require("mongoose");

module.exports = function (express) {

    var api = express.Router();

    //get all users
    api.get("/users", function (req, res) {

        User.find(function (err, users) {

            if (err) {
                res.json(err);
            } else {
                res.json(users);
            }
        })
    })


    //for insert a new user into database 
    //localhost:8080/api/signup
    api.post("/signup", function (req, res) {

        //create a new document
        var user = new User({

            name: req.body.name,
            username: req.body.username,
            password: req.body.password

        });
        //save the document
        user.save(function (err) {
            if (err) {
                throw err;
            } else {
                res.json("User added!!");
            }
        })
    });
    return api;
}