import FacultiesTable from "../../FacultiesTable";
import ExpertsTable from "../../ExpertsTable";

export default function ExpertForms({
  activeForm,
  faculties,
  experts,

  expertID,
  setExpertID,

  firstName,
  setFirstName,

  lastName,
  setLastName,

  expertEmail,
  setExpertEmail,

  expertFacultyID,
  setExpertFacultyID,

  addExpert,
  updateExpert,
  deleteExpert,
}) 
{

  const handleExpertIDChange = async (e) => {
  const id = e.target.value;
  setExpertID(id);

  if (id) {
    try {
      const res = await fetch(`http://localhost:3001/experts/${id}`);
      const data = await res.json();

      if (data) {
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setExpertEmail(data.email || '');
        setExpertFacultyID(data.facultyID || '');
      }
    } catch (err) {
      console.log(err);
    }
  }
};
  return (
    <>
      {activeForm === "addExpert" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <FacultiesTable faculties={faculties} />
            </div>

            <div className="col-4">
              <form onSubmit={addExpert} className="card p-4 shadow">
                <h4 className="text-center mb-3">إضافة خبير</h4>

                <input
                  className="form-control mb-3"
                  placeholder="الاسم الأول"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="اسم العائلة"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="الإيميل"
                  value={expertEmail}
                  onChange={(e) => setExpertEmail(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم الكلية facultyID"
                  value={expertFacultyID}
                  onChange={(e) => setExpertFacultyID(e.target.value)}
                  required
                />

                <button className="btn btn-success">حفظ</button>
              </form>
            </div>

            <div className="col-4">
              <ExpertsTable experts={experts} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "updateExpert" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <FacultiesTable faculties={faculties} />
            </div>

            <div className="col-4">
              <form onSubmit={updateExpert} className="card p-4 shadow">
                <h4 className="text-center mb-3">تعديل خبير</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الخبير expertID"
                  value={expertID}
                  onChange={handleExpertIDChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="الاسم الأول"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="اسم العائلة"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="الإيميل"
                  value={expertEmail}
                  onChange={(e) => setExpertEmail(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم الكلية facultyID"
                  value={expertFacultyID}
                  onChange={(e) => setExpertFacultyID(e.target.value)}
                  required
                />

                <button className="btn btn-warning text-white">تعديل</button>
              </form>
            </div>

            <div className="col-4">
              <ExpertsTable experts={experts} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "deleteExpert" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <ExpertsTable experts={experts} />
            </div>

            <div className="col-4">
              <form onSubmit={deleteExpert} className="card p-4 shadow">
                <h4 className="text-center mb-3">حذف خبير</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الخبير expertID"
                  value={expertID}
                  onChange={(e) => setExpertID(e.target.value)}
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