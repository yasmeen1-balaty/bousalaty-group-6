import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./SuggestMajors.css";
import heroBg from "../../background-img/img3.png";
import img1 from "./imges/img2.png";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

export default function SuggestMajors() {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMajors();
  }, []);

  const fetchMajors = async () => {
    try {
      const res = await fetch(`${API_URL}/majors`);
      const data = await res.json();

      if (!res.ok) {
        setMessage("حدث خطأ أثناء تحميل التخصصات");
        return;
      }

      setMajors(data);
    } catch (error) {
      console.log(error);
      setMessage("حدث خطأ أثناء الاتصال بالسيرفر");
    }
  };

  const addToFavorite = async (majorID) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setMessage("يجب تسجيل الدخول أولًا");
        return;
      }

      const studentID = user.studentID || user.id;

      const res = await fetch(
        `${API_URL}/students/${studentID}/add-saved-major`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ majorID }),
        }
      );

      const data = await res.json();

      if (res.status === 409) {
        setMessage("هذا التخصص محفوظ مسبقًا");
        return;
      }

      if (!res.ok) {
        setMessage(data.message || "حدث خطأ أثناء الحفظ");
        return;
      }

      setMessage("تمت الإضافة للمفضلة");
    } catch (error) {
      console.log(error);
      setMessage("حدث خطأ أثناء الاتصال بالسيرفر");
    }
  };

  return (
    <div dir="rtl" className="sm-wrapper">
      <section
        className="sm-hero text-center py-5 px-4"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="sm-hero-title mb-2">أفضل تخصصات تناسب شخصيتك</h1>
        <div className="sm-gold-divider mx-auto mb-3" />
        <p className="sm-subtitle mb-5">
          تحليل ميولك ومهاراتك · اقتراح التخصصات المناسبة لك
        </p>

        <div className="sm-feature-card mx-auto p-4">
          <div className="d-flex align-items-center gap-4">
            <div className="flex-grow-1 text-end">
              <h5 className="sm-feature-title mb-3">اختصاصك الذكي</h5>
              <ul className="list-unstyled sm-feature-list mb-0">
                <li>
                  <span className="sm-bullet">◆</span>
                  حل مناسب لمهاراتك وميولك المستقبلية بخطوات رئيسية واضحة.
                </li>
                <li>
                  <span className="sm-bullet">◆</span>
                  بفضل هذه الأدوات ستتمكن من حل مشكلاتك المهنية.
                </li>
              </ul>
            </div>

            <div className="sm-feature-icon flex-shrink-0">
              <img src={img1} alt="" style={{ height: "162px" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="sm-section-title mb-2">
            التخصصات التي تناسب شخصيتك :
          </h2>
          <div className="sm-gold-divider mx-auto" />
        </div>

        {message && (
          <p className="text-center fw-bold text-success">{message}</p>
        )}

        <div className="row g-4">
          {majors.map((major) => (
            <div className="col-md-3" key={major.majorID}>
              <div className="sm-card h-100 position-relative text-center">
                <span className="sm-badge">
                  {major.match || major.acceptanceGrade || 65}%
                </span>

                <div className="sm-card-topline" />

                <div className="d-flex flex-column align-items-center p-4 pt-5">
                  <div className="sm-card-emoji mb-3">🎓</div>

                  <h5 className="sm-card-title mb-2">
                    {major.majorName}
                  </h5>

                  <p className="sm-card-desc flex-grow-1">
                    {major.description || "تخصص مناسب حسب معدلك وميولك."}
                  </p>

                  <Link
                    to={`/majors/${major.majorID}`}
                    className="sm-card-btn w-100 mt-3"
                  >
                    عرض التفاصيل
                  </Link>

                  <button
                    className="btn btn-outline-primary mt-3"
                    style={{ width: "100%" }}
                    onClick={() => addToFavorite(major.majorID)}
                  >
                    إضافة إلى التخصصات المحفوظة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}