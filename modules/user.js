var mongo = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var Schema = mongo.Schema;

//create a new schema
var userSchema = new Schema({

    name: String,
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

userSchema.pre("save", function (next) {

    //refer at userSchema
    var user = this;

    //hash password of document that use this schema
    bcrypt.hash(user.password, null, null, function (err, hashed) {

        if (err) {
            throw err;
        } else {
            user.password = hashed;

            //next api
            return next();
        }
    })
});

userSchema.methods.comparePassword = function (password) {

    //refer at userSchema
    var user = this;

    //return method of bcryot library that compare two string: original password and password hashed
    return bcrypt.compareSync(password, user.password);

};

module.exports = mongo.model("User", userSchema);