import { useState } from "react";

import "./SuggestMajors.css";
import heroBg from "../../background-img/img3.png";
import img1 from "./imges/img2.png";
import { Link } from "react-router-dom";


const majors = [
  {
    id: 1,
    title: "علوم الحاسوب",
    match: 87,
    emoji: "🖥️",
    about: "يُعنى هذا التخصص بتصميم وتطوير البرمجيات وتحليل البيانات وبناء الأنظمة الذكية والشبكات.",
    skills: ["التفكير المنطقي", "حل المشكلات", "البرمجة", "الرياضيات", "الإبداع التقني"],
    jobs: ["مطور برمجيات", "محلل بيانات", "مهندس ذكاء اصطناعي", "أمن المعلومات", "مدير أنظمة"],
    duration: "4 سنوات",
    salary: "3,000 - 8,000 شيكل شهرياً",
    desc: "مجال مناسب لمن يحب التقنية وتحليل المشاكل وتطوير البرمجيات والأنظمة.",
  },
  {
    id: 2,
    title: "إدارة أعمال",
    match: 82,
    emoji: "📊",
    about: "يُركز على تطوير مهارات القيادة والتخطيط الاستراتيجي وإدارة الموارد البشرية والمالية.",
    skills: ["القيادة", "التواصل", "التحليل المالي", "التفاوض", "إدارة الوقت"],
    jobs: ["مدير تنفيذي", "محلل أعمال", "مستشار إداري", "رائد أعمال", "مدير مشاريع"],
    duration: "4 سنوات",
    salary: "2,000 - 6,000 شيكل شهرياً",
    desc: "تخصص يجمع بين التخطيط والتنفيذ لمن يحب قيادة الفرق وبناء الأعمال.",
  },
  {
    id: 3,
    title: "تمريض",
    match: 78,
    emoji: "🩺",
    about: "يجمع بين العلوم الطبية والرعاية الإنسانية لتقديم الدعم الصحي للمرضى في مختلف البيئات الطبية.",
    skills: ["التعاطف", "الدقة", "العمل تحت الضغط", "التواصل", "المعرفة الطبية"],
    jobs: ["ممرض مستشفى", "ممرض طوارئ", "ممرض منزلي", "مشرف تمريض", "معلم صحي"],
    duration: "4 سنوات",
    salary: "3,000 - 5,000 شيكل شهرياً",
    desc: "إذا كنت تهتم بمساعدة الآخرين وتحب مجال الرعاية الصحية فهذا هو تخصصك.",
  },
  {
    id: 4,
    title: "هندسه الحاسوب",
    match: 90,
    emoji: "🖥️",
  about: "يُعنى هذا التخصص بتصميم وتطوير البرمجيات وتحليل البيانات وبناء الأنظمة الذكية والشبكات.",
    skills: ["التفكير المنطقي", "حل المشكلات", "البرمجة", "الرياضيات", "الإبداع التقني"],
    jobs: ["مطور برمجيات", "محلل بيانات", "مهندس ذكاء اصطناعي", "أمن المعلومات", "مدير أنظمة"],
    duration: "5 سنوات",
    salary: "5,000 - 8,000 شيكل شهرياً",
    desc: "مجال مناسب لمن يحب التقنية وتحليل المشاكل وتطوير البرمجيات والأنظمة.",
  },
];

export default function SuggestMajors() {
  const [selectedMajor, setSelectedMajor] = useState(null);

  function addToFavorite(item) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find((fav) => fav.id === item.id);

    if (!exists) {
      favorites.push(item);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("تمت الإضافة إلى المفضلة");
    } else {
      alert("هذا التخصص موجود مسبقًا في المفضلة");
    }
  }


  return (
    <div dir="rtl" className="sm-wrapper">

     


      <section className="sm-hero text-center py-5 px-4"  style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>

        <h1 className="sm-hero-title mb-2">أفضل تخصصات تناسب شخصيتك</h1>
        <div className="sm-gold-divider mx-auto mb-3" />
        <p className="sm-subtitle mb-5">تحليل ميولك ومهاراتك · اقتراح التخصصات المناسبة لك</p>

        {/* Feature Card */}
        <div className="sm-feature-card mx-auto p-4">
          <div className="d-flex align-items-center gap-4">
            <div className="flex-grow-1 text-end">
              <h5 className="sm-feature-title mb-3">اختصاصك الذكي</h5>
              <ul className="list-unstyled sm-feature-list mb-0">
                <li>
                  <span className="sm-bullet">◆</span>
                  حل مناسب لمهاراتك وميولك المستقبلية بخطوات رئيسية واضحة. </li>
                <li>
                  <span className="sm-bullet">◆</span>
                     بفضل هذه الأدوات ستتمكن من حل مشكلاتك المهنية. </li>
              </ul>
            </div>
            <div className="sm-feature-icon flex-shrink-0" ><img src={img1} alt="" style={{height: "162px"}} /></div>
          </div>
        </div>
      </section>

      
      <section className="container py-5" >
        <div className="text-center mb-5">
          <h2 className="sm-section-title mb-2">التخصصات التي تناسب شخصيتك : </h2>
          <div className="sm-gold-divider mx-auto" />
        </div>

        <div className="row g-4">
          {majors.map((major) => (
            <div className="col-md-3" key={major.id}>
              <div className="sm-card h-100 position-relative text-center">

                <span className="sm-badge">{major.match}%</span>

                <div className="sm-card-topline" />

                <div className="d-flex flex-column align-items-center p-4 pt-5">
                  <div className="sm-card-emoji mb-3">{major.emoji}</div>
                  <h5 className="sm-card-title mb-2">{major.title}</h5>
                  <p className="sm-card-desc flex-grow-1">{major.desc}</p>
                  <Link to={"/details"} className="sm-card-btn w-100 mt-3" onClick={() => setSelectedMajor(major)}>
                    عرض التفاصيل
                  </Link>
                  <button
                    className="btn btn-outline-primary mt-3"
                    style={{ width: "100%" }}
                    onClick={() => addToFavorite(majors)}
                  >
                    اضافة الى التخصصات المحفوظة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    
      

      {/* ===== MODAL ===== */}
      {selectedMajor && (
        <div
          className="sm-overlay d-flex align-items-center justify-content-center"
          onClick={() => setSelectedMajor(null)}
        >
          <div
            className="sm-modal position-relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold top bar */}
            <div className="sm-modal-topbar" />

            <div className="p-4">
              <button className="sm-modal-close position-absolute" onClick={() => setSelectedMajor(null)}>
                ✕
              </button>

              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="sm-modal-emoji">{selectedMajor.emoji}</span>
                <div>
                  <h4 className="sm-modal-title mb-1">{selectedMajor.title}</h4>
                  <span className="sm-modal-match-badge">{selectedMajor.match}% تطابق</span>
                </div>
              </div>

              <div className="sm-gold-divider mb-4" />

              <div className="mb-3">
                <h6 className="sm-modal-label mb-2">📋 عن التخصص</h6>
                <p className="sm-modal-text">{selectedMajor.about}</p>
              </div>

              <div className="mb-3">
                <h6 className="sm-modal-label mb-2">✦ المهارات المطلوبة</h6>
                <div className="d-flex flex-wrap gap-2">
                  {selectedMajor.skills.map((s, i) => (
                    <span key={i} className="sm-tag">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <h6 className="sm-modal-label mb-2">🎓 فرص العمل</h6>
                <div className="d-flex flex-wrap gap-2">
                  {selectedMajor.jobs.map((j, i) => (
                    <span key={i} className="sm-tag">{j}</span>
                  ))}
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="sm-info-box">
                    <span>⏱️ مدة الدراسة</span>
                    <strong>{selectedMajor.duration}</strong>
                  </div>
                </div>
                <div className="col-6">
                  <div className="sm-info-box">
                    <span>💰 متوسط الراتب</span>
                    <strong>{selectedMajor.salary}</strong>
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