import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <>
      <Header /> {/* Pridėkite Header komponentą */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
