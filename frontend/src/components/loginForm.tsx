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

    if (!email.endsWith("@technischools.com")) {
      setMessage("❌ Możesz się zalogować tylko z mailem @technischools.com");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Błąd logowania");

      const data = await res.json();
      setMessage("✅ Zalogowano pomyślnie!");
      if (onLogin) onLogin({ email, password });
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
        maxWidth: "450px",
        margin: "3rem auto",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          border: "4px solid rgba(56, 19, 194, 0.8)",
          boxShadow: "0 12px 40px rgba(40, 54, 24, 0.1)",
        }}
      >
        <h2
          style={{
            margin: "0 0 2rem 0",
            fontSize: "2rem",
            fontWeight: "700",
            color: "rgba(56, 19, 194, 0.8)",
            textAlign: "center",
          }}
        >
          🔑 Logowanie
        </h2>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "#283618",
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
              padding: "0.9rem",
              borderRadius: "12px",
              border: "2px solid rgba(56, 19, 194, 0.8)",
              fontSize: "1rem",
              background: "#fff",
              color: "#283618",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "#283618",
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
              padding: "0.9rem",
              borderRadius: "12px",
              border: "2px solid rgba(56, 19, 194, 0.8)",
              fontSize: "1rem",
              background: "#fff",
              color: "#283618",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email.trim() || !password.trim()}
          style={{
            width: "100%",
            padding: "0.9rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            backgroundColor: "rgb(229, 15, 136)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor:
              !email.trim() || !password.trim() ? "not-allowed" : "pointer",
            transition: "all 0.2s ease-in-out",
          }}
        >
          {loading ? "⏳ Logowanie..." : "🚀 Zaloguj się"}
        </button>

        {message && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              textAlign: "center",
              fontWeight: "600",
              color: message.startsWith("✅") ? "#065f46" : "#991b1b",
            }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
