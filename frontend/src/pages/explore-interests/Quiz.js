import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/questions`)
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
      [currentQuestion.questionID]: optionID,
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
    const token = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const studentID = savedUser?.studentID || savedUser?.id || savedUser?.userID;

    if (!token || !savedUser || !studentID) {
      alert("لازم تسجل دخول كطالب أولاً");
      navigate("/login");
      return;
    }

    try {
      const submissionRes = await fetch(`${API_URL}/submissions`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentID }),
      });

      const submissionData = await submissionRes.json();

      if (!submissionRes.ok) {
        alert(submissionData.message || "صار خطأ أثناء إنشاء المحاولة");
        return;
      }
      localStorage.setItem("submissionID", submissionData.submissionID);
      const submissionID = submissionData.submissionID;

      const responses = Object.entries(answers).map(([questionID, optionID]) => ({
        submissionID,
        questionID,
        optionID,
      }));

      for (const response of responses) {
        const responseRes = await fetch(`${API_URL}/responses`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(response),
        });

        if (!responseRes.ok) {
          const responseData = await responseRes.json();
          alert(responseData.message || "صار خطأ أثناء حفظ الإجابات");
          return;
        }
      }

      const aiRes = await fetch(`${API_URL}/submissions/${submissionID}/analyze`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const aiData = await aiRes.json();

      if (!aiRes.ok) {
        alert("صار خطأ أثناء تحليل إجاباتك");
        return;
      }

      navigate("/suggestions", {
        state: { recommendations: aiData.recommendations },
      });
    } catch (error) {
      console.log(error);
      alert("صار خطأ أثناء إرسال الإجابات");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ direction: "rtl" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "650px", width: "100%", borderRadius: "16px" }}
      >
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted">
              السؤال {currentIndex + 1} من {questions.length}
            </small>

            <small className="text-muted fw-bold">
              {Math.round(progress)}%
            </small>
          </div>

          <div className="progress" style={{ height: "8px", borderRadius: "10px" }}>
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: "#4f46e5",
                borderRadius: "10px",
                transition: "width 0.4s ease",
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
                  border: isSelected
                    ? "2px solid #4f46e5"
                    : "2px solid #e2e8f0",
                  backgroundColor: isSelected ? "#eef2ff" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  className="me-3 fw-bold d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    backgroundColor: isSelected ? "#4f46e5" : "#e2e8f0",
                    color: isSelected ? "white" : "#555",
                    fontSize: "14px",
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                <span style={{ color: "#1e293b" }}>
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
            style={{ borderRadius: "10px" }}
          >
            السابق
          </button>

          {isLast ? (
            <button
              className="btn px-4 text-white"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              style={{ backgroundColor: "#4f46e5", borderRadius: "10px" }}
            >
              إرسال الإجابات
            </button>
          ) : (
            <button
              className="btn px-4 text-white"
              onClick={handleNext}
              disabled={!selectedAnswer}
              style={{ backgroundColor: "#4f46e5", borderRadius: "10px" }}
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