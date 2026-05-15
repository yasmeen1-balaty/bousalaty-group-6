export default function OptionsTable({ options = [] }) {
  return (
    <div className="card shadow p-3">
      <h5 className="text-center mb-3">جدول الخيارات</h5>

      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>رقم الخيار</th>
            <th>رقم السؤال</th>
            <th>نص الخيار</th>
          </tr>
        </thead>

        <tbody>
          {options.length === 0 ? (
            <tr>
              <td colSpan="3">لا توجد خيارات</td>
            </tr>
          ) : (
            options.map((option) => (
              <tr key={option.optionID}>
                <td>{option.optionID}</td>
                <td>{option.questionID}</td>
                <td>{option.optionText}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}