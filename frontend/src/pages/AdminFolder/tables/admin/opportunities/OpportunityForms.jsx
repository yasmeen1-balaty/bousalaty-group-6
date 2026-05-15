import MajorsTable from "../../MajorsTable";
import OpportunitiesTable from "../../OpportunitiesTable";

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