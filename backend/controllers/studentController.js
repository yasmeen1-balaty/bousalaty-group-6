const db = require('../models');

const findStudent = async (req, res) => {
  try {
    const students = await db.student.findByPk(req.params.studentID, { attributes: ['name', 'email'] });
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createStudent = async (req, res) => {
  try {
    const newStudent = await db.student.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      tawjihiGrade: req.body.tawjihiGrade,
      studyTrack: req.body.studyTrack
    });

    res.status(201).json(newStudent);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateStudent = async (req, res) => {
  try {
    const { studentID } = req.params;

    const [updated] = await db.student.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        tawjihiGrade: req.body.tawjihiGrade,
        studyTrack: req.body.studyTrack
      },
      { where: { studentID: studentID } }
    );
    if (updated) {
      const updatedStudent = await db.student.findByPk(studentID);
      return res.json(updatedStudent);
    }
    return res.status(404).json({ message: "Student not found" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteStudent = async (req, res) => {
  try {
    const { studentID } = req.params;
    const deleted = await db.student.destroy({ where: { studentID: studentID } });
    if (deleted) { return res.json({ message: "Student deleted successfully" }); }
    return res.status(404).json({ message: "Student not found" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getSavedMajors = async (req, res) => {
  try {
    const studentID = req.params.studentID;
    if (!studentID) {
      return res.status(400).json({ error: 'studentID is required' });
    }

    const student = await db.student.findOne({
      where: { studentID },
      include: [
        { model: db.major, through: { attributes: [] } }
      ]
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json({ savedMajors: student.majors });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};

const addToSavedMajors = async (req, res) => {
  try {
    const { studentID, majorID } = req.body;
    if (!studentID || !majorID) {
      return res.status(400).json({ error: 'studentID and majorID are required' });
    }
    const [record, created] = await db.studentMajor.findOrCreate({
      where: { studentID, majorID },
      defaults: { studentID, majorID }
    });

    if (!created) {
      return res.status(409).json({ message: "Already saved" });
    }

    return res.status(201).json(record);

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};

const removeFromSavedMajors = async (req, res) => {
  try {
    const { studentID, majorID } = req.body;
    if (!studentID || !majorID) {
      return res.status(400).json({ error: 'studentID and majorID are required' });
    }
    const deleted = await db.studentMajor.destroy({
      where: { studentID, majorID }
    });
    if (deleted) {
      return res.json({ message: "Major removed from saved list successfully" });
    }
    return res.status(404).json({ message: "Association not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};

const createResult = async (req, res) => {
  try {
    const { studentID, resultText } = req.body;
    if (!studentID || !resultText) {
      return res.status(400).json({ error: 'studentID and resultText are required' });
    }

    const newResult = await db.result.upsert({  //upsert = update or insert (create if not exists, else update)
      studentID,
      resultText
    }, {
      where: { studentID }
    });

    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};

const getResult = async (req, res) => {
  try {
    const { studentID } = req.params;
    if (!studentID) {
      return res.status(400).json({ error: 'studentID is required' });
    }
    const result = await db.result.findOne({ where: { studentID } });

    if (!result) { return res.status(404).json({ error: 'Result not found' }); }

    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = {
  getSavedMajors, deleteStudent, updateStudent, createStudent, findStudent, addToSavedMajors, removeFromSavedMajors, createResult, getResult
};