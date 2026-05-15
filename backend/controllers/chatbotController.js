const Groq = require('groq-sdk');

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: "system",
          content: `
أنت مساعد ذكي لموقع بوصّلتي.
وظيفتك مساعدة الطلاب في اختيار التخصص الجامعي المناسب.
جاوب بالعربي، بأسلوب بسيط وواضح.
اسأل الطالب عن ميوله، مهاراته، المواد التي يحبها، والمواد التي لا يحبها.
لا تعطِ إجابات طويلة جدًا.
`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 700
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { chatWithBot };