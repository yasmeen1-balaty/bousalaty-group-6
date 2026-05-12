const db = require('../models');

const getOptionText = async (req, res) => {
    try {
        const option = await db.option.findByPk(req.params.optionID, { attributes: ['optionText'] });
        if (!option) {
            return res.status(404).json({ message: "option not found" });
        }
        res.json(option);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteOption = async (req, res) => {
    try {
        const { optionID } = req.params;
        const deleted = await db.option.destroy({ where: { optionID } });
        if (deleted) {
            return res.json({ message: "option deleted successfully" });
        }
        return res.status(404).json({ message: "option not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};

const createOption = async (req, res) => {
    try {
        const { optionText } = req.body;
        const { questionID } = req.body;
        const {optionID} = req.body;

        if (!questionID) {
            return res.status(400).json({ message: "questionID is required" });
        }
        if (!optionText) {
            return res.status(400).json({ message: "optionText is required" });
        }
        if (!optionID) {
            return res.status(400).json({ message: "optionID is required" });
        }
        const newOption = await db.option.create({ optionID, optionText, questionID });
        res.status(201).json(newOption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOption = async (req, res) => {
    try {
        const { optionID } = req.params;
        const { optionText } = req.body;

        if (!optionText) {
            return res.status(400).json({ message: "optionText is required" });
        }

        const [updated] = await db.option.update(
            { optionText },
            { where: { optionID } }
        );
        if (updated) {
            const updatedOption = await db.option.findByPk(optionID);
            return res.json(updatedOption);
        }
        return res.status(404).json({ message: "option not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};

module.exports = {
    getOptionText,
    deleteOption,
    createOption,
    updateOption
};