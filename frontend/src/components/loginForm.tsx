import React from "react";

interface LoginFormProps {
  onLogin?: (credentials: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("⚠️ Uzupełnij wszystkie pola.");
      return;
    }

    // Walidacja domeny email
    if (!email.endsWith("@technischools.com")) {
      setMessage("❌ Możesz się zalogować tylko z mailem @technischools.com");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:3000/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Błąd logowania");
      }

      const data = await res.json();
      setMessage("✅ Zalogowano pomyślnie!");
      if (onLogin) onLogin({ email, password });

      console.log("Odpowiedź API:", data);
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("❌ Nieprawidłowy email lub hasło.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
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
            🔑 Logowanie
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

          {/* Email */}
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Wpisz swój email"
              style={{
                width: "100%",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem",
                fontSize: "1rem",
                fontFamily: "inherit",
                background: "#fefae0",
                color: "#283618",
              }}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "2rem" }}>
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
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wpisz swoje hasło"
              style={{
                width: "100%",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem",
                fontSize: "1rem",
                fontFamily: "inherit",
                background: "#fefae0",
                color: "#283618",
              }}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !email.trim() || !password.trim()}
            style={{
              width: "100%",
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: "600",
              background:
                !email.trim() || !password.trim()
                  ? "#d1d5db"
                  : "linear-gradient(135deg, #bc6c25 0%, #dda15e 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor:
                !email.trim() || !password.trim() ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Logowanie..." : "🚀 Zaloguj się"}
          </button>

          {/* Wiadomość */}
          {message && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem 1.5rem",
                background: message.startsWith("✅")
                  ? "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
                  : "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                color: message.startsWith("✅") ? "#065f46" : "#991b1b",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "600",
                border: message.startsWith("✅")
                  ? "2px solid #10b981"
                  : "2px solid #ef4444",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
