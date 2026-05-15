import React, { useEffect, useState } from 'react';
import "./SuggestMajors.css";
import heroBg from "../../background-img/img3.png";
import img1 from "./imges/img2.png";
import { Link, useLocation } from "react-router-dom";

export default function SuggestMajors() {
  const location = useLocation();

  const [recommendations, setRecommendations] = useState(location.state?.recommendations || []);
  const [loading, setLoading] = useState(!location.state?.recommendations);

  const [savedMajors, setSavedMajors] = useState([]);
  const [saveMessages, setSaveMessages] = useState({});

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const studentID = savedUser?.studentID || savedUser?.id || savedUser?.userID;

  useEffect(() => {
    if (!location.state?.recommendations) {
      if (!studentID) {
        setLoading(false);
        return;
      }

      fetch(`http://localhost:3001/submissions/student/${studentID}/latest`)
        .then(res => res.json())
        .then(data => {
          if (data.aiResult) {
            setRecommendations(data.aiResult);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const handleSaveMajor = async (majorID) => {
    try {
      const res = await fetch(
        `http://localhost:3001/students/${studentID}/add-saved-major`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentID, majorID })
        }
      );

      // ⚠️ already exists (409)
      if (res.status === 409) {
        setSaveMessages(prev => ({
          ...prev,
          [majorID]: { text: "هذا التخصص محفوظ مسبقاً", type: "error" }
        }));
        
    setTimeout(() => {
      setSaveMessages('');
    }, 3000);
        return;
      }

      if (res.ok) {
        setSavedMajors(prev => [...prev, majorID]);

        setSaveMessages(prev => ({
          ...prev,
          [majorID]: { text: "تم حفظ التخصص بنجاح", type: "success" }
        }));
        
    setTimeout(() => {
      setSaveMessages('');
    }, 3000);

      } else {
        setSaveMessages(prev => ({
          ...prev,
          [majorID]: { text: "حدث خطأ أثناء الحفظ", type: "error" }
        }));
      }

    } catch (error) {
      setSaveMessages(prev => ({
        ...prev,
        [majorID]: { text: "خطأ في الاتصال بالسيرفر", type: "error" }
      }));
    }
  };

  if (loading) return <p className="text-center mt-5">جاري التحميل...</p>;

  return (
    <div dir="rtl" className="sm-wrapper">

      <section className="sm-hero text-center py-5 px-4" style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
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
                <li>◆ حل مناسب لمهاراتك وميولك المستقبلية.</li>
                <li>◆ يساعدك في اختيار مسارك المهني.</li>
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
            التخصصات التي تناسب شخصيتك:
          </h2>
          <div className="sm-gold-divider mx-auto" />
        </div>

        {recommendations.length === 0 ? (
          <p className="text-center">لا توجد توصيات، يرجى إعادة الاختبار.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {recommendations.map((major, index) => (
              <div className="col-md-4" key={index}>
                <div className="sm-card h-100 text-center position-relative">

                  <span className="sm-badge">
                    {major.acceptanceGrade}%
                  </span>

                  <div className="sm-card-topline" />

                  <div className="d-flex flex-column align-items-center p-4 pt-5">

                    <h5 className="sm-card-title mb-2">
                      {major.majorName}
                    </h5>

                    <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                      {major.reason}
                    </p>

                    <Link  to={`/majors/${major.majorID}`} className="sm-card-btn w-100 mt-2" >
                      عرض التفاصيل
                    </Link>

                    <button
                      className="sm-card-btn w-100 mt-2"
                      onClick={() => handleSaveMajor(major.majorID)}
                      disabled={savedMajors.includes(major.majorID)}
                    >
                      {savedMajors.includes(major.majorID)
                        ? "تم الحفظ"
                        : "إضافة للمفضلة "}
                    </button>

                    {saveMessages[major.majorID] && (
                      <small
                        className="d-block mt-2 text-center"
                        style={{
                          color:
                            saveMessages[major.majorID].type === "success" ? "green" : "red",
                          fontWeight: "bold"
                        }}
                      >
                        {saveMessages[major.majorID].text}
                      </small>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}