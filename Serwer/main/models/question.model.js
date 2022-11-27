const mongoose = require("mongoose");

const Question = mongoose.model(
    "Question",
    new mongoose.Schema({
        content: String,
        answers: [String],
        correctAnswers: [String],
        isFlagged: Boolean
    })
);

module.exports = Question;