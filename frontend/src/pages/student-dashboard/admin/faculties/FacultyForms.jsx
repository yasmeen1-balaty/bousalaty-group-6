import FacultiesTable from "../../tables/FacultiesTable";

export default function FacultyForms({
  activeForm,
  faculties,

  facultyID,
  setFacultyID,

  facultyName,
  setFacultyName,

  addFaculty,
  updateFaculty,
  deleteFaculty,
}) {
  return (
    <>
      {activeForm === "addFaculty" && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-5">
              <form onSubmit={addFaculty} className="card p-4 shadow">
                <h4 className="text-center mb-3">إضافة كلية</h4>

                <input
                  className="form-control mb-3"
                  placeholder="اسم الكلية"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  required
                />

                <button className="btn btn-success">حفظ</button>
              </form>
            </div>

            <div className="col-5">
              <FacultiesTable faculties={faculties} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "updateFaculty" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <FacultiesTable faculties={faculties} />
            </div>

            <div className="col-4">
              <form onSubmit={updateFaculty} className="card p-4 shadow">
                <h4 className="text-center mb-3">تعديل كلية</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الكلية facultyID"
                  value={facultyID}
                  onChange={(e) => setFacultyID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="اسم الكلية الجديد"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  required
                />

                <button className="btn btn-warning text-white">تعديل</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeForm === "deleteFaculty" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <FacultiesTable faculties={faculties} />
            </div>

            <div className="col-4">
              <form onSubmit={deleteFaculty} className="card p-4 shadow">
                <h4 className="text-center mb-3">حذف كلية</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الكلية facultyID"
                  value={facultyID}
                  onChange={(e) => setFacultyID(e.target.value)}
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