import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const navigate = useNavigate();

 
  const handleChange = useCallback(({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  
  const handleRegister = useCallback(async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_HOST}/register`, formData);
      setRegisterSuccessful(true);

   
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Registration failed");
    }
  }, [formData, navigate]);

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <FormInput
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
      {registerSuccessful && (
        <p className="success-message">
          Registration successful.
        </p>
      )}
    </div>
  );
}


// eslint-disable-next-line react/prop-types
function FormInput({ label, name, type, value, onChange }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      <br />
    </>
  );
}
