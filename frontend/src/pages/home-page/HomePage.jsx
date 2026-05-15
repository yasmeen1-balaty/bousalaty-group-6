import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from "./image/hero-bg.jpeg";

const HomePage = () => {
    const navigate = useNavigate();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const studentID = savedUser?.id || savedUser?.studentID;
    const features = [
        {
            icon: 'fas fa-brain',
            title: 'تحليل تخصص فوري',
            desc: 'تحليل من الحاسوب وتحليل مهاراتك'
        },
        {
            icon: 'fas fa-list-check',
            title: 'اقتراح تخصصات مخصصة',
            desc: 'نحن نخضع تحليلاتك'
        },
        {
            icon: 'fas fa-chart-line',
            title: 'محاكاة مستقبلية',
            desc: 'مناسب أكثر لمهاراتك الحاسوبية'
        }
    ];
    const handleNav = async () => {
        if (!studentID) {
            navigate('/login')
            return;
        }
        navigate('/quiz')
    }
    return (
        <>
            <section
                className="hero-bg d-flex align-items-center"
                style={{
                    backgroundImage: `url(${img1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    position: 'relative'
                }}
            >


                <div
                    style={{
                        position: 'absolute',
                        inset: 0,

                        zIndex: 1
                    }}
                ></div>


                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="row min-vh-100 align-items-center">

                        <div className="col-lg-6 text-start">
                            <h1
                                style={{
                                    fontSize: '56px',
                                    fontWeight: '800',
                                    color: '#1f2937',
                                    lineHeight: '1.3',
                                    position: "relative",
                                    right: " 612px",
                                }}
                            >
                                اكتشف تخصصك الذكي مع مساعدك AI
                            </h1>

                            <p
                                style={{
                                    fontSize: '25px',
                                    color: '#374151',
                                    marginTop: '20px',
                                    marginBottom: '30px',
                                    maxWidth: '500px',
                                    position: 'relative',
                                    right: "750px"
                                }}
                            >
                                تحليل ميولك ومهاراتك واقتراح أفضل تخصص لك
                            </p>

                            <button
                                onClick={handleNav}
                                style={{
                                    background: 'linear-gradient(90deg, #10b981, #059669)',
                                    color: '#fff',
                                    padding: '14px 30px',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    position: 'relative',
                                    right: "512px"
                                }}
                            >
                                🚀 ابدأ التحليل الذكي
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            <section className="feature-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-4">كيف يعمل الموقع؟</h2>
                    </div>
                    <div className="row g-4">
                        {features.map((f, i) => (
                            <div key={i} className="col-lg-4 col-md-6">
                                <div className="feature-card h-100 text-center">
                                    <div className="feature-icon">
                                        <i className={f.icon}></i>
                                    </div>
                                    <h4 className="fw-bold mb-3">{f.title}</h4>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="comparison-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-4">قارن بين التخصصات</h2>
                        <p className="lead text-muted">اكتشف الفرق والتوافق مع مهاراتك</p>
                    </div>
                    <div className="row align-items-stretch">
                        <div className="col-lg-5">
                            <div className="comparison-card h-100 text-center p-4">
                                <i className="fas fa-laptop-code fa-3x text-primary mb-4"></i>

                                <h3 className="fw-bold mb-3">علوم الحاسوب</h3>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>برمجة وتطوير</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>قواعد بيانات</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>شبكات</li>
                                </ul>
                                <div className="bg-primary text-white rounded-pill px-4 py-2 mx-auto" style={{ maxWidth: '200px' }}>
                                    توافق: 85%
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 d-flex align-items-center justify-content-center">
                            <div className="vs-container">
                                <div className="vs-badge">
                                    VS
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="comparison-card h-100 text-center p-4">


                                <i className="fas fa-robot fa-3x  text-success mb-4" style={{ content: "\f544" }}></i>
                                <h3 className="fw-bold mb-3">الذكاء الاصطناعي</h3>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>تعلم آلي</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>رؤية حاسوبية</li>
                                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>معالجة لغة</li>
                                </ul>
                                <div className="bg-success text-white rounded-pill px-4 py-2 mx-auto" style={{ maxWidth: '200px' }}>
                                    توافق: 92%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="cta-section text-center py-5">
                <div className="container">
                    <h2 className="display-4 fw-bold mb-4">جاهز لاكتشاف تخصصك؟</h2>
                    <button
                        onClick={handleNav}
                        className="btn-success-custom px-6"
                        style={{ border: "none" }}
                    >
                        <i className="fas fa-magic me-2"></i>ابدأ الآن مجاناً
                    </button>
                </div>
            </section>
        </>
    );
};

export default HomePage;