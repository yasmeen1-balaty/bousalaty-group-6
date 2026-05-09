import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Major.css';

const MajorDetails = () => {
  return (
    <Container className="pb-5 pt-5">

      <div className="card w-100 mb-3 mt-3">
        <div className="card-body">
          <div className="HC mb-3">
            <span
              className="badge text-bg-primary"
              style={{ fontSize: '20px', fontWeight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              85.5% - 98.5%
            </span>

            <h5
              className="card-title"
              style={{ fontSize: '30px', fontWeight: 'bold' }}
            >
              علوم الحاسوب 💻
            </h5>
          </div>

          <p className="card-text">
            تخصص علوم الحاسوب يركز على تصميم وتطوير البرمجيات، فهم الخوارزميات، وهندسة النظم. يمنحك المهارات لبناء تطبيقات وحلول تقنية مبتكرة تخدم مختلف المجالات. يعد هذا التخصص من أكثر التخصصات طلباً في سوق العمل المحلي والعالمي.
          </p>
        </div>
      </div>

      <div className="row g-3">

        <div className="col-sm-6">
          <div className="card h-100">
            <div className="card-body C5">
              <h5 className="card-title pb-3">معدل القبول 🎓</h5>
              <p className="card-text grade pt-2 pb-5">
                <span className="badge rounded-pill text-black">
                  85.5% - 98.5%
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card h-100">
            <div className="card-body C4">
              <h5 className="card-title">عدد وسعر ساعات التخصص ⏳</h5>
              <p className="card-text">
                <ul>
                  <li>عدد الساعات: 132 ساعة</li>
                  <li>سعر الساعة: 45 دينار</li>
                </ul>
              </p>
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