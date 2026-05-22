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

    // تحقق من المعدل أقل من 60
    const gradeResponse = responses.find(r =>
      r.option.optionText.includes('أقل من 60')
    );

    if (gradeResponse) {
      const result = [{
        majorName: "كلية هشام حجاوي التقنية",
        reason: "بناءً على معدلك، ننصحك بالتقديم على كلية هشام حجاوي التابعة لجامعة النجاح",
        link: "https://hijjawi.najah.edu/ar/academic/hijjawi-specs/",
        isExternal: true,
        majorID: null
      }];

      await db.submission.update(
        { aiResult: result, status: 'completed' },
        { where: { submissionID } }
      );

      return res.json({ recommendations: result });
    }

    // استخرج فرع الطالب
    const streamResponse = responses.find(r =>
      r.question.questionText.includes('فرعك') ||
      r.question.questionText.includes('التوجيهي')
    );

    const optionText = streamResponse?.option?.optionText || '';
    console.log("Student stream:", optionText);

    // جيب كل التخصصات
    const allMajors = await db.major.findAll();

    // فلتر حسب فرع الطالب
    const filteredMajors = allMajors.filter(m => {
      try {
        const stream = Array.isArray(m.acceptedBranches)
          ? m.acceptedBranches
          : JSON.parse(m.acceptedBranches || '[]');
        return stream.includes(optionText) || stream.includes('الجميع');
      } catch {
        return false;
      }
    });

    if (!filteredMajors.length) {
      return res.status(404).json({ message: 'No majors found for this stream' });
    }

    const majorsList = filteredMajors
      .map(m => `ID: ${m.majorID} - Name: ${m.majorName} - AcceptanceGrade: ${m.acceptanceGrade}`)
      .join('\n');

    const answersText = responses.map((r, i) =>
      `السؤال ${i + 1}: ${r.question.questionText}\nالإجابة: ${r.option.optionText}`
    ).join('\n\n');

    const prompt = `
أنت مستشار أكاديمي متخصص. بناءً على إجابات الطالب، اقترح أفضل 3 تخصصات من القائمة التالية فقط.
لا تختر أي تخصص خارج القائمة.
أرجع majorID كما هو من القائمة.

قواعد مهمة:
- إذا كان معدل الطالب من 60 إلى 69، اقترح فقط تخصصات AcceptanceGrade أقل من 70.
- إذا كان معدل الطالب من 70 إلى 79، اقترح فقط تخصصات AcceptanceGrade أقل من 80.
- إذا كان معدل الطالب من 80 إلى 89، اقترح فقط تخصصات AcceptanceGrade أقل من 90.
- إذا كان معدل الطالب من 90 إلى 100، يمكن اقتراح أي تخصص.

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

    const filteredResult = recommendedMajors.filter(Boolean);

    console.log("FINAL RECOMMENDATIONS:", filteredResult);

    await db.submission.update(
      { aiResult: filteredResult, status: 'completed' },
      { where: { submissionID } }
    );

    res.json({ recommendations: filteredResult });

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