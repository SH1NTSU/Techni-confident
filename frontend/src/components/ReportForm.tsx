import React from "react";

const ReportForm: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (title.trim().length === 0 || description.trim().length === 0) {
      setError("Tytuł i opis są wymagane.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/v1/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          contact,
        }),
      });

      if (!response.ok) {
        throw new Error("Błąd przy wysyłaniu zgłoszenia");
      }

      setTitle("");
      setDescription("");
      setContact("");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err: any) {
      setError(err.message || "Nie udało się wysłać zgłoszenia.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "24px",
          boxShadow: "0 12px 40px rgba(40, 54, 24, 0.15)",
          border: "1px solid rgba(96, 108, 56, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, #bc6c25 0%, #dda15e 50%, #606c38 100%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              margin: "0 0 2rem 0",
              fontSize: "2rem",
              fontWeight: "700",
              color: "#283618",
              textAlign: "center",
              position: "relative",
            }}
          >
            📝 Zgłoś anonimowy donos
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "2px",
                background: "linear-gradient(90deg, #bc6c25 0%, #dda15e 100%)",
                borderRadius: "1px",
              }}
            />
          </h2>

          {/* Tytuł */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.8rem",
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#606c38",
                textAlign: "left",
              }}
            >
              Tytuł zgłoszenia
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Krótki tytuł zgłoszenia"
              style={{
                width: "100%",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem",
                fontSize: "1rem",
                background: "#fefae0",
              }}
            />
          </div>

          {/* Opis */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.8rem",
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#606c38",
                textAlign: "left",
              }}
            >
              Opisz sytuację
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opisz dokładnie sytuację..."
              rows={6}
              style={{
                width: "100%",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1.2rem",
                fontSize: "1rem",
                background: "#fefae0",
              }}
            />
          </div>

          {/* Przycisk */}
          <button
            type="submit"
            disabled={
              title.trim().length === 0 || description.trim().length === 0
            }
            style={{
              width: "100%",
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: "600",
              background:
                title.trim().length === 0 || description.trim().length === 0
                  ? "#d1d5db"
                  : "linear-gradient(135deg, #bc6c25 0%, #dda15e 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor:
                title.trim().length === 0 || description.trim().length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            🚀 Wyślij Zgłoszenie
          </button>

          {/* Komunikaty */}
          {sent && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem 1.5rem",
                background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                color: "#065f46",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              ✅ Zgłoszenie zostało wysłane pomyślnie!
            </div>
          )}
          {error && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem 1.5rem",
                background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                color: "#991b1b",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              ❌ {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
