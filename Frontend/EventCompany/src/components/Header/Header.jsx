import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [haveToken, setHaveToken] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHaveToken(false);
    navigate("/");
  };

  const authLinks = useMemo(
    () => (
      <>
        <a href="/main">Attendees</a>
        <button onClick={handleLogout}>Logout</button>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const guestLinks = useMemo(
    () => (
      <>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </>
    ),
    []
  );

  return (
    <header className="flex-sb">
      <img
        src="https://i.pinimg.com/564x/4f/e7/d7/4fe7d75da98edd10a6ee22e2bd5053cc.jpg"
        alt="Logo"
        onClick={() => navigate("/")}
        style={{ cursor: 'pointer' }}
      />
      <div className="padding-20">
        {haveToken ? authLinks : guestLinks}
      </div>
    </header>
  );
}
