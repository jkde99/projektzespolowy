const { TopologyDescription } = require("mongodb");
const db = require("../models");
const Question = require("../models/question.model");
const Quiz = require("../models/quiz.model");
const User = require("../models/user.model");

exports.addQuestion = async (req, res) => {
    try{
        const { content } = req.body;
        const { answers } = req.body;
        const { correctAnswers } = req.body;
        const isFlagged = false;

        const question = await Question.create({
            content,
            answers,
            correctAnswers,
            isFlagged
        })
        return res.status(201).json(question);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
};

exports.getQuestions = async (req, res) => {
    try{
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch(error) {
        return res.status(500).json({"error":error});
    }
}

exports.updateOne = async (req, res) => {
    try{
        const _id = req.params.id;
        const { content, answers, correctAnswers } = req.body;
        const isFlagged = false;
        let question = await Question.findOne({_id});
        if(!question){
            question = await Question.create({
                content, answers, correctAnswers, isFlagged
            })
            return res.status(201).json(question);
        } else {
            question.content = content;
            question.answers = answers;
            question.correctAnswers = correctAnswers;
            question.isFlagged = isFlagged;
            await question.save();
            return res.status(200).json(question);
        }
    } catch (error) {
        return res.status(500).json({"error":error});
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json({"zwrotna":"bledne id"})
        } else {
            return res.status(200).json({"zwrotna":"usunieto pomyslnie"})
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

exports.flagAQuestion = async (req, res) => {
    try {
        const _id = req.params.id
        
        const question = await Question.findOne({_id});

        if(!question){
            return res.status(404).json({"zwrotna":"bledne id"});
        } else {
            question.isFlagged = true;
            await question.save();
            return res.status(200).json({"zwrotna":"pomyslnie oflagowane"})
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

exports.addQuiz = async (req, res) => {
    try {
        const array = req.body.questions;
        const sub = req.body.subject;
        const nam = req.body.name;
        let newArray = [];
        for(var i = 0; i < array.length; ++i){
            let question = new Question({
                content:array[i].content,
                answers:array[i].answers,
                isFlagged:array[i].isFlagged
            })
            question.save();
            newArray.push(question)
        }
        console.log(newArray)
        const quiz = new Quiz({
            name: nam,
            questions:newArray,
            subject:sub
        })
        quiz.save();
        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
}

exports.getQuizes = async (req, res) => {
    Quiz.
        find({subject:req.query.subject}).
        populate('questions').
        exec(function(err,quizzes){
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!quizzes) {
                return res.status(404).send({ message: "Quizzes Not found." });
            }
            console.log(quizzes[0].questions[0])
            return res.status(200).json(quizzes);
        });
}


exports.finishQuiz = async (req,res) => {
    try{
        const qu = req.query.quiz;
        var user = await User.findOne({username: req.query.name});
        user = await User.updateOne(
            {_id: user._id},
            {$push: {finishedQuizes: qu}},
            function (err, docs) {
              if(err){
                console.log(err);
              } else {
                console.log("Updated Docs: ", docs);
              }
            }
          );
        return res.status(200).json(qu);
    } catch (err) {
        return res.status(500).json({"error":err});
    }
    
}

exports.getFinishedQuizes = async (req, res) => {
    User.
        findOne({username: req.query.name}).
        populate('finishedQuizes').
        exec(function(err, user){
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            return res.status(200).json(user.finishedQuizes);
        });
}