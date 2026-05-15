const db = require('../models');

const findExpert = async (req, res) => {
  try {
    const experts = await db.expert.findByPk(req.params.expertID, { attributes: ['firstName', 'lastName', 'email'] });
    if (!experts) {
      return res.status(404).json({ message: "Expert not found" });
    }
    res.json(experts);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createExpert = async (req, res) => {
  try {
    const newExpert = await db.expert.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      facultyID: req.body.facultyID
    });

    res.status(201).json(newExpert);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateExpert = async (req, res) => {
  try {
    const { expertID } = req.params;

    const [updated] = await db.expert.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        facultyID: req.body.facultyID
      },
      { where: { expertID: expertID } }
    );
    if (updated) {
      const updatedExpert = await db.expert.findByPk(expertID);
      return res.json(updatedExpert);
    }
    return res.status(404).json({ message: "Expert not found" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteExpert = async (req, res) => {
  try {
    const { expertID } = req.params;
    const deleted = await db.expert.destroy({ where: { expertID: expertID } });
    if (deleted) { return res.json({ message: "Expert deleted successfully" }); }
    return res.status(404).json({ message: "Expert not found" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getAllExperts = async (req, res) => {
  try {
    const experts = await db.expert.findAll({
      attributes: ["expertID", "firstName" , "lastName", "facultyID"],
    });

    res.status(200).json(experts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { deleteExpert, updateExpert, createExpert, findExpert, getAllExperts };