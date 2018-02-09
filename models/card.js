var mongoose = require("mongoose");

// SCHEMA SETUP
var cardSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String
});

module.exports = mongoose.model("Campground", cardSchema);