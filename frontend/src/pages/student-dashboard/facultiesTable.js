export default function FacultiesTable({faculties}) {
    return(
        <div className="mt-5 mx-auto" style={{ maxWidth: "600px" }}>
        {faculties?.length > 0 ? (
            <div className="mb-4">
                <h5 className="text-center mb-3">قائمة الكليات (IDs)</h5>

                <div className="card p-3 shadow-sm">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Faculty ID</th>
                                <th>Faculty Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {faculties.map((f) => (
                                <tr key={f.facultyID}>
                                    <td>{f.facultyID}</td>
                                    <td>{f.facultyName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="mb-4 card p-3 shadow-sm text-center">
                <h5 className="mb-0">لا توجد كليات لعرضها حالياً</h5>
            </div>
        )}
    </div>
    )
}