const Groq = require('groq-sdk');
const db = require('../models');

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeAndSuggestMajors = async (req, res) => {
  try {
    const { submissionID } = req.params;

    // 1. جيبي الأجوبة مع الأسئلة والخيارات
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

    // 2. جيبي كل التخصصات من DB
    const allMajors = await db.major.findAll({
      attributes: ['majorID', 'majorName']
    });
    const majorsList = allMajors.map(m => m.majorName).join('، ');

    // 3. بني الـ prompt
    const answersText = responses.map((r, i) =>
      `السؤال ${i + 1}: ${r.question.questionText}\nالإجابة: ${r.option.optionText}`
    ).join('\n\n');

    const prompt = `
أنت مستشار أكاديمي متخصص. بناءً على إجابات الطالب، اقترح أفضل 3 تخصصات من القائمة التالية فقط.

التخصصات المتاحة: ${majorsList}

إجابات الطالب:
${answersText}

أرجع JSON فقط بهذا الشكل بدون أي نص إضافي:
{
  "recommendations": [
    { "majorName": "اسم التخصص", "reason": "سبب بجملة واحدة" },
    { "majorName": "اسم التخصص", "reason": "سبب بجملة واحدة" },
    { "majorName": "اسم التخصص", "reason": "سبب بجملة واحدة" }
  ]
}`;

    // 4. ابعتي لـ Groq
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: 'json_object' }
    });

    const aiData = JSON.parse(completion.choices[0].message.content);

    // 5. جيبي تفاصيل التخصصات من DB
    const recommendedMajors = await Promise.all(
      aiData.recommendations.map(async (rec) => {
        const major = await db.major.findOne({
          where: { majorName: rec.majorName }
        });
        return {
          ...major?.dataValues,
          reason: rec.reason
        };
      })
    );

    // 6. احفظي النتيجة في submission
    await db.submission.update(
      { aiResult: recommendedMajors, status: 'completed' },
      { where: { submissionID } }
    );

    res.json({ recommendations: recommendedMajors });

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