export default function OpportunitiesTable({ opportunities = [] }) {
  return (
    <div className="card shadow p-3">
      <h5 className="text-center mb-3">جدول فرص العمل</h5>

      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>رقم الفرصة</th>
            <th>رقم التخصص</th>
            <th>فرصة العمل</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.length === 0 ? (
            <tr>
              <td colSpan="3">لا توجد فرص عمل</td>
            </tr>
          ) : (
            opportunities.map((item) => (
              <tr key={`${item.oppoID}-${item.majorID}`}>
                <td>{item.oppoID}</td>
                <td>{item.majorID}</td>
                <td>{item.opportunity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}