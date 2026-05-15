import React, { useEffect, useState } from 'react';
import "./SuggestMajors.css";
import heroBg from "../../background-img/img3.png";
import img1 from "./imges/img2.png";
import { Link, useLocation } from "react-router-dom";

export default function SuggestMajors() {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState(location.state?.recommendations || []);
  const [loading, setLoading] = useState(!location.state?.recommendations);

  useEffect(() => {
    // لو ما في state، جيبي آخر submission من الـ DB
    if (!location.state?.recommendations) {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      const studentID = savedUser?.studentID || savedUser?.id || savedUser?.userID;

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
        <p className="sm-subtitle mb-5">تحليل ميولك ومهاراتك · اقتراح التخصصات المناسبة لك</p>

        <div className="sm-feature-card mx-auto p-4">
          <div className="d-flex align-items-center gap-4">
            <div className="flex-grow-1 text-end">
              <h5 className="sm-feature-title mb-3">اختصاصك الذكي</h5>
              <ul className="list-unstyled sm-feature-list mb-0">
                <li><span className="sm-bullet">◆</span> حل مناسب لمهاراتك وميولك المستقبلية بخطوات رئيسية واضحة.</li>
                <li><span className="sm-bullet">◆</span> بفضل هذه الأدوات ستتمكن من حل مشكلاتك المهنية.</li>
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
          <h2 className="sm-section-title mb-2">التخصصات التي تناسب شخصيتك:</h2>
          <div className="sm-gold-divider mx-auto" />
        </div>

        {recommendations.length === 0 ? (
          <p className="text-center">لا توجد توصيات، يرجى إعادة الاختبار.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {recommendations.map((major, index) => (
              <div className="col-md-4" key={index}>
                <div className="sm-card h-100 position-relative text-center">
                  <span className="sm-badge">{major.acceptanceGrade}%</span>
                  <div className="sm-card-topline" />
                  <div className="d-flex flex-column align-items-center p-4 pt-5">
                    <h5 className="sm-card-title mb-2">{major.majorName}</h5>
                    <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
                      {major.reason}
                    </p>
                    <Link to={`/majors/${major.majorID}`} className="sm-card-btn w-100 mt-3">
                      عرض التفاصيل
                    </Link>
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