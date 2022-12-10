const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.quiz = require("./quiz.model");
db.question = require("./question.model")

db.ROLES = ["student", "teacher", "admin"];
db.SUBJECTS = ["j. polski","j. angielski","matematyka","informatyka","historia"];

module.exports = db;
