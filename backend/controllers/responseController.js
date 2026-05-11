const db = require('../models');

const createResponse = async (req, res) => {
    try {

        const { studentID, questionID, optionID } = req.body;

        if (!studentID) {
            return res.status(400).json({
                message: "studentID is required"
            });
        }

        if (!questionID) {
            return res.status(400).json({
                message: "questionID is required"
            });
        }

        if (!optionID) {
            return res.status(400).json({
                message: "optionID is required"
            });
        }

        const student = await db.student.findByPk(studentID);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const question = await db.question.findByPk(questionID);

        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
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

        const existingResponse = await db.response.findOne({
            where: {
                studentID,
                questionID
            }
        });

        if (existingResponse) {

            existingResponse.optionID = optionID;

            await existingResponse.save();

            return res.status(200).json({
                message: "Response updated successfully",
                response: existingResponse
            });
        }

        const newResponse = await db.response.create({
            studentID,
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
                    model: db.student,
                    attributes: ['studentID', 'name', 'email']
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
                    model: db.student,
                    attributes: ['studentID', 'name', 'email']
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

const getResponsesByStudent = async (req, res) => {
    try {
        const { studentID } = req.params;

        const responses = await db.response.findAll({
            where: { studentID },
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
        const { studentID, questionID, optionID } = req.body;

        const response = await db.response.findByPk(responseID);

        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        if (studentID) {
            const student = await db.student.findByPk(studentID);
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
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

            // Check if the selected option exists
            // and belongs to the correct question before updating the response
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
        
        // Update only the fields sent in the request,
        // otherwise keep the old values from the current respons
        await response.update({
            studentID: studentID || response.studentID,
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
    getResponsesByStudent,
    updateResponse,
    deleteResponse
};