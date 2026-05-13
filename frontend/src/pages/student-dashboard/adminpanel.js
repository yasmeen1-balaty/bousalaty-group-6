import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import FacultiesTable from "./facultiesTable";

export default function AdminPanel() {

  const [faculties, setFaculties] = useState([]);

  const fetchFaculties = async () => {
    try {
      const res = await fetch("http://localhost:3001/faculties");
      const data = await res.json();
      setFaculties(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [activeForm, setActiveForm] = useState("");

  // Faculty states
  const [facultyID, setFacultyID] = useState("");
  const [facultyName, setFacultyName] = useState("");

  // Major states
  const [majorID, setMajorID] = useState("");
  const [majorName, setMajorName] = useState("");
  const [majorFacultyID, setMajorFacultyID] = useState("");
  const [acceptanceGrade, setAcceptanceGrade] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [costPerHour, setCostPerHour] = useState("");
  const [studyPlanURL, setStudyPlanURL] = useState("");

  // Expert states
  const [expertID, setExpertID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertFacultyID, setExpertFacultyID] = useState("");

  useEffect(() => {
    if (!isAdmin) {
      alert("you are not an admin");
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const resetForms = () => {
    setFacultyID("");
    setFacultyName("");

    setMajorID("");
    setMajorName("");
    setMajorFacultyID("");
    setAcceptanceGrade("");
    setCreditHours("");
    setCostPerHour("");
    setStudyPlanURL("");

    setExpertID("");
    setFirstName("");
    setLastName("");
    setExpertEmail("");
    setExpertFacultyID("");
  };

  // ================= FACULTY =================

  const addFaculty = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/faculties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ facultyName })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تمت إضافة الكلية بنجاح");
      resetForms();
      setActiveForm("");
      fetchFaculties();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const updateFaculty = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/faculties/${facultyID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ facultyName })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم تعديل الكلية بنجاح");
      resetForms();
      setActiveForm("");
      fetchFaculties();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const deleteFaculty = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/faculties/${facultyID}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم حذف الكلية بنجاح");
      resetForms();
      setActiveForm("");
      fetchFaculties();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  // ================= MAJOR =================

  const addMajor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/majors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          majorName,
          facultyID: majorFacultyID,
          acceptanceGrade,
          creditHours,
          costPerHour,
          studyPlanURL
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تمت إضافة التخصص بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const updateMajor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/majors/${majorID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          majorName,
          facultyID: majorFacultyID,
          acceptanceGrade,
          creditHours,
          costPerHour,
          studyPlanURL
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم تعديل التخصص بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const deleteMajor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/majors/${majorID}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم حذف التخصص بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  // ================= EXPERT =================

  const addExpert = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/experts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: expertEmail,
          facultyID: expertFacultyID
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تمت إضافة الخبير بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const updateExpert = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/experts/${expertID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: expertEmail,
          facultyID: expertFacultyID
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم تعديل الخبير بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const deleteExpert = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/experts/${expertID}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "حدث خطأ");
        return;
      }

      alert("تم حذف الخبير بنجاح");
      resetForms();
      setActiveForm("");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="container py-5" dir="rtl" style={{ minHeight: "100vh" }}>
      <h1 className="text-center mb-5 fw-bold text-primary">
        لوحة تحكم الإدارة
      </h1>

      <div className="row g-4">

        {/* إدارة الخبراء */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100 rounded-4">
            <div className="card-body text-center p-4">
              <h3 className="fw-bold mb-4">إدارة الخبراء</h3>

              <div className="d-grid gap-3">
                <button onClick={() => { resetForms(); setActiveForm("addExpert"); }} className="btn btn-success rounded-pill">
                  إضافة خبير
                </button>

                <button onClick={() => { resetForms(); setActiveForm("updateExpert"); }} className="btn btn-warning text-white rounded-pill">
                  تعديل خبير
                </button>

                <button onClick={() => { resetForms(); setActiveForm("deleteExpert"); }} className="btn btn-danger rounded-pill">
                  حذف خبير
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* إدارة التخصصات */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100 rounded-4">
            <div className="card-body text-center p-4">
              <h3 className="fw-bold mb-4">إدارة التخصصات</h3>

              <div className="d-grid gap-3">
                <button onClick={() => { resetForms(); setActiveForm("addMajor"); }} className="btn btn-success rounded-pill">
                  إضافة تخصص
                </button>

                <button onClick={() => { resetForms(); setActiveForm("updateMajor"); }} className="btn btn-warning text-white rounded-pill">
                  تعديل تخصص
                </button>

                <button onClick={() => { resetForms(); setActiveForm("deleteMajor"); }} className="btn btn-danger rounded-pill">
                  حذف تخصص
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* إدارة الكليات */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100 rounded-4">
            <div className="card-body text-center p-4">
              <h3 className="fw-bold mb-4">إدارة الكليات</h3>

              <div className="d-grid gap-3">
                <button onClick={() => { resetForms(); setActiveForm("addFaculty"); }} className="btn btn-success rounded-pill">
                  إضافة كلية
                </button>

                <button onClick={() => { resetForms(); setActiveForm("updateFaculty"); }} className="btn btn-warning text-white rounded-pill">
                  تعديل كلية
                </button>

                <button onClick={() => { resetForms(); setActiveForm("deleteFaculty"); }} className="btn btn-danger rounded-pill">
                  حذف كلية
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= FORMS ================= */}

      <div className="mt-5 mx-auto" style={{ maxWidth: "600px" }}>

        {activeForm === "addFaculty" && (
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
        )}

        {activeForm === "updateFaculty" && (
          <>
          <FacultiesTable faculties={faculties} />
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
          </>
        )}

        {activeForm === "deleteFaculty" && (
          <>
          <FacultiesTable faculties={faculties} />
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
          </>
        )}

        {activeForm === "addMajor" && (
          <>          
          <FacultiesTable faculties={faculties} />
            <form onSubmit={addMajor} className="card p-4 shadow">
              <h4 className="text-center mb-3">إضافة تخصص</h4>

              <input className="form-control mb-3" placeholder="اسم التخصص" value={majorName} onChange={(e) => setMajorName(e.target.value)} required />
              <input className="form-control mb-3" placeholder="رقم الكلية facultyID" value={majorFacultyID} onChange={(e) => setMajorFacultyID(e.target.value)} required />
              <input className="form-control mb-3" placeholder="معدل القبول" value={acceptanceGrade} onChange={(e) => setAcceptanceGrade(e.target.value)} />
              <input className="form-control mb-3" placeholder="عدد الساعات" value={creditHours} onChange={(e) => setCreditHours(e.target.value)} />
              <input className="form-control mb-3" placeholder="سعر الساعة" value={costPerHour} onChange={(e) => setCostPerHour(e.target.value)} />
              <input className="form-control mb-3" placeholder="رابط الخطة الدراسية" value={studyPlanURL} onChange={(e) => setStudyPlanURL(e.target.value)} />

              <button className="btn btn-success">حفظ</button>
            </form>
            </>
        )}

        {activeForm === "updateMajor" && (
          <>
          <FacultiesTable faculties={faculties} />
          <form onSubmit={updateMajor} className="card p-4 shadow">
            <h4 className="text-center mb-3">تعديل تخصص</h4>

            <input className="form-control mb-3" placeholder="رقم التخصص majorID" value={majorID} onChange={(e) => setMajorID(e.target.value)} required />
            <input className="form-control mb-3" placeholder="اسم التخصص الجديد" value={majorName} onChange={(e) => setMajorName(e.target.value)} required />
            <input className="form-control mb-3" placeholder="رقم الكلية facultyID" value={majorFacultyID} onChange={(e) => setMajorFacultyID(e.target.value)} required />
            <input className="form-control mb-3" placeholder="معدل القبول" value={acceptanceGrade} onChange={(e) => setAcceptanceGrade(e.target.value)} />
            <input className="form-control mb-3" placeholder="عدد الساعات" value={creditHours} onChange={(e) => setCreditHours(e.target.value)} />
            <input className="form-control mb-3" placeholder="سعر الساعة" value={costPerHour} onChange={(e) => setCostPerHour(e.target.value)} />
            <input className="form-control mb-3" placeholder="رابط الخطة الدراسية" value={studyPlanURL} onChange={(e) => setStudyPlanURL(e.target.value)} />

            <button className="btn btn-warning text-white">تعديل</button>
          </form>
          </>
        )}

        {activeForm === "deleteMajor" && (
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
        )}

        {activeForm === "addExpert" && (
          <>
                    <FacultiesTable faculties={faculties} />
          <form onSubmit={addExpert} className="card p-4 shadow">
            <h4 className="text-center mb-3">إضافة خبير</h4>

            <input className="form-control mb-3" placeholder="الاسم الأول" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input className="form-control mb-3" placeholder="اسم العائلة" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input className="form-control mb-3" placeholder="الإيميل" value={expertEmail} onChange={(e) => setExpertEmail(e.target.value)} required />
            <input className="form-control mb-3" placeholder="رقم الكلية facultyID" value={expertFacultyID} onChange={(e) => setExpertFacultyID(e.target.value)} required />

            <button className="btn btn-success">حفظ</button>
          </form>
          </>
        )}

        {activeForm === "updateExpert" && (
          <>
                    <FacultiesTable faculties={faculties} />
          <form onSubmit={updateExpert} className="card p-4 shadow">
            <h4 className="text-center mb-3">تعديل خبير</h4>

            <input className="form-control mb-3" placeholder="رقم الخبير expertID" value={expertID} onChange={(e) => setExpertID(e.target.value)} required />
            <input className="form-control mb-3" placeholder="الاسم الأول" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input className="form-control mb-3" placeholder="اسم العائلة" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input className="form-control mb-3" placeholder="الإيميل" value={expertEmail} onChange={(e) => setExpertEmail(e.target.value)} required />
            <input className="form-control mb-3" placeholder="رقم الكلية facultyID" value={expertFacultyID} onChange={(e) => setExpertFacultyID(e.target.value)} required />

            <button className="btn btn-warning text-white">تعديل</button>
          </form>
          </>
        )}

        {activeForm === "deleteExpert" && (
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
        )}

      </div>
    </div>
  );
}