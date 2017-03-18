var mongo = require("mongoose");
var Schema = mongo.Schema;

var storySchema = new Schema({

    creator: { type: Schema.ObjectId, ref: "User" },
    content: String,
    created: { type: Date, default: Date.now }

});

module.exports = mongo.model("Story", storySchema);