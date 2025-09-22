import React, { useEffect, useState } from "react";

interface Report {
  id: string;
  title: string;
  description: string;
  contact?: string;
  createdAt: string;
}

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/v1/reports"); // GET wszystkich raportów
      if (!res.ok) throw new Error("Błąd przy pobieraniu raportów");
      const data = await res.json();
      setReports(data);
    } catch (err: any) {
      setError(err.message || "Nie udało się pobrać raportów");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(); // pobranie raportów przy montowaniu komponentu
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        📄 Lista raportów
      </h2>

      {/* Przycisk odświeżania */}
      <button
        onClick={fetchReports}
        disabled={loading}
        style={{
          marginBottom: "1rem",
          padding: "0.8rem 1.5rem",
          background: "linear-gradient(135deg, #bc6c25, #dda15e)",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "⏳ Odświeżanie..." : "🔄 Odśwież raporty"}
      </button>

      {error && (
        <div
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "12px",
            background: "#fee2e2",
            color: "#991b1b",
          }}
        >
          ❌ {error}
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {reports.map((report) => (
          <li
            key={report.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              background: "#fefae0",
            }}
          >
            <h3 style={{ margin: 0 }}>{report.title}</h3>
            <p>{report.description}</p>
            {report.contact && <p>Kontakt: {report.contact}</p>}
            <small style={{ color: "#606c38" }}>
              Utworzono: {new Date(report.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      {reports.length === 0 && !loading && (
        <p style={{ textAlign: "center" }}>Brak raportów</p>
      )}
    </div>
  );
};

export default ReportList;
