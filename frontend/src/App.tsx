import Header from "./components/Header";
import InfoSection from "./components/InfoSection";
import ReportForm from "./components/ReportForm";
import LoginForm from "./components/loginForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const handleReportSubmit = (message: string) => {
    // Tu będzie logika wysyłania zgłoszenia do backendu
    console.log("Nowe zgłoszenie:", message);
    // Przykład: fetch('/api/reports', { method: 'POST', body: JSON.stringify({ message }) })
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Tu będzie logika logowania (np. zapytanie do API z MongoDB)
    console.log("Dane logowania:", credentials);
    // Przykład:
    // fetch('/api/login', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) })
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <InfoSection />

        {/* Formularz logowania */}
        <LoginForm onLogin={handleLogin} />

        {/* Formularz zgłoszeń */}
        <ReportForm onSubmit={handleReportSubmit} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
