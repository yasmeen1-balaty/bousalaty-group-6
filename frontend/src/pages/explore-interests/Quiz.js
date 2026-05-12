import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const studentID = savedUser?.student?.studentID;

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (questions.length === 0) return <p>No questions found</p>;

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const selectedAnswer = answers[currentQuestion.questionID];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (optionID) => {
    setAnswers({
      ...answers,
      [currentQuestion.questionID]: optionID
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!studentID) {
      alert("لازم تسجل دخول أولاً");
      navigate('/login')
      return;
    }
    

    const responses = Object.entries(answers).map(([questionID, optionID]) => ({
      studentID,
      questionID,
      optionID
    }));

    try {
      for (const response of responses) {
        await fetch("http://localhost:3001/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });
      }

      alert("تم إرسال إجاباتك!");
      navigate("/suggestions");

    } catch (error) {
      console.log(error);
      alert("صار خطأ أثناء إرسال الإجابات");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ direction: 'rtl' }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '650px', width: '100%', borderRadius: '16px' }}>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted">
              السؤال {currentIndex + 1} من {questions.length}
            </small>

            <small className="text-muted fw-bold">
              {Math.round(progress)}%
            </small>
          </div>

          <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: '#4f46e5',
                borderRadius: '10px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        <h5 className="fw-bold mb-4 text-dark">
          {currentQuestion.questionText}
        </h5>

        <div className="d-flex flex-column gap-2 mb-4">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = selectedAnswer === option.optionID;

            return (
              <div
                key={option.optionID}
                onClick={() => handleSelect(option.optionID)}
                className="d-flex align-items-center p-3 rounded-3"
                style={{
                  border: isSelected ? '2px solid #4f46e5' : '2px solid #e2e8f0',
                  backgroundColor: isSelected ? '#eef2ff' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  className="me-3 fw-bold d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    backgroundColor: isSelected ? '#4f46e5' : '#e2e8f0',
                    color: isSelected ? 'white' : '#555',
                    fontSize: '14px',
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                <span style={{ color: '#1e293b' }}>
                  {option.optionText}
                </span>
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{ borderRadius: '10px' }}
          >
            السابق
          </button>

          {isLast ? (
            <button
              className="btn px-4 text-white"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              style={{ backgroundColor: '#4f46e5', borderRadius: '10px' }}
            >
              إرسال الإجابات
            </button>
          ) : (
            <button
              className="btn px-4 text-white"
              onClick={handleNext}
              disabled={!selectedAnswer}
              style={{ backgroundColor: '#4f46e5', borderRadius: '10px' }}
            >
              التالي ←
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Quiz;

/*
const questions = [
  {
    questionID: 1,
    text: "تخيّل أن أمامك يوم كامل حر، أي من هذه الأنشطة تجذبك أكثر؟",
    options: [
      { label: "A", text: "تفكيك جهاز أو إصلاح شيء بيدك" },
      { label: "B", text: "رسم أو كتابة قصة أو تأليف موسيقى" },
      { label: "C", text: "حل مسائل رياضية أو منطقية معقدة" },
      { label: "D", text: "التطوع في مبادرة اجتماعية أو مساعدة محتاج" },
      { label: "E", text: "تنظيم مشروع أو إدارة فريق صغير" },
    ],
  },
  {
    questionID: 2,
    text: "صديقك يسألك: \"ليش السماء زرقاء؟\"، ما ردة فعلك الطبيعية؟",
    options: [
      { label: "A", text: "أبحث في غوغل وأقرأ كل شيء عنها" },
      { label: "B", text: "أقول \"مش عارف\" وأكمل يومي" },
      { label: "C", text: "أحاول أفسرها بمنطقي حتى لو ما أعرف الجواب" },
      { label: "D", text: "أحوّل السؤال لنقاش فلسفي أو اجتماعي ممتع" },
    ],
  },
  {
    questionID: 3,
    text: "لو طُلب منك تقدّم مشروعاً أمام زملائك، أي طريقة تختار تلقائياً؟",
    options: [
      { label: "A", text: "تصميم عرض بصري جذاب ومبتكر" },
      { label: "B", text: "جمع بيانات وإحصاءات وتقديمها بدقة" },
      { label: "C", text: "كتابة تقرير منظم ومفصّل" },
      { label: "D", text: "إقناع الجمهور بالكلام والحماس" },
      { label: "E", text: "بناء نموذج أو تجربة عملية" },
    ],
  },
  {
    questionID: 4,
    text: "أي من هذه المواقف يشعرك بالرضا والفخر أكثر؟",
    options: [
      { label: "A", text: "شرحت درساً صعباً لزميل وفهمه" },
      { label: "B", text: "صممت شيئاً جميلاً أعجب الناس" },
      { label: "C", text: "حللت مشكلة معقدة لوحدك" },
      { label: "D", text: "نظّمت فعالية ونجحت بشكل مثالي" },
      { label: "E", text: "اخترعت فكرة جديدة لم يفكر فيها أحد" },
    ],
  },
  {
    questionID: 5,
    text: "لو أُعطيت 10,000 ريال لتستثمرها بحرية تامة، ماذا تفعل؟",
    options: [
      { label: "A", text: "أبدأ مشروعاً صغيراً أو فكرة تجارية" },
      { label: "B", text: "أشترك في دورات تعليمية وأطور نفسي" },
      { label: "C", text: "أتبرع لمشروع خيري أو اجتماعي" },
      { label: "D", text: "أشتري أدوات أو برامج لأطور مهارة تقنية" },
      { label: "E", text: "أستثمرها في مشروع فني أو إبداعي" },
    ],
  },
  {
    questionID: 6,
    text: "كيف تبدو غرفتك أو ملفاتك عادةً؟",
    options: [
      { label: "A", text: "منظمة تماماً، كل شيء في مكانه" },
      { label: "B", text: "فوضى منظمة، أنا فقط أعرف أين كل شيء" },
      { label: "C", text: "متغيرة حسب مزاجي" },
      { label: "D", text: "مش مهم النظام، المهم الإنجاز" },
    ],
  },
  {
    questionID: 7,
    text: "بعد 10 سنوات، أي من هذه الجمل تتمنى أن تصفك؟",
    options: [
      { label: "A", text: "غيّر حياة الناس وأثّر فيهم" },
      { label: "B", text: "اكتشف شيئاً جديداً لم يعرفه أحد" },
      { label: "C", text: "بنى شيئاً باقياً وملموساً" },
      { label: "D", text: "نجح وحقق ثروة وقيادة" },
      { label: "E", text: "عبّر عن نفسه وترك بصمة إبداعية" },
    ],
  },
  {
    questionID: 8,
    text: "أي نوع من المهام تشعر أنك تتحمله أكثر في الدراسة؟",
    options: [
      { label: "A", text: "حفظ وفهم كميات كبيرة من المعلومات" },
      { label: "B", text: "تطبيق عملي ومشاريع ميدانية" },
      { label: "C", text: "تحليل وكتابة مقالات وأبحاث" },
      { label: "D", text: "حل مسائل وأرقام وخوارزميات" },
      { label: "E", text: "عمل جماعي ونقاشات وتفاعل" },
    ],
  },
  {
    questionID: 9,
    text: "شو كان فرعك بالتوجيهي؟",
    options: [
      { label: "A", text: "علمي" },
      { label: "B", text: "أدبي" },
      { label: "C", text: "صناعي" },
      { label: "D", text: "تجاري" },
      { label: "E", text: "شرعي" },
    ],
  },
  {
    questionID: 10,
    text: "معدلك ضمن أي range؟",
    options: [
      { label: "A", text: "أقل من 60" },
      { label: "B", text: "من 60 إلى 69" },
      { label: "C", text: "من 70 إلى 79" },
      { label: "D", text: "من 80 إلى 89" },
      { label: "E", text: "من 90 إلى 100" },
    ],
  },
];
*/


  //const currentQuestion = questions[currentIndex];
  //const isLast = currentIndex === questions.length - 1;
  //const selectedAnswer = answers[currentQuestion.questionID];
  //const progress = ((currentIndex + 1) / questions.length) * 100;