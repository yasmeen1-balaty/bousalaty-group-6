import FacultiesTable from "../../FacultiesTable";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

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

  const handleFacultyIDChange = async (e) => {
    const id = e.target.value;
    setFacultyID(id);

    if (id) {
      try {
        const res = await fetch(`${API_URL}/faculties/${id}`);
        const data = await res.json();

        if (data) {
          setFacultyName(data.facultyName || "");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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
                  onChange={handleFacultyIDChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="اسم الكلية الجديد"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  required
                />

                <button className="btn btn-warning text-white">
                  تعديل
                </button>
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