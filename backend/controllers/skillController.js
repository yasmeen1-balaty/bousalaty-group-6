const db = require('../models');

const createSkill = async (req, res) => {
    try {
        const newSkill = await db.skills.create({
            majorID: req.body.majorID,
            skill: req.body.skill    //skill is the attribute, skills is the model
        });

        res.status(201).json(newSkill);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateSkill = async (req, res) => {
    try {

        skillID = req.params.skillID;
        const { majorID } = req.body;

        const [updated] = await db.skills.update(
            { skill: req.body.skill },
            { where: { skillID, majorID } }
        );

        if (!updated) {
            return res.status(404).json({ message: "Skill not found" });
        }

        const updatedSkill = await db.skills.findOne({
            where: { skillID, majorID }
        });

        return res.json(updatedSkill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSkill = async (req, res) => {
    try {
        skillID = req.params.skillID;
        const { majorID } = req.body;
        const deleted = await db.skills.destroy({ where: { skillID: skillID, majorID: majorID } });
        if (deleted) { return res.json({ message: "Skill deleted successfully" }); }
        return res.status(404).json({ message: "Skill not found" });
    } catch (error) { res.status(500).json({ message: error.message }); }
};
const getAllSkills = async (req, res) => {
  try {
    const skills = await db.skills.findAll({
      order: [["majorID", "ASC"]],
    });

    return res.json(skills);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

module.exports = {
    createSkill,
    updateSkill,
    deleteSkill,
    getAllSkills
}