const { TopologyDescription } = require("mongodb");
const db = require("../models");
const Question = require("../models/question.model");

exports.addQuestion = async (req, res) => {
    try{
        const { content } = req.body;
        const { answers } = req.body;
        const { correctAnswers } = req.body;
        const { isFlagged } = false;

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
        const { isFlagged } = false;
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
            return res.status(204).json({"zwrotna":"usunieto pomyslnie"})
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
