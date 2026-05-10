import { Link } from "react-router-dom";
import "./style.css"
export function SavedMajors({ majors = [] }) {
  return (
    <div className="container mt-3">
      {/* external card*/}
      <div className="card shadow-sm text-end">
        <div className="card-body card-body-style">
          <h4 className="mb-4">تخصصاتي المحفوظة</h4>

          <div className="row">
            {majors.length === 0 && (
              <p className="text-muted">
                لم تقم بحفظ أي تخصص بعد. استكشف التخصصات وأضفها إلى قائمتك!
              </p>
            )}
            {majors.map((major, index) => (
              <div className="col-md-4 mb-3" key={major.majorID}>
                {/* majors cards*/}
                <div className="card h-100 shadow-sm sub-card-style">
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title">{major.majorName}</h5>
                    <p className="card-text text-muted">عدد الساعات:{major.creditHours}</p>
                    <Link to={`/details/${major.majorID}`} className="btn  btn-primary mt-auto">عرض التفاصيل</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to={"/suggestions"} className="btn btn-primary mt-3" style={{ width: "100%" }}>استكشف تخصصات أخرى</Link>
        </div>
      </div>
    </div>
  );
}