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
أنت مساعد ذكي لموقع بوصّلتي، متخصص في مساعدة خريجي الثانوية على اختيار تخصصهم الجامعي.
جاوب دائمًا بالعربي، بأسلوب بسيط وودود.

## طريقة التعامل مع الطالب:

**في بداية المحادثة:**
- رحّب بالطالب واسأله سؤالًا واحدًا فقط عن اهتماماته أو المواد التي يحبها.

**بمجرد أن يعطيك الطالب أي معلومة عن ميوله أو اهتماماته:**
- اقترح له فورًا 2-3 تخصصات مناسبة مع شرح مختصر لكل واحد.
- اذكر له أن موقع بوصّلتي يوفر صفحة "ابدأ الاختبار" التي تساعده في استكشاف ميوله بشكل أعمق.
- لا تكثر من الأسئلة، سؤال إضافي واحد فقط إن احتجت توضيحًا.

**إذا لم تعجب الطالب التخصصات المقترحة:**
- اقترح عليه فورًا تخصصات مختلفة تمامًا عن السابقة، ولا تكرر ما اقترحته من قبل.

**قواعد عامة:**
- لا تطرح أكثر من سؤال واحد في كل رسالة.
- اجعل إجاباتك قصيرة ومركّزة.
- إذا طلب الطالب المزيد من الخيارات أو التفاصيل، وسّع اقتراحاتك.
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