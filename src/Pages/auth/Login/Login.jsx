import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms agreement
  const navigate = useNavigate(); // For navigation with React Router

  // Dummy data for login
  const dummyData = [
    {
      id: 1,
      email: "admin@urbanmotion.com",
      password: "admin123", // Password for admin
      role: "admin",
    },
    {
      id: 2,
      email: "user@urbanmotion.com",
      password: "user123", // Password for user
      role: "user",
    },
  ];

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate email, password, and terms agreement
    if (!email || !password) {
      setErrorMessage("Email dan password harus diisi.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Anda harus menerima syarat dan ketentuan.");
      return;
    }

    // Check if the email and password match the dummy data
    const user = dummyData.find((u) => u.email === email && u.password === password);

    if (user) {
      // Save login status in localStorage (so login state persists on reload)
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", user.role); // Store user role

      // Redirect based on user role (admin or user)
      if (user.role === "admin") {
        navigate("/admin/dashboard"); // Redirect to admin dashboard
      } else if (user.role === "user") {
        navigate("/"); // Redirect to user home page
      }
    } else {
      setErrorMessage("Email atau password salah.");
    }
  };

  // Check login status when the component first mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus) {
      // If already logged in, redirect based on user role
      const userRole = localStorage.getItem("role");
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="Login">
      <div className="container">
        <div className="left">
          <img alt="Webverse Studio Logo" className="logo" src="/assets/images/logo.png" />
        </div>
        <div className="right">
          <div className="login-form">
            {/* Close button */}
            <i className="fa fa-times close-icon" onClick={() => navigate("/")} title="Tutup"></i>

            <h2>Masuk</h2>
            <p>Masuk untuk mengakses akun Urban Motion anda.</p>

            {/* Form */}
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="checkbox-label">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="terms">Saya menerima syarat &amp; ketentuan yang berlaku</label>
              </div>

              {/* Error Message */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit" id="loginButton">
                Masuk
              </button>
            </form>

            {/* Register and Google Login */}
            <div className="register">
              <p>
                Belum punya akun? <a href="/register">Daftar</a>
              </p>
              <p>Atau</p>
              <a href="/dummy">
                <div className="google-login">
                  <img alt="Google Logo" height="20" src="/assets/images/google.png" width="20" />
                  <span>Masuk dengan Google</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
