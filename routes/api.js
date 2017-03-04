var User = require("../modules/user");
var mongo = require("mongoose");
var config = require("../config");

var jsonWebToken = require("jsonWebToken");

var secretKey = config.secretKey;

module.exports = function (express) {

    function createToken(user) {

        var token = jsonWebToken.sign({

            _id: user._id,
            name: user.name,
            username: user.username
        }, secretKey);

        return token;
    }

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

    api.post("/login", function (req, res) {

        User.findOne({ username: req.body.username }).select("password").exec(function (err, usernameFinded) {

            if (err) {
                throw err;
            }

            if (!usernameFinded) {
                res.send("This user does not exist!!");
            } else {

                var validPassword = usernameFinded.comparePassword(req.body.password);

                if (!validPassword) {
                    res.send("The password is not correct!!");
                } else {

                    var token = createToken(usernameFinded);
                    res.send({
                        success: true,
                        message: "Successfully login",
                        token: token
                    })
                }
            }
        })
    });

    return api;
}