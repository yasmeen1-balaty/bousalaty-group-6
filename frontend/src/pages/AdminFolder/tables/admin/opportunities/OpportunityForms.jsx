import MajorsTable from "../../MajorsTable";
import OpportunitiesTable from "../../OpportunitiesTable";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

export default function OpportunityForms({
  activeForm,
  majors,
  opportunities,

  oppoID,
  setOppoID,

  opportunityMajorID,
  setOpportunityMajorID,

  opportunity,
  setOpportunity,

  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
}) {
  const handleOppoIDChange = async (e) => {
    const id = e.target.value;
    setOppoID(id);

    if (id) {
      try {
        const res = await fetch(`${API_URL}/opportunities/${id}`);
        const data = await res.json();

        if (data) {
          setOpportunityMajorID(data.majorID || "");
          setOpportunity(data.opportunity || "");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {activeForm === "addOpportunity" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <MajorsTable majors={majors} />
            </div>

            <div className="col-4">
              <form onSubmit={addOpportunity} className="card p-4 shadow">
                <h4 className="text-center mb-3">إضافة فرصة عمل</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={opportunityMajorID}
                  onChange={(e) => setOpportunityMajorID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="فرصة العمل"
                  value={opportunity}
                  onChange={(e) => setOpportunity(e.target.value)}
                  required
                />

                <button className="btn btn-success">حفظ</button>
              </form>
            </div>

            <div className="col-4">
              <OpportunitiesTable opportunities={opportunities} />
            </div>
          </div>
        </div>
      )}

      {activeForm === "updateOpportunity" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <OpportunitiesTable opportunities={opportunities} />
            </div>

            <div className="col-4">
              <form onSubmit={updateOpportunity} className="card p-4 shadow">
                <h4 className="text-center mb-3">تعديل فرصة عمل</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الفرصة oppoID"
                  value={oppoID}
                  onChange={handleOppoIDChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={opportunityMajorID}
                  onChange={(e) => setOpportunityMajorID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="فرصة العمل الجديدة"
                  value={opportunity}
                  onChange={(e) => setOpportunity(e.target.value)}
                  required
                />

                <button className="btn btn-warning text-white">تعديل</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeForm === "deleteOpportunity" && (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <OpportunitiesTable opportunities={opportunities} />
            </div>

            <div className="col-4">
              <form onSubmit={deleteOpportunity} className="card p-4 shadow">
                <h4 className="text-center mb-3">حذف فرصة عمل</h4>

                <input
                  className="form-control mb-3"
                  placeholder="رقم الفرصة oppoID"
                  value={oppoID}
                  onChange={(e) => setOppoID(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="رقم التخصص majorID"
                  value={opportunityMajorID}
                  onChange={(e) => setOpportunityMajorID(e.target.value)}
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