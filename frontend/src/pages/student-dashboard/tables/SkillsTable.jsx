export default function SkillsTable({ skills = [] }) {
  return (
    <div className="card shadow p-3">
      <h5 className="text-center mb-3">جدول المهارات</h5>

      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>رقم المهارة</th>
            <th>رقم التخصص</th>
            <th>المهارة</th>
          </tr>
        </thead>

        <tbody>
          {skills.length === 0 ? (
            <tr>
              <td colSpan="3">لا توجد مهارات</td>
            </tr>
          ) : (
            skills.map((item) => (
              <tr key={`${item.skillID}-${item.majorID}`}>
                <td>{item.skillID}</td>
                <td>{item.majorID}</td>
                <td>{item.skill}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}