import React, { useEffect, useState } from "react";

function MyAttempts() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const studentID = savedUser?.studentID || savedUser?.id || savedUser?.userID;

  useEffect(() => {
    if (!studentID) return;

    fetch(`http://localhost:3001/submissions/student/${studentID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("submissions:", data);

        if (Array.isArray(data)) {
          setSubmissions(data);
        } else if (Array.isArray(data.submissions)) {
          setSubmissions(data.submissions);
        } else if (Array.isArray(data.data)) {
          setSubmissions(data.data);
        } else {
          setSubmissions([]);
        }
      })
      .catch((err) => console.log(err));
  }, [studentID]);
  return (
    <div className="container mt-5" style={{ direction: "rtl" }}>
      <h2 className="mb-4">محاولاتي السابقة</h2>

      {submissions.length === 0 ? (
        <p>لا يوجد محاولات بعد.</p>
      ) : (
        <div className="row">
          {submissions.map((submission, index) => (
            <div className="col-md-6 mb-3" key={submission.submissionID}>
              <div className="card shadow-sm p-3">
                <h5>المحاولة رقم: {submissions.length - index}</h5>

                <p>
                  التاريخ:{" "}
                  {new Date(submission.createdAt).toLocaleString("ar")}
                </p>

                <p>الحالة: {submission.status}</p>

                <p>
                  عدد الإجابات:{" "}
                  {submission.responses ? submission.responses.length : 0}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedSubmission(submission);

                    setTimeout(() => {
                      document
                        .getElementById("attempts")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                >
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSubmission && (
        <div className="card shadow-sm p-4 mt-4 mb-5" id="attempts">
          <h4 className="mb-3">
            تفاصيل المحاولة
          </h4>

          <p>
            <strong>تاريخ المحاولة:</strong>{" "}
            {new Date(selectedSubmission.createdAt).toLocaleString("ar")}
          </p>

          <p>
            <strong>الحالة:</strong> {selectedSubmission.status}
          </p>

          <hr />

          {selectedSubmission.responses?.map((response, index) => (
            <div key={response.responseID} className="border-bottom py-3">
              <p>
                <strong>السؤال {index + 1}:</strong>{" "}
                {response.question?.questionText}
              </p>

              <p>
                <strong>إجابتك:</strong>{" "}
                {response.option?.optionText}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAttempts;