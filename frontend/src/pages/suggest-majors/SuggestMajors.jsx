import { useEffect, useState } from "react";
import "./SuggestMajors.css";
import heroBg from "../../background-img/img3.png";
import img1 from "./imges/img2.png";
import { Link } from "react-router-dom";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

export default function SuggestMajors() {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  const fetchAIRecommendations = async () => {
    try {
      const submissionID = localStorage.getItem("submissionID");

      if (!submissionID) {
        setMessage("لا يوجد تحليل محفوظ، الرجاء تعبئة الاختبار أولًا");
        setMessageType("danger");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/ai/analyze/${submissionID}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "حدث خطأ أثناء تحليل التخصصات");
        setMessageType("danger");
        setLoading(false);
        return;
      }

      setMajors((data.recommendations || []).slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage("حدث خطأ أثناء الاتصال بالسيرفر");
      setMessageType("danger");
      setLoading(false);
    }
  };

  const addToFavorite = async (major) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const studentID = user?.studentID || user?.id;

      if (!studentID) {
        setMessage("يجب تسجيل الدخول أولًا");
        setMessageType("danger");
        return;
      }

      if (!major.majorID) {
        setMessage("لا يمكن حفظ هذا التخصص");
        setMessageType("danger");
        return;
      }

      const res = await fetch(
        `${API_URL}/students/${studentID}/add-saved-major`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ majorID: major.majorID }),
        }
      );

      const data = await res.json();

      if (res.status === 409) {
        setMessage("هذا التخصص محفوظ مسبقًا");
        setMessageType("danger");
        return;
      }

      if (!res.ok) {
        setMessage(data.error || data.message || "حدث خطأ أثناء الحفظ");
        setMessageType("danger");
        return;
      }

      setMessage("تمت الإضافة إلى المفضلة");
      setMessageType("success");
    } catch (error) {
      console.log(error);
      setMessage("حدث خطأ أثناء الحفظ");
      setMessageType("danger");
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
                  هذه النتائج مبنية على تحليل إجاباتك في الاختبار.
                </li>
                <li>
                  <span className="sm-bullet">◆</span>
                  تم اختيار أفضل 3 تخصصات مناسبة لك بواسطة الذكاء الاصطناعي.
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
          <p className={`text-center fw-bold text-${messageType}`}>
            {message}
          </p>
        )}

        {loading && (
          <p className="text-center fw-bold">جاري تحليل التخصصات...</p>
        )}

        <div className="row g-4">
          {majors.map((major) => (
            <div className="col-md-4" key={major.majorID}>
              <div className="sm-card h-100 position-relative text-center">
                <span className="sm-badge">
                  {major.acceptanceGrade || "AI"}
                </span>

                <div className="sm-card-topline" />

                <div className="d-flex flex-column align-items-center p-4 pt-5">
                  <div className="sm-card-emoji mb-3">🎓</div>

                  <h5 className="sm-card-title mb-2">
                    {major.majorName}
                  </h5>

                  <p className="sm-card-desc flex-grow-1">
                    {major.description || "تخصص مناسب بناءً على إجاباتك في الاختبار."}
                  </p>

                  <div className="text-end bg-light rounded-3 p-3 mt-3 w-100">
                    <h6 className="fw-bold mb-2">
                      لماذا هذا التخصص مناسب لك؟
                    </h6>
                    <p className="mb-0 small text-muted">
                      {major.reason || "تم اختياره بناءً على تحليل إجاباتك."}
                    </p>
                  </div>

                  {major.isExternal ? (
                    <a
                      href={major.link}
                      target="_blank"
                      rel="noreferrer"
                      className="sm-card-btn w-100 mt-3"
                    >
                      زيارة الرابط
                    </a>
                  ) : (
                    <Link
                      to={`/majors/${major.majorID}`}
                      className="sm-card-btn w-100 mt-3"
                      onClick={() => setSelectedMajor(major)}
                    >
                      عرض التفاصيل
                    </Link>
                  )}

                  {!major.isExternal && (
                    <button
                      className="btn btn-outline-primary mt-3"
                      style={{ width: "100%" }}
                      onClick={() => addToFavorite(major)}
                    >
                      إضافة الى التخصصات المحفوظة
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedMajor && (
        <div
          className="sm-overlay d-flex align-items-center justify-content-center"
          onClick={() => setSelectedMajor(null)}
        >
          <div
            className="sm-modal position-relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm-modal-topbar" />

            <div className="p-4">
              <button
                className="sm-modal-close position-absolute"
                onClick={() => setSelectedMajor(null)}
              >
                ✕
              </button>

              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="sm-modal-emoji">🎓</span>
                <div>
                  <h4 className="sm-modal-title mb-1">
                    {selectedMajor.majorName}
                  </h4>
                  <span className="sm-modal-match-badge">
                    AI Recommendation
                  </span>
                </div>
              </div>

              <div className="sm-gold-divider mb-4" />

              <div className="mb-3">
                <h6 className="sm-modal-label mb-2">
                  ⭐ لماذا هذا التخصص مناسب لك؟
                </h6>
                <p className="sm-modal-text">
                  {selectedMajor.reason || "تم اختياره بناءً على إجاباتك."}
                </p>
              </div>

              <div className="mb-3">
                <h6 className="sm-modal-label mb-2">📋 عن التخصص</h6>
                <p className="sm-modal-text">
                  {selectedMajor.description || "لا يوجد وصف متوفر حاليًا."}
                </p>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="sm-info-box">
                    <span>📊 معدل القبول</span>
                    <strong>{selectedMajor.acceptanceGrade || "غير محدد"}</strong>
                  </div>
                </div>

                <div className="col-6">
                  <div className="sm-info-box">
                    <span>💳 الساعات</span>
                    <strong>{selectedMajor.creditHours || "غير محدد"}</strong>
                  </div>
                </div>
              </div>

              <button
                className="sm-modal-close-btn w-100"
                onClick={() => setSelectedMajor(null)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}