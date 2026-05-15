const Groq = require('groq-sdk');
const db = require('../models');

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeAndSuggestMajors = async (req, res) => {
  try {
    const { submissionID } = req.params;

    const responses = await db.response.findAll({
      where: { submissionID },
      include: [
        { model: db.question },
        { model: db.option }
      ]
    });

    if (!responses.length) {
      return res.status(404).json({ message: 'No responses found' });
    }

    const allMajors = await db.major.findAll();

    if (!allMajors.length) {
      return res.status(404).json({ message: 'No majors found in database' });
    }

    const majorsList = allMajors
      .map(m => `ID: ${m.majorID} - Name: ${m.majorName}`)
      .join('\n');

    const answersText = responses.map((r, i) =>
      `السؤال ${i + 1}: ${r.question.questionText}\nالإجابة: ${r.option.optionText}`
    ).join('\n\n');

    const prompt = `
أنت مستشار أكاديمي متخصص. بناءً على إجابات الطالب، اقترح أفضل 3 تخصصات من القائمة التالية فقط.
لا تختر أي تخصص خارج القائمة.
أرجع majorID كما هو من القائمة.

التخصصات المتاحة:
${majorsList}

إجابات الطالب:
${answersText}

أرجع JSON فقط بهذا الشكل بدون أي نص إضافي:
{
  "recommendations": [
    { "majorID": 1, "reason": "سبب بجملة واحدة" },
    { "majorID": 2, "reason": "سبب بجملة واحدة" },
    { "majorID": 3, "reason": "سبب بجملة واحدة" }
  ]
}`;

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 1024,
      response_format: { type: 'json_object' }
    });

    const rawContent = completion.choices[0].message.content;
    console.log("AI RAW:", rawContent);

    const aiData = JSON.parse(rawContent);

    const ids = (aiData.recommendations || [])
      .map(r => Number(r.majorID))
      .filter(id => !isNaN(id));

    const recommendedMajors = await Promise.all(
      ids.map(async (id) => {
        const rec = aiData.recommendations.find(r => Number(r.majorID) === id);

        const major = await db.major.findByPk(id);

        if (!major) return null;

        return {
          ...major.dataValues,
          reason: rec?.reason || "مناسب بناءً على إجاباتك"
        };
      })
    );

    const filteredMajors = recommendedMajors.filter(Boolean);

    console.log("FINAL RECOMMENDATIONS:", filteredMajors);

    await db.submission.update(
      { aiResult: filteredMajors, status: 'completed' },
      { where: { submissionID } }
    );

    res.json({ recommendations: filteredMajors });

  } catch (error) {
    console.error('AI Error:', error);

    await db.submission.update(
      { status: 'failed' },
      { where: { submissionID: req.params.submissionID } }
    );

    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeAndSuggestMajors };