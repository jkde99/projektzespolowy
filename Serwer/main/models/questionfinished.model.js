const mongoose = require("mongoose");

const QuestionFinished = mongoose.model(
    "Question",
    new mongoose.Schema({
        content: String,
        answers: [{answer:String, correctAnswer:String}]
    })
);

module.exports = QuestionFinished;