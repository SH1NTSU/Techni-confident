import Header from "./components/Header";
import InfoSection from "./components/InfoSection";
import ReportForm from "./components/ReportForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const handleReportSubmit = (message: string) => {
    // Tu będzie logika wysyłania zgłoszenia do backendu
    console.log("Nowe zgłoszenie:", message);
    // Przykład: fetch('/api/reports', { method: 'POST', body: JSON.stringify({ message }) })
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <InfoSection />
        <ReportForm onSubmit={handleReportSubmit} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
