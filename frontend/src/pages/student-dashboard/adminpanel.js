import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
        alert("you are not an admin");
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

   return (
    <div
      className="container py-5"
      dir="rtl"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="text-center mb-5 fw-bold text-primary">
        لوحة تحكم الإدارة
      </h1>

      <div className="row g-4">

        {/* إدارة الكليات */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100 rounded-4">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <i
                  className="bi bi-building"
                  style={{ fontSize: "3rem", color: "#4389f2" }}
                ></i>
              </div>

              <h3 className="fw-bold mb-4">إدارة الكليات</h3>

              <div className="d-grid gap-3">
                <button className="btn btn-success rounded-pill">
                  إضافة كلية
                </button>

                <button className="btn btn-warning text-white rounded-pill">
                  تعديل كلية
                </button>

                <button className="btn btn-danger rounded-pill">
                  حذف كلية
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* إدارة التخصصات */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100 rounded-4">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <i
                  className="bi bi-mortarboard"
                  style={{ fontSize: "3rem", color: "#6610f2" }}
                ></i>
              </div>

              <h3 className="fw-bold mb-4">إدارة التخصصات</h3>

              <div className="d-grid gap-3">
                <button className="btn btn-success rounded-pill">
                  إضافة تخصص
                </button>

                <button className="btn btn-warning text-white rounded-pill">
                  تعديل تخصص
                </button>

                <button className="btn btn-danger rounded-pill">
                  حذف تخصص
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* إدارة الخبراء */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100 rounded-4">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <i
                  className="bi bi-people-fill"
                  style={{ fontSize: "3rem", color: "#198754" }}
                ></i>
              </div>

              <h3 className="fw-bold mb-4">إدارة الخبراء</h3>

              <div className="d-grid gap-3">
                <button className="btn btn-success rounded-pill">
                  إضافة خبير
                </button>

                <button className="btn btn-warning text-white rounded-pill">
                  تعديل خبير
                </button>

                <button className="btn btn-danger rounded-pill">
                  حذف خبير
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
