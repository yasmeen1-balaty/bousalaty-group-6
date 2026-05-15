import FacultiesTable from "../../tables/FacultiesTable";
import MajorsTable from "../../tables/MajorsTable";

export default function MajorForms({
  activeForm,
  faculties,
  majors,

  majorID,
  setMajorID,

  majorName,
  setMajorName,

  majorFacultyID,
  setMajorFacultyID,

  acceptanceGrade,
  setAcceptanceGrade,

  creditHours,
  setCreditHours,

  costPerHour,
  setCostPerHour,

  studyPlanURL,
  setStudyPlanURL,

  addMajor,
  updateMajor,
  deleteMajor,
}) {
  return (
    <>
      {activeForm === "addMajor" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <FacultiesTable faculties={faculties} />
            </div>

            <div className="col-4">
              <form onSubmit={addMajor} className="card p-4 shadow">
                <h4 className="text-center mb-3">إضافة تخصص</h4>

                <input
                  className="form-control mb-3"
                  placeholder="اسم التخصص"
                  value={majorName}
                  onChange={(e) => setMajorName(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم الكلية facultyID"
                  value={majorFacultyID}
                  onChange={(e) => setMajorFacultyID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="معدل القبول"
                  value={acceptanceGrade}
                  onChange={(e) => setAcceptanceGrade(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  placeholder="عدد الساعات"
                  value={creditHours}
                  onChange={(e) => setCreditHours(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  placeholder="سعر الساعة"
                  value={costPerHour}
                  onChange={(e) => setCostPerHour(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  placeholder="رابط الخطة الدراسية"
                  value={studyPlanURL}
                  onChange={(e) => setStudyPlanURL(e.target.value)}
                />

                <button className="btn btn-success">حفظ</button>
              </form>
            </div>

            <div className="col-4">
              <MajorsTable majors={majors} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "updateMajor" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <FacultiesTable faculties={faculties} />
            </div>

            <div className="col-4">
              <form onSubmit={updateMajor} className="card p-4 shadow">
                <h4 className="text-center mb-3">تعديل تخصص</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={majorID}
                  onChange={(e) => setMajorID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="اسم التخصص الجديد"
                  value={majorName}
                  onChange={(e) => setMajorName(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم الكلية facultyID"
                  value={majorFacultyID}
                  onChange={(e) => setMajorFacultyID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="معدل القبول"
                  value={acceptanceGrade}
                  onChange={(e) => setAcceptanceGrade(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  placeholder="عدد الساعات"
                  value={creditHours}
                  onChange={(e) => setCreditHours(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  placeholder="سعر الساعة"
                  value={costPerHour}
                  onChange={(e) => setCostPerHour(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  placeholder="رابط الخطة الدراسية"
                  value={studyPlanURL}
                  onChange={(e) => setStudyPlanURL(e.target.value)}
                />

                <button className="btn btn-warning text-white">تعديل</button>
              </form>
            </div>

            <div className="col-4">
              <MajorsTable majors={majors} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "deleteMajor" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <MajorsTable majors={majors} />
            </div>

            <div className="col-4">
              <form onSubmit={deleteMajor} className="card p-4 shadow">
                <h4 className="text-center mb-3">حذف تخصص</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={majorID}
                  onChange={(e) => setMajorID(e.target.value)}
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