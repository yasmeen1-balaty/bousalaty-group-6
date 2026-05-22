import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";

const API_URL = "https://bousalaty-group-6-ixn3.onrender.com";

const AuthPage = ({ login }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const [focusedInputs, setFocusedInputs] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleFocus = (inputName) => {
    setFocusedInputs((prev) => ({
      ...prev,
      [inputName]: true,
    }));
  };

  const handleBlur = (inputName) => {
    setFocusedInputs((prev) => ({
      ...prev,
      [inputName]: false,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required";
      }

      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        await handleAuth();

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          remember: false,
        });
      } catch (error) {
        console.log(error);
        alert("Error occurred. Please try again.");
      }
    }

    setIsSubmitting(false);
  };

  const toggleForm = (e) => {
    if (e) e.preventDefault();
    setIsLogin((prev) => !prev);
    setErrors({});
    setMessage("");
  };

  const handleAuth = async () => {
    setMessage("");

    const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }),
    });

    const data = await response.json();

    if (data.token) {
      setMessageType("success");
      setMessage(data.message || "Success");

      localStorage.setItem("token", data.token);

      const userData = data.user || data.student;

      login(userData);

      localStorage.setItem("user", JSON.stringify(userData));

      if (userData?.role === "admin") {
        navigate("/admin-panel");
      } else {
        navigate("/about");
      }
    } else {
      setMessageType("danger");
      setMessage(data.message || "Invalid email or password");
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="auth-container">
      <div className="split-screen">
        <div className="left-panel">
          <i className="bi bi-person-badge logo-icon"></i>

          <h1>Bousalaty</h1>

          <p>
            Welcome to your educational journey.
            <br />
            Discover majors and build your future.
          </p>
        </div>

        <div className="right-panel">
          <div className="form-card">
            <div className="form-switcher text text-center">
              <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

              <p className="text-secondary mb-4">
                {isLogin
                  ? "Please sign in to your account"
                  : "Join us today and start your journey"}
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {!isLogin && (
                <div className="form-floating form-content show">
                  <i
                    className={`bi bi-person input-icon ${
                      focusedInputs.name ? "focused" : ""
                    }`}
                  ></i>

                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    required
                  />

                  <label htmlFor="name">Full Name</label>

                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>
              )}

              <div className="form-floating form-content show">
                <i
                  className={`bi bi-envelope input-icon ${
                    focusedInputs.email ? "focused" : ""
                  }`}
                ></i>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  required
                />

                <label htmlFor="email">Email address</label>

                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-floating form-content show">
                <i
                  className={`bi bi-lock input-icon ${
                    focusedInputs.password ? "focused" : ""
                  }`}
                ></i>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  required
                />

                <label htmlFor="password">Password</label>

                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {!isLogin && (
                <div className="form-floating form-content show">
                  <i
                    className={`bi bi-lock-fill input-icon ${
                      focusedInputs.confirmPassword ? "focused" : ""
                    }`}
                  ></i>

                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    required
                  />

                  <label htmlFor="confirmPassword">Confirm Password</label>

                  {errors.confirmPassword && (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                  />

                  <label className="form-check-label" htmlFor="remember">
                    Remember me
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary mb-4 mt-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>

              {message && (
                <div
                  className={`alert alert-${messageType} text-center mt-3`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-link link-secondary text-decoration-none"
                  onClick={toggleForm}
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>

                <br />

                <button
                  type="button"
                  className="btn btn-link link-secondary text-decoration-none"
                  onClick={() => navigate("/adminLogin")}
                >
                  Continue as Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;