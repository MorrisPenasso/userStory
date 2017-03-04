var User = require("../modules/user");
var Story = require("../modules/story");
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

    //api for login 
    api.post("/login", function (req, res) {

        //search existing document and select his password
        User.findOne({ username: req.body.username }).select("password").exec(function (err, usernameFinded) {

            if (err) {
                throw err;
            }

            if (!usernameFinded) {
                res.send("This user does not exist!!");
            } else {
                
                //compare password received from the client with password hashed stored into document
                var validPassword = usernameFinded.comparePassword(req.body.password);

                if (!validPassword) {
                    res.send("The password is not correct!!");
                } else {

                    //create a token
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

    //global middleweare (localost:8080/api/"
    //for all requests "/"
    api.use(function (req, res, next) {

        var token = req.body.token || req.headers["x-access-token"];

        if (!token) {
            res.send("No token provided!!");
        } else {
            //decode token of user
            var verifyUser = jsonWebToken.verify(token, secretKey, function (err, userDecoded) {
                if (err) {
                    res.status(401).send("Failed to authenticate user");
                } else {
                    req.decoded = userDecoded;
                    next();
                }
            });
        }
    });

    //for store into database a new story document of user id that arrived from token that has been decoded
    //only token encrypt the username credential when he logged in
    api.post("/", function (req, res) {

        var story = new Story({

            creator: req.decoded.id,
            content: req.body.content

        });

        story.save(function (err) {
            if (err) {
                throw err;
            } else {
                res.send("Story created!!");
            }
        })
    });

    //for get all stories on the database
    api.get("/", function (req, res) {

        Story.find(function (err, stories) {

            if (err) {
                throw err;
                
            } else {
                res.send(stories);
            }
        })
    })

    //get only credentials of the current user
    api.get("/me", function (req, res) {

        res.json(req.decoded);
    })

    return api;
}