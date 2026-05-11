import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Major.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const MajorDetails = () => {
  const [major, setMajor] = useState(null);
  const { majorID } = useParams();

  const [skills, setSkills] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/majors/${majorID}`)
      .then((res) => res.json())
      .then((data) => {
        setMajor(data);
      });

    fetch(`http://localhost:3001/majors/${majorID}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.skills || []);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
      });

    fetch(`http://localhost:3001/majors/${majorID}/opportunities`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched opportunities:', data.jobOpportuneties);
        setOpportunities(data.jobOpportuneties || []);
      })
      .catch((error) => {
        console.error('Error fetching opportunities:', error);
      });
  }, [majorID]);

  if (!major) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="pb-5 pt-5">

      <div className="card w-100 mb-3 mt-3">
        <div className="card-body ms-5 me-5">
          <div className="HC mb-3">

            <h5 className="card-title" style={{ fontSize: '30px', fontWeight: 'bold' }} >
              {major?.majorName}
            </h5>
          </div>

          <h4 className="card-title">
            المهارات المكتسبة
          </h4>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                {skill.skill}
              </li>
            ))}
          </ul>

          <h4 className="card-title">
            فرص العمل 💼
          </h4>
          <ul>
            {opportunities.map((job, index) => (
              <li key={index}>
                {job.opportunity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row g-3">

        <div className="col-sm-6">
          <div className="card h-100">
            <div className="card-body C5">
              <h5 className="card-title pb-3">معدل القبول 🎓</h5>
              <p className="card-text grade pt-2 pb-5">
                <span className="badge rounded-pill text-black">
                  {major?.acceptanceGrade}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card h-100">
            <div className="card-body C4">
              <h5 className="card-title">عدد وسعر ساعات التخصص ⏳</h5>
              <div className="card-text">
                <ul>
                  <li>عدد الساعات: {major?.creditHours} ساعة</li>
                  <li>سعر الساعة: {major?.costPerHour} دينار</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card h-100">
            <div className="card-body C2">
              <h5 className="card-title">المواد الاساسية 📚</h5>
              <p className="card-text">
                للاطلاع على خطة التخصص والمواد الاساسية اضغط على زر عرض التفاصيل.
              </p>
              <div className="mt-3">
                <button className="btn btn-primary">عرض تفاصيل</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card h-100">
            <div className="card-body C3">
              <h5 className="card-title">تواصل مع خبير 🗣️</h5>
              <p className="card-text ">
                تواصل مع خبرائنا للحصول على استشارة والإجابة على استفساراتك.
              </p>
              <div className="mt-3">
                <button className="btn btn-primary">تواصل الآن</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </Container>
  );
};

export default MajorDetails;