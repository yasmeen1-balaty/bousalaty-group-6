import React, { useEffect, useState } from 'react';

import "./SuggestMajors.css";
import heroBg from "../../background-img/img3.png";
import img1 from "./imges/img2.png";
import { Link } from "react-router-dom";




export default function SuggestMajors() {
  const [majors, setMajors] = useState([]);
  const [faculties , setfaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/majors")
      .then((res) => res.json())
      .then((data) => {
        console.log("Majors from backend:", data);
        setMajors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
        setLoading(false);
      });


       fetch("http://localhost:3001/faculties")
      .then((res) => res.json())
      .then((data) => {
        console.log("faculties from backend:", data);
        setfaculties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
        setLoading(false);
      });

  }, []);


if (loading) {
  return <p className="text-center mt-5">Loading...</p>;
}


  function addToFavorite(item) {
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
            <div className="col-md-3" key={major.majorID}>
              <div className="sm-card h-100 position-relative text-center">

                <span className="sm-badge">{major.acceptanceGrade}%</span>

                <div className="sm-card-topline" />

                <div className="d-flex flex-column align-items-center p-4 pt-5">
                  <div className="sm-card-emoji mb-3">emoje</div>
                  <h5 className="sm-card-title mb-2">{major.majorName}</h5>
                   {faculties.map((facultiy) => (
                   <h4 className="sm-card-desc flex-grow-1">{facultiy.facultyName} </h4>
                   ))}


                  <Link to={`/majors/${major.majorID}`} className="sm-card-btn w-100 mt-3" >
                    عرض التفاصيل
                  </Link>
                  <button
                    className="btn btn-outline-primary mt-3"
                    style={{ width: "100%" }}
                    onClick={() => addToFavorite(major)}
                  >
                    اضافة الى التخصصات المحفوظة
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



/** 
const majors = [
  {
    id: 1,
    majorName: "علوم الحاسوب",
    acceptanceGrade: 87,
    skills: ["التفكير المنطقي", "حل المشكلات", "البرمجة", "الرياضيات", "الإبداع التقني"],
    jobs: ["مطور برمجيات", "محلل بيانات", "مهندس ذكاء اصطناعي", "أمن المعلومات", "مدير أنظمة"],
 
  },
  {
    id: 2,
    majorName: "إدارة أعمال",
    acceptanceGrade: 82,
    skills: ["القيادة", "التواصل", "التحليل المالي", "التفاوض", "إدارة الوقت"],
    jobs: ["مدير تنفيذي", "محلل أعمال", "مستشار إداري", "رائد أعمال", "مدير مشاريع"],
  
  },
  {
    id: 3,
    majorName: "تمريض",
    acceptanceGrade: 78,
    skills: ["التعاطف", "الدقة", "العمل تحت الضغط", "التواصل", "المعرفة الطبية"],
    jobs: ["ممرض مستشفى", "ممرض طوارئ", "ممرض منزلي", "مشرف تمريض", "معلم صحي"],
   
  },
  {
    id: 4,
    majorName: "هندسه الحاسوب",
    acceptanceGrade: 90,
    skills: ["التفكير المنطقي", "حل المشكلات", "البرمجة", "الرياضيات", "الإبداع التقني"],
    jobs: ["مطور برمجيات", "محلل بيانات", "مهندس ذكاء اصطناعي", "أمن المعلومات", "مدير أنظمة"],
  
  },
];
*/