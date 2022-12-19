const mongoose = require("mongoose");
const QuestionFinished = require("./questionfinished.model");

const QuizFinished = mongoose.model(
    "Quiz",
    new mongoose.Schema({
      name: String,
      questions: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuestionFinished"
      }],
      subject: String
    })
  );
  
  module.exports = QuizFinished;
  