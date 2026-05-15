export default function QuestionsTable({ questions = [] }) {
  return (
    <div className="card shadow p-3">
      <h5 className="text-center mb-3">جدول الأسئلة</h5>

      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>رقم السؤال</th>
            <th>نص السؤال</th>
          </tr>
        </thead>

        <tbody>
          {questions.length === 0 ? (
            <tr>
              <td colSpan="2">لا توجد أسئلة</td>
            </tr>
          ) : (
            questions.map((question) => (
              <tr key={question.questionID}>
                <td>{question.questionID}</td>
                <td>{question.questionText}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}