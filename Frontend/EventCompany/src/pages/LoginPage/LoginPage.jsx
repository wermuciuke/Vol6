import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    }
  }, [navigate]);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_HOST}/login`, credentials);
      localStorage.setItem("token", response.data.token);
      navigate("/main");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }, []);

  
  const buttonText = useMemo(() => (loading ? "Logging in..." : "Login"), [loading]);

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="usernameInput">Username</label>
        <br />
        <input
          id="usernameInput"
          name="username"
          type="text"
          value={credentials.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="passwordInput">Password</label>
        <br />
        <input
          id="passwordInput"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit" disabled={loading}>
          {buttonText}
        </button>
      </form>
      <p>
        Don&apos;t have an account? <a href="/register">Register now!</a>
      </p>
    </div>
  );
}
