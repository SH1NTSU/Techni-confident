import React, { useState } from "react";

interface RegisterFormProps {
  onRegister?: (credentials: { email: string; password: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith("@technischools.com")) {
      setMessage(
        "❌ Możesz się zarejestrować tylko z mailem @technischools.com"
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Hasła nie są identyczne");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Błąd rejestracji");

      const data = await res.json();
      setMessage("✅ Konto utworzone pomyślnie!");
      if (onRegister) onRegister({ email, password });

      console.log("Rejestracja:", data);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("❌ Nie udało się zarejestrować.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          📝 Rejestracja
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "1rem",
            marginBottom: "1rem",
            border: "2px solid #ddd",
            borderRadius: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "1rem",
            marginBottom: "1rem",
            border: "2px solid #ddd",
            borderRadius: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Powtórz hasło"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "1rem",
            marginBottom: "1.5rem",
            border: "2px solid #ddd",
            borderRadius: "10px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            fontWeight: "600",
            background: "linear-gradient(135deg, #bc6c25, #dda15e)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {loading ? "⏳ Rejestracja..." : "🚀 Zarejestruj się"}
        </button>

        {message && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "10px",
              background: message.startsWith("✅") ? "#d1fae5" : "#fee2e2",
              color: message.startsWith("✅") ? "#065f46" : "#991b1b",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
