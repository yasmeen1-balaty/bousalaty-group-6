export default function ExpertsTable({experts}) {
    return(
        <div className="mt-5 mx-auto" style={{ maxWidth: "600px" }}>
        {experts?.length > 0 ? (
            <div className="mb-4">
                <h5 className="text-center mb-3">قائمة الخبراء (IDs)</h5>

                <div className="card p-3 shadow-sm">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Expert ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {experts.map((e) => (
                                <tr key={e.expertID}>
                                    <td>{e.expertID}</td>
                                    <td>{e.firstName}</td>
                                    <td>{e.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="mb-4 card p-3 shadow-sm text-center">
                <h5 className="mb-0">لا يوجد خبراء حالياً</h5>
            </div>
        )}
    </div>
    )
}