const db = require('../models');

const createOpportunity = async (req, res) => {
    try {
        const newOpportunity = await db.jobOpportuneties.create({
            majorID: req.body.majorID,
            opportunity: req.body.opportunity
        });

        res.status(201).json(newOpportunity);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateOpportunity = async (req, res) => {
    try {

        oppoID = req.params.oppoID;
        const { majorID } = req.body;

        const [updated] = await db.jobOpportuneties.update(
            { opportunity: req.body.opportunity },
            { where: { oppoID, majorID } }
        );

        if (!updated) {
            return res.status(404).json({ message: "Opportunity not found" });
        }

        const updatedOpportunity = await db.jobOpportuneties.findOne({
            where: { oppoID, majorID }
        });

        return res.json(updatedOpportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOpportunity = async (req, res) => {
    try {
        oppoID = req.params.oppoID;
        const { majorID } = req.body;
        const deleted = await db.jobOpportuneties.destroy({ where: { oppoID: oppoID, majorID: majorID } });
        if (deleted) { return res.json({ message: "Opportunity deleted successfully" }); }
        return res.status(404).json({ message: "Opportunity not found" });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = {
    createOpportunity,
    updateOpportunity,
    deleteOpportunity
}