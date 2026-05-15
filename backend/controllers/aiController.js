const { GoogleGenerativeAI } = require("@google/generative-ai");

const {
  response,
  student,
  question,
  option,
} = require("../models");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const recommendMajors = async (req, res) => {
  try {
    const { studentID } = req.body;

    if (!studentID) {
      return res.status(400).json({
        message: "studentID is required",
      });
    }

    const responses = await response.findAll({
      where: { studentID },
      include: [
        {
          model: student,
          as: "student",
          attributes: ["studentID", "name", "email"],
        },
        {
          model: question,
          as: "question",
          attributes: ["questionID", "questionText"],
        },
        {
          model: option,
          as: "option",
          attributes: ["optionID", "optionText"],
        },
      ],
      order: [["questionID", "ASC"]],
    });

    if (!responses || responses.length === 0) {
      return res.status(404).json({
        message: "No responses found for this student",
      });
    }

    const formattedAnswers = responses
      .map((item, index) => {
        return `
${index + 1}. السؤال: ${item.question.questionText}
إجابة الطالب: ${item.option.optionText}
`;
      })
      .join("\n");

    const prompt = `
أنت مساعد أكاديمي في موقع اسمه Bousalaty.
مهمتك اقتراح تخصصات جامعية مناسبة للطالب بناءً على إجاباته في الاختبار.

إجابات الطالب:
${formattedAnswers}

أرجع النتيجة بصيغة JSON فقط بدون أي كلام إضافي.

الشكل المطلوب بالضبط:
{
  "majors": [
    {
      "name": "اسم التخصص",
      "reason": "سبب قصير لماذا هذا التخصص مناسب"
    }
  ]
}

الشروط:
- أرجع 4 تخصصات فقط.
- لا تكتب markdown.
- لا تكتب شرح خارج JSON.
- السبب يكون قصير وواضح.
- خلي التخصصات مناسبة لإجابات الطالب.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    let parsedResult;

    try {
      const cleanedText = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsedResult = JSON.parse(cleanedText);
    } catch (error) {
      return res.status(500).json({
        message: "Gemini response is not valid JSON",
        rawResponse: aiText,
      });
    }

    return res.status(200).json({
      message: "Majors recommended successfully",
      student: responses[0].student,
      data: parsedResult.majors,
    });

  } catch (error) {
    console.error("Gemini Controller Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  recommendMajors,
};