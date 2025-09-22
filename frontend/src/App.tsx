import React, { useState } from "react";
import Header from "./components/Header";
import InfoSection from "./components/InfoSection";
import ReportForm from "./components/ReportForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Footer from "./components/Footer";
import "./App.css";
import ReportList from "./components/ReportList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log("Zalogowany:", credentials);
    setIsLoggedIn(true);
  };

  const handleRegister = (credentials: { email: string; password: string }) => {
    console.log("Zarejestrowano:", credentials);
    setShowRegister(false); // po rejestracji wracamy do logowania
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {!isLoggedIn ? (
          <>
            {showRegister ? (
              <>
                <RegisterForm onRegister={handleRegister} />
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                  Masz konto?{" "}
                  <button
                    onClick={() => setShowRegister(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#bc6c25",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Zaloguj się
                  </button>
                </p>
              </>
            ) : (
              <>
                <LoginForm onLogin={handleLogin} />
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                  Nie masz konta?{" "}
                  <button
                    onClick={() => setShowRegister(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#bc6c25",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Zarejestruj się
                  </button>
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <InfoSection />
            <ReportForm />
            <ReportList />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
