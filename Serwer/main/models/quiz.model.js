const mongoose = require("mongoose");
const Question = require("./question.model");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    name: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    subject: String
  })
);

module.exports = Quiz;
