var mongo = require("mongoose");

var Schema = mongo.Schema;

var userSchema = new Schema({

    name: String,
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports = mongo.model("User", userSchema);