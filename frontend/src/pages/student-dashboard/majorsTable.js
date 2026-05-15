export default function MajorsTable({majors}) {
    return(
        <div className="mt-5 mx-auto" style={{ maxWidth: "600px" }}>
        {majors?.length > 0 ? (
            <div className="mb-4">
                <h5 className="text-center mb-3">قائمة التخصصات (IDs)</h5>

                <div className="card p-3 shadow-sm">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Major ID</th>
                                <th>Major Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {majors.map((m) => (
                                <tr key={m.majorID}>
                                    <td>{m.majorID}</td>
                                    <td>{m.majorName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="mb-4 card p-3 shadow-sm text-center">
                <h5 className="mb-0">لا توجد تخصصات لعرضها حالياً</h5>
            </div>
        )}
    </div>
    )
}