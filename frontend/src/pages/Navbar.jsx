import "./Navbar.css";
import { Offcanvas } from "./student-dashboard/offcanvas";
import img2 from "./suggest-majors/imges/img8.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, logout }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <nav className="sm-navbar navbar px-3 px-md-5">
        <div className="sm-navbar-left d-flex align-items-center gap-2">
          <img src={img2} alt="Bousalty Logo" className="sm-navbar-logo" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="sm-navbar navbar px-3 px-md-5">

      <div className="sm-navbar-left d-flex align-items-center gap-2">
        <img src={img2} alt="Bousalty Logo" className="sm-navbar-logo" />
      </div>

      <div className="sm-navbar-right d-flex align-items-center gap-4">

        <Link to="/" className="sm-nav-link">
          الصفحة الرئيسية
        </Link>


        {user?.role === "student" && (
          <>
          <Link to="/my-attempts" className="sm-nav-link">
            محاولاتي
          </Link>
          <Link to="/quiz" className="sm-nav-link">
          ابدأ الاختبار
        </Link>
        </>
        )}

        <Link to="/about" className="sm-nav-link">
          من نحن
        </Link>

        <button
          onClick={handleLogout}
          className="sm-nav-link"
          style={{ background: "none", border: "none" }}
        >
          تسجيل الخروج
        </button>

        <Offcanvas />

      </div>

    </nav>
  );
}