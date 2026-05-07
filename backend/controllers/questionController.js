const db = require('../models');

const getQuestionText = async (req, res) => {
    try {
        const question = await db.question.findByPk(req.params.questionID, { attributes: ['questionText'] });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(question);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteQuestion = async (req, res) => {
    try {
        const { questionID } = req.params;
        const deleted = await db.question.destroy({ where: { questionID } });
        if (deleted) {
            return res.json({ message: "Question deleted successfully" });
        }
        return res.status(404).json({ message: "Question not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};

const createQuestion = async (req, res) => {
    try {
        const { questionText } = req.body;
        if (!questionText) {
            return res.status(400).json({ message: "questionText is required" });
        }
        const newQuestion = await db.question.create({ questionText });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const { questionID } = req.params;
        const { questionText } = req.body;

        if (!questionText) {
            return res.status(400).json({ message: "questionText is required" });
        }

        const [updated] = await db.question.update(
            { questionText },
            { where: { questionID } }
        );
        if (updated) {
            const updatedQuestion = await db.question.findByPk(questionID);
            return res.json(updatedQuestion);
        }
        return res.status(404).json({ message: "Question not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};

const getOptionsForQuestion = async (req, res) => {
    try {
        const questionID = req.params.questionID;
        if (!questionID) {
            return res.status(400).json({ error: 'questionID is required' });
        }
        const options = await db.option.findAll({ where: { questionID } });
        res.json(options);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getQuestionText,
    deleteQuestion,
    createQuestion,
    updateQuestion,
    getOptionsForQuestion
};