var mongo = require("mongoose");

var Schema = mongo.Schema;

var storySchema = new Schema({

    creator: Schema.ObjectId,
    content: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongo.model("story", storySchema);