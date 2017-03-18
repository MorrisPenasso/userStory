var User = require("../models/user");
var story = require("../models/story");
var config = require("../../config");

var secretKey = config.secretKey;

var jsonWebToken = require("jsonwebtoken");

function createToken(user) {

    var token = jsonWebToken.sign({

        _id: user._id,
        name: user.name,
        username: user.username
    }, secretKey);

    return token;
}

//receive app (istance of express) and express library
module.exports = function (app, express) {

    //set Routes for extends initial route api
    var api = express.Router();

    //localhost:8080/api/signup
    api.post("/signup", function (req, res) {

        //create a new document
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        var token = createToken(user);

        //save the document into mongodb
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                message: "User has been created!",
                token: token
            });
        })
    })


    api.get("/users", function (req, res) {

        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }

            res.send(users);
        })
    });


    api.post("/login", function (req, res) {
        //find an existing user
        User.findOne({

            username: req.body.username

            //select his password and exec this query at mongodb     
        }).select("name username password").exec(function (err, user) {

            if (err) {
                res.send(err);
            }
            if (!user) {

                res.send({ message: "User does not exist" })
            } else if (user) {
                //comparePassword compare the passwords
                var validPassword = user.comparePassword(req.body.password);

                if (!validPassword) {
                    res.send({ message: "Invalid Password" });
                } else {

                    var token = createToken(user);

                    res.send({
                        success: true,
                        message: "Successfully login",
                        token: token
                    })
                }
            }
        });
    });

    //global middleweare (localost:8080/api/"
    api.use(function (req, res, next) {

        console.log("Somebody just came to our app!");

        var token = req.body.token || req.param("token") || req.headers["x-access-token"];

        //check if token exist

        if (token) {

            jsonWebToken.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    res.status(403).send({ success: false, message: "Failed to authenticate user" });
                } else {
                    req.decoded = decoded;

                    next();
                }
            })

        } 
    });

    //provide a legitimate token. If user is logged
    api.route("/").post(function (req, res) {

        var Story = new story({

            creator: req.decoded.id,
            content: req.body.content

        });

        Story.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: "New story created" });
            }
        })
    }).get(function (req, res) {

        story.find({creator: req.decoded.id}, function (err, messages) {
            if (err) {
                res.send( err );
            } else {
                res.json(messages);
            }
        })
    });

    api.get("/me", function (req, res) {

        res.json(req.decoded);
    })

    return api;
};


