const db = require('../models');

const createResponse = async (req, res) => {
    try {
        const { submissionID, questionID, optionID } = req.body;

        if (!submissionID) {
            return res.status(400).json({ message: "submissionID is required" });
        }

        if (!questionID) {
            return res.status(400).json({ message: "questionID is required" });
        }

        if (!optionID) {
            return res.status(400).json({ message: "optionID is required" });
        }

        const submission = await db.submission.findByPk(submissionID);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        const question = await db.question.findByPk(questionID);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const option = await db.option.findOne({
            where: {
                optionID,
                questionID
            }
        });

        if (!option) {
            return res.status(404).json({
                message: "Option not found or does not belong to this question"
            });
        }

        const newResponse = await db.response.create({
            submissionID,
            questionID,
            optionID
        });

        res.status(201).json(newResponse);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllResponses = async (req, res) => {
    try {
        const responses = await db.response.findAll({
            include: [
                {
                    model: db.submission,

                    attributes: ['submissionID', 'studentID', 'status', 'aiResult'],

                    include: [
                        {
                            model: db.student,
                            attributes: ['studentID', 'name', 'email']
                        }
                    ]
                },
                {
                    model: db.question,
                    attributes: ['questionID', 'questionText']
                },
                {
                    model: db.option,
                    attributes: ['optionID', 'optionText']
                }
            ]
        });

        res.json(responses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getResponseById = async (req, res) => {
    try {
        const { responseID } = req.params;

        const response = await db.response.findByPk(responseID, {
            include: [
                {
                    model: db.submission,
                    attributes: ['submissionID', 'studentID', 'status', 'aiResult']
                },
                {
                    model: db.question,
                    attributes: ['questionID', 'questionText']
                },
                {
                    model: db.option,
                    attributes: ['optionID', 'optionText']
                }
            ]
        });

        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        res.json(response);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getResponsesBySubmission = async (req, res) => {
    try {
        const { submissionID } = req.params;

        const responses = await db.response.findAll({
            where: { submissionID },
            include: [
                {
                    model: db.question,
                    attributes: ['questionID', 'questionText']
                },
                {
                    model: db.option,
                    attributes: ['optionID', 'optionText']
                }
            ]
        });

        res.json(responses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateResponse = async (req, res) => {
    try {
        const { responseID } = req.params;
        const { submissionID, questionID, optionID } = req.body;

        const response = await db.response.findByPk(responseID);

        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        if (submissionID) {
            const submission = await db.submission.findByPk(submissionID);
            if (!submission) {
                return res.status(404).json({ message: "Submission not found" });
            }
        }

        if (questionID) {
            const question = await db.question.findByPk(questionID);
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }
        }

        if (optionID) {
            const finalQuestionID = questionID || response.questionID;

            const option = await db.option.findOne({
                where: {
                    optionID,
                    questionID: finalQuestionID
                }
            });

            if (!option) {
                return res.status(404).json({
                    message: "Option not found or does not belong to this question"
                });
            }
        }

        await response.update({
            submissionID: submissionID || response.submissionID,
            questionID: questionID || response.questionID,
            optionID: optionID || response.optionID
        });

        res.json(response);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteResponse = async (req, res) => {
    try {
        const { responseID } = req.params;

        const deleted = await db.response.destroy({
            where: { responseID }
        });

        if (deleted) {
            return res.json({ message: "Response deleted successfully" });
        }

        return res.status(404).json({ message: "Response not found" });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

module.exports = {
    createResponse,
    getAllResponses,
    getResponseById,
    getResponsesBySubmission,
    updateResponse,
    deleteResponse
};