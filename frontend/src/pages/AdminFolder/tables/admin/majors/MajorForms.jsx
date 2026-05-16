import FacultiesTable from "../../FacultiesTable";
import MajorsTable from "../../MajorsTable";

const BRANCHES = ["العلمي", "الادبي", "الصناعي", "التجاري", "الشرعي"]; // letter sensitive

export default function MajorForms({
  activeForm,
  faculties,
  majors,
  majorID, setMajorID,
  majorName, setMajorName,
  majorFacultyID, setMajorFacultyID,
  acceptanceGrade, setAcceptanceGrade,
  creditHours, setCreditHours,
  costPerHour, setCostPerHour,
  studyPlanURL, setStudyPlanURL,
  acceptedBranches, setAcceptedBranches,
  addMajor, updateMajor, deleteMajor,
}) {

  const handleBranchChange = (branch) => {
    if (acceptedBranches.includes(branch)) {
      setAcceptedBranches(acceptedBranches.filter(b => b !== branch));
    } else {
      setAcceptedBranches([...acceptedBranches, branch]);
    }
  };

  const BranchCheckboxes = () => (
    <div className="mb-3">
      <label className="form-label fw-bold">الفروع المقبولة:</label>
      <div className="d-flex flex-wrap gap-3">
        {BRANCHES.map(branch => (
          <div key={branch} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={branch}
              checked={acceptedBranches.includes(branch)}
              onChange={() => handleBranchChange(branch)}
            />
            <label className="form-check-label" htmlFor={branch}>
              {branch}
            </label>
          </div>
        ))}
      </div>
      {acceptedBranches.length === 0 && (
        <small className="text-danger">اختر فرع واحد على الأقل</small>
      )}
    </div>
  );

  const handleMajorIDChange = async (e) => {
  const id = e.target.value;
  setMajorID(id);

  if (id) {
    try {
      const res = await fetch(`http://localhost:3001/majors/${id}`);
      const data = await res.json();

      if (data) {
        setMajorName(data.majorName || '');
        setMajorFacultyID(data.facultyID || '');
        setAcceptanceGrade(data.acceptanceGrade || '');
        setCreditHours(data.creditHours || '');
        setCostPerHour(data.costPerHour || '');
        setStudyPlanURL(data.studyPlanURL || '');
        setAcceptedBranches(
          Array.isArray(data.acceptedBranches)
            ? data.acceptedBranches
            : JSON.parse(data.acceptedBranches || '[]')
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
};

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

                <BranchCheckboxes />

                <button
                  className="btn btn-success"
                  disabled={acceptedBranches.length === 0}
                >
                  حفظ
                </button>
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
                  onChange={handleMajorIDChange}
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

                <BranchCheckboxes />

                <button
                  className="btn btn-warning text-white"
                  disabled={acceptedBranches.length === 0}
                >
                  تعديل
                </button>
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