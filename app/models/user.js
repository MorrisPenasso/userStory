var mongo = require("mongoose");

//create an schema object
var Schema = mongo.Schema;

var bcrypt = require("bcrypt-nodejs");

//create a new schema
var userSchema = new Schema({

    name: String,
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})

//middleweare function
userSchema.pre("save", function (next) {

    //refer to userSchema
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) {
            next(err);
        }
        else {
            //user.password equals to password hashed
            user.password = hash;
            next();
        }

    });

});

//create a function to userSchema
userSchema.methods.comparePassword = function (password) {

    var user = this;

    //return method of bcryot library that compare two string: original password and password hashed
    return bcrypt.compareSync(password, user.password);
};


//export a new model called "User" that take the structure of userSchema 
module.exports = mongo.model("User", userSchema);