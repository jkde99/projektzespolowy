const mongoose = require("mongoose")

const Subject = mongoose.model(
    "Subject",
    new mongoose.Schema({
        name: String
    })
);

module.exports = Subject;