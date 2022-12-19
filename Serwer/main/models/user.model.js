const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    subjects: [String],
    finishedQuizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
      }
    ]
  })
);

module.exports = User;
