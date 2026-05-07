const db = require('../models');

const getSuggestedMajors = async (req, res) => {
  try {
    const { resultID } = req.params;

    if (!resultID) {
      return res.status(400).json({ error: 'resultID is required' });
    }

    const result = await db.result.findOne({
      where: { resultID }
    });

    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    const data = result.resultText;

    const suggestedMajors = data?.suggestedMajors || [];

    await db.resultMajor.destroy({
      where: { resultID }
    });
    
    const records = await db.resultMajor.bulkCreate(
      suggestedMajors.map(majorID => ({
        resultID,
        majorID
      }))
    );

    return res.json({
      message: "Majors updated successfully",
      count: records.length
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Server error'
    });
  }
};

module.exports = {
  getSuggestedMajors
};