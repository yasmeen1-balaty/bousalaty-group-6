const db = require('../models');

const findFaculty = async (req, res) => {
    try {
        const faculty = await db.faculty.findByPk(req.params.facultyID, { attributes: ['facultyName'] });
        res.json(faculty);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const createFaculty = async (req, res) => {
    try {
        const newFaculty = await db.faculty.create({
            facultyName: req.body.facultyName
        });

        res.status(201).json(newFaculty);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateFaculty = async (req, res) => {
    try {
        const { facultyID } = req.params;

        const [updated] = await db.faculty.update(
            { facultyName: req.body.facultyName },
            { where: { facultyID: facultyID } }
        );
        if (updated) {
            const updatedFaculty = await db.faculty.findByPk(facultyID);
            return res.json(updatedFaculty);
        }
        return res.status(404).json({ message: "Faculty not found" });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteFaculty = async (req, res) => {
    try {
        const { facultyID } = req.params;
        const deleted = await db.faculty.destroy({ where: { facultyID: facultyID } });
        if (deleted) { return res.json({ message: "Faculty deleted successfully" }); }
        return res.status(404).json({ message: "Faculty not found" });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const getMajors = async (req, res) => {
    try {
        const facultyID = req.params.facultyID;
        if (!facultyID) {
            return res.status(400).json({ error: 'facultyID is required' });
        }

        const faculty = await db.faculty.findByPk(facultyID);
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        const majors = await db.major.findAll({
            where: { facultyID }
        });

        return res.json(majors);

    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};

const getExperts = async (req, res) => {
    try {
        const facultyID = req.params.facultyID;
        if (!facultyID) {
            return res.status(400).json({ error: 'facultyID is required' });
        }

        const faculty = await db.faculty.findByPk(facultyID);
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        const experts = await db.expert.findAll({
            where: { facultyID }
        });

        return res.json(experts);

    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await db.faculty.findAll({
      attributes: ["facultyID", "facultyName"],
    });

    res.status(200).json(faculties);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    findFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getMajors,
    getExperts,
    getAllFaculties
};