import "./About.css";
import aboutImg from "./imges/img8.png";
import heroBg from "../../background-img/img3.png";
import { Link, useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const studentID = savedUser?.id || savedUser?.studentID;
  
  const handleNav = async () => {
    if (!studentID) {
      alert("لازم تسجل دخول كطالب أولاً");
      navigate('/login')
      return;
    }
    navigate('/quiz')
  }
  return (
    <section
      className="about-page py-5"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div className="about-hero">
          <div className="about-hero-content">
            <div className="about-badge">BOUSALTY</div>
            <h1 className="about-title">من نحن</h1>
            <p className="about-text">
              <strong>بوصلتي</strong> منصة ذكية تساعد الطلبة على اكتشاف
              التخصصات الجامعية المناسبة لهم بناءً على شخصياتهم وميولهم
              وقدراتهم، لتسهيل اتخاذ القرار الأكاديمي والمهني بطريقة أوضح
              وأكثر ثقة.
            </p>
            <p className="about-subtext">
              نؤمن أن لكل طالب طريقًا مميزًا، ومهمتنا أن نساعده في العثور على
              هذا الطريق بخطوات بسيطة وتجربة حديثة وسهلة.
            </p>
          </div>

          <div className="about-hero-image">
            <img src={aboutImg} alt="Bousalty" />
          </div>
        </div>

        <div className="about-cards mt-5">
          <div className="about-card">
            <div className="about-icon">🎯</div>
            <h3>رؤيتنا</h3>
            <p>
              أن نكون الدليل الأول للطلبة في اختيار تخصصاتهم الأكاديمية بما
              يتوافق مع مهاراتهم وأهدافهم المستقبلية.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">💡</div>
            <h3>رسالتنا</h3>
            <p>
              تقديم تجربة ذكية وسهلة تساعد الطلبة على فهم أنفسهم واتخاذ قرارات
              أكاديمية صحيحة مبنية على التحليل والتوجيه.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🚀</div>
            <h3>هدفنا</h3>
            <p>
              تقليل الحيرة لدى الطلبة وربطهم بالتخصصات المناسبة لهم بطريقة
              حديثة وعملية.
            </p>
          </div>
        </div>

        <div className="about-section mt-5">
          <h2 className="section-title">لماذا بوصلتي؟</h2>
          <div className="about-features">
            <div className="feature-box">
              <span>✔</span>
              <p>تحليل مبسط وواضح للشخصية والميول.</p>
            </div>
            <div className="feature-box">
              <span>✔</span>
              <p>اقتراح تخصصات مناسبة بشكل ذكي.</p>
            </div>
            <div className="feature-box">
              <span>✔</span>
              <p>واجهة سهلة وحديثة تناسب الطلبة.</p>
            </div>
            <div className="feature-box">
              <span>✔</span>
              <p>دعم اتخاذ القرار الأكاديمي بثقة.</p>
            </div>
          </div>
        </div>

        <div className="about-footer-box mt-5">
          <h2>ابدأ رحلتك معنا</h2>
          <p>
            دع <strong>بوصلتي</strong> يساعدك في اكتشاف التخصص الذي يناسبك،
            وابدأ مستقبلك بخطوة واثقة.
          </p>
          <button onClick={handleNav} className="about-btn">ابدأ الآن</button>
        </div>
      </div>
    </section>
  );
}