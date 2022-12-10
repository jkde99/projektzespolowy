const { TopologyDescription } = require("mongodb");
const db = require("../models");
const Question = require("../models/question.model");
const Quiz = require("../models/quiz.model");

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
        const array = req.params.questions;
        const subject = req.params.subject;
        const quiz = await Quiz.create({
            array,
            subject
        })
        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
}

exports.getQuizes = async (req, res) => {
    try {
        const sub = req.params.subject;
        const quizes = await Quiz.find({subject: subject});
        return res.status(200).json(quizes);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
}

