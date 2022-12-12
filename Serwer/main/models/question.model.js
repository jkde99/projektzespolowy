const mongoose = require("mongoose");

const Question = mongoose.model(
    "Question",
    new mongoose.Schema({
        content: String,
        answers: [{answer:String, isCorrect:Boolean}],
        isFlagged: Boolean
    })
);

module.exports = Question;