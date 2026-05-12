import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';

const AdminAuthPage = ({ login }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);
    const [focusedInputs, setFocusedInputs] = useState({});
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleFocus = (inputName) => {
        setFocusedInputs(prev => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        setFocusedInputs(prev => ({ ...prev, [inputName]: false }));
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAuth = async () => {
        setMessage('');

        const response = await fetch("http://localhost:3001/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.token) {
            setMessageType('danger');
            setMessage(data.message || 'Invalid email or password');
            setTimeout(() => setMessage(''), 3000);
            return false;
        }

        setMessageType('success');
        setMessage(data.message || 'Login successful');

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "admin");

        if (data.token) {
            const userData = {
                token: data.token,
                role: "admin"
            };

            localStorage.setItem("user", JSON.stringify(userData));

            login(userData);

            navigate('/about');
    } else {
        setMessageType('danger');
}

setTimeout(() => {
    navigate('/about');
}, 500);

return true;
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    setIsSubmitting(true);

    try {
        const success = await handleAuth();

        if (success) {
            setFormData({
                email: '',
                password: ''
            });
        }
    } catch (error) {
        setMessageType('danger');
        setMessage('Error occurred. Please try again.');
    }

    setIsSubmitting(false);
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
                        <h2>Welcome Back Admin</h2>
                        <p className="text-secondary mb-4">
                            Please sign in to your account
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} noValidate>
                        <div className="form-floating form-content show">
                            <i className={`bi bi-envelope input-icon ${focusedInputs.email ? 'focused' : ''}`}></i>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                                required
                            />
                            <label htmlFor="email">Email address</label>
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>

                        <div className="form-floating form-content show">
                            <i className={`bi bi-lock input-icon ${focusedInputs.password ? 'focused' : ''}`}></i>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mb-4 mt-3"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        {message && (
                            <div className={`alert alert-${messageType} text-center mt-3`} role="alert">
                                {message}
                            </div>
                        )}

                        <div className="text-center">
                            <button
                                type="button"
                                className="btn btn-link link-secondary text-decoration-none"
                                onClick={() => navigate('/Login')}
                            >
                                Not an Admin? Continue as student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
};

export default AdminAuthPage;