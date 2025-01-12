const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    category: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        unique: true,
    },
    difficulty: {
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model("problem", problemSchema);