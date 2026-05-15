import QuestionsTable from "../../QuestionsTable";

export default function QuestionForms({
  activeForm,
  questions,

  questionID,
  setQuestionID,

  questionText,
  setQuestionText,

  addQuestion,
  updateQuestion,
  deleteQuestion,
}) {
  return (
    <>
      {activeForm === "addQuestion" && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-5">
              <form onSubmit={addQuestion} className="card p-4 shadow">
                <h4 className="text-center mb-3">إضافة سؤال</h4>

                <textarea
                  className="form-control mb-3"
                  placeholder="نص السؤال"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  rows="4"
                />

                <button className="btn btn-success">حفظ</button>
              </form>
            </div>

            <div className="col-5">
              <QuestionsTable questions={questions} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "updateQuestion" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <QuestionsTable questions={questions} />
            </div>

            <div className="col-4">
              <form onSubmit={updateQuestion} className="card p-4 shadow">
                <h4 className="text-center mb-3">تعديل سؤال</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم السؤال questionID"
                  value={questionID}
                  onChange={(e) => setQuestionID(e.target.value)}
                  required
                />

                <textarea
                  className="form-control mb-3"
                  placeholder="نص السؤال الجديد"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  rows="4"
                />

                <button className="btn btn-warning text-white">تعديل</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeForm === "deleteQuestion" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <QuestionsTable questions={questions} />
            </div>

            <div className="col-4">
              <form onSubmit={deleteQuestion} className="card p-4 shadow">
                <h4 className="text-center mb-3">حذف سؤال</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم السؤال questionID"
                  value={questionID}
                  onChange={(e) => setQuestionID(e.target.value)}
                  required
                />

                <button className="btn btn-danger">حذف</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}