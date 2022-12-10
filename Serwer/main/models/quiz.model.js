const mongoose = require("mongoose");
const Question = require("./question.model");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    }
  })
);

module.exports = Quiz;
