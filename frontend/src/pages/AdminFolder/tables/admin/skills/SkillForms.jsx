import MajorsTable from "../../MajorsTable";
import SkillsTable from "../../SkillsTable";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

export default function SkillForms({
  activeForm,
  majors,
  skills,

  skillID,
  setSkillID,

  skillMajorID,
  setSkillMajorID,

  skill,
  setSkill,

  addSkill,
  updateSkill,
  deleteSkill,
}) {

  const handleSkillIDChange = async (e) => {
    const id = e.target.value;
    setSkillID(id);

    if (id) {
      try {
        const res = await fetch(`${API_URL}/skills/${id}`);
        const data = await res.json();

        if (data) {
          setSkillMajorID(data.majorID || "");
          setSkill(data.skill || "");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {activeForm === "addSkill" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <MajorsTable majors={majors} />
            </div>

            <div className="col-4">
              <form onSubmit={addSkill} className="card p-4 shadow">
                <h4 className="text-center mb-3">إضافة مهارة</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={skillMajorID}
                  onChange={(e) => setSkillMajorID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="نص المهارة"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  required
                />

                <button className="btn btn-success">حفظ</button>
              </form>
            </div>

            <div className="col-4">
              <SkillsTable skills={skills} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "updateSkill" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <SkillsTable skills={skills} />
            </div>

            <div className="col-4">
              <form onSubmit={updateSkill} className="card p-4 shadow">
                <h4 className="text-center mb-3">تعديل مهارة</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم المهارة skillID"
                  value={skillID}
                  onChange={handleSkillIDChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={skillMajorID}
                  onChange={(e) => setSkillMajorID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="نص المهارة الجديد"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
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

      {activeForm === "deleteSkill" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <SkillsTable skills={skills} />
            </div>

            <div className="col-4">
              <form onSubmit={deleteSkill} className="card p-4 shadow">
                <h4 className="text-center mb-3">حذف مهارة</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم المهارة skillID"
                  value={skillID}
                  onChange={(e) => setSkillID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={skillMajorID}
                  onChange={(e) => setSkillMajorID(e.target.value)}
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