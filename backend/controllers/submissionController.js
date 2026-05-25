const db = require('../models');

const createSubmission = async (req, res) => {

  try {

    const { studentID } = req.body;

    if (!studentID) {
      return res.status(400).json({
        message: 'studentID is required'
      });
    }

    const student = await db.student.findByPk(studentID);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    const submission = await db.submission.create({
      studentID
    });

    res.status(201).json(submission);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getLatestSubmission = async (req, res) => {
  try {
    const { studentID } = req.params;

    const submission = await db.submission.findOne({
      where: { studentID },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.response,
          include: [
            { model: db.question },
            { model: db.option }
          ]
        }
      ]
    });

    if (!submission) {
      return res.status(404).json({ message: "No submission found" });
    }

    res.json(submission);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getStudentSubmissions = async (req, res) => {

  try {

    const { studentID } = req.params;

    const submissions = await db.submission.findAll({

      where: { studentID },

      order: [['createdAt', 'DESC']],

      include: [
        {
          model: db.response,
          include: [
            { model: db.question },
            { model: db.option }
          ]
        }
      ]

    });

    res.json(submissions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getSubmissionById = async (req, res) => {
  try {
    const { submissionID } = req.params;

    const submission = await db.submission.findByPk(submissionID);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    return res.json(submission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


  
module.exports = {
  createSubmission,
  getLatestSubmission,
  getStudentSubmissions,
  getSubmissionById
};