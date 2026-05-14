const db = require('../models')

const findMajor = async (req, res) => {
    try {
        const major = await db.major.findByPk(req.params.majorID, { attributes: ['majorName', 'facultyID', 'acceptanceGrade', 'creditHours', 'costPerHour', 'studyPlanURL'] });
        if (!major) {
            return res.status(404).json({ message: 'Major not found' });
        }
        res.json(major);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const getMajorsSkills = async (req, res) => {
    try {
        const majorID = req.params.majorID;
        const major = await db.major.findByPk(majorID, {
            include: [
                { model: db.skills , attributes: ['skill'] }
            ]
        });
        if (!major) {
            return res.status(404).json({ message: 'Major not found' });
        }
        res.json(major);
        //res.json(major.skills);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const getMajorsJobOpportuneties = async (req, res) => {
    try {
        const majorID = req.params.majorID;
        const major = await db.major.findByPk(majorID, {
            include: [
                { model: db.jobOpportuneties , attributes: ['opportunity'] }
            ]
        });
        if (!major) {
            return res.status(404).json({ message: 'Major not found' });
        }
        res.json(major);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const getMajorsFaculty = async (req, res) => {
    try {
        const majorID = req.params.majorID;
        const major = await db.major.findByPk(majorID, {
            include: [
                { model: db.faculty }
            ]
        });
        if (!major) {
            return res.status(404).json({ message: 'Major not found' });
        }
        res.json(major.faculty.facultyName); // return only the faculty name instead of the whole faculty object
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const createMajor = async (req, res) => {
    try {
        const newMajor = await db.major.create({
            majorName: req.body.majorName,
            facultyID: req.body.facultyID,
            acceptanceGrade: req.body.acceptanceGrade,
            creditHours: req.body.creditHours,
            costPerHour: req.body.costPerHour,
            studyPlanURL: req.body.studyPlanURL
        });
        res.status(201).json(newMajor);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateMajor = async (req, res) => {
    try {
        const { majorID } = req.params;
        const [updated] = await db.major.update(req.body, { where: { majorID } });
        if (!updated) {
            return res.status(404).json({ message: 'Major not found' });
        }
        const updatedMajor = await db.major.findByPk(majorID);
        res.json(updatedMajor);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteMajor = async (req, res) => {
    try {
        const { majorID } = req.params;
        const deleted = await db.major.destroy({ where: { majorID } });
        if (!deleted) {
            return res.status(404).json({ message: 'Major not found' });
        }
        res.json({ message: 'Major deleted successfully' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const getAllMajors = async (req, res) => {
  try {
    const majors = await db.major.findAll({
      attributes: ["majorID", "majorName"],
    });

    res.status(200).json(majors);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    findMajor,
    createMajor,
    updateMajor,
    deleteMajor,
    getMajorsSkills,
    getMajorsJobOpportuneties,
    getMajorsFaculty,
    getAllMajors
};