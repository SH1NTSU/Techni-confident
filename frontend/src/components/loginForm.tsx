import React from "react";

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [sent, setSent] = React.useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    onLogin({ email, password });

    setEmail("");
    setPassword("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
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
        {/* Decorative gradient */}
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
                transition: "all 0.3s ease",
                background: "#fefae0",
                color: "#283618",
              }}
              required
              onFocus={(e) => {
                e.target.style.borderColor = "#bc6c25";
                e.target.style.boxShadow = "0 0 0 3px rgba(188, 108, 37, 0.1)";
                e.target.style.background = "white";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#fefae0";
              }}
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
                transition: "all 0.3s ease",
                background: "#fefae0",
                color: "#283618",
              }}
              required
              onFocus={(e) => {
                e.target.style.borderColor = "#bc6c25";
                e.target.style.boxShadow = "0 0 0 3px rgba(188, 108, 37, 0.1)";
                e.target.style.background = "white";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#fefae0";
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!email.trim() || !password.trim()}
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
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              boxShadow:
                !email.trim() || !password.trim()
                  ? "none"
                  : "0 4px 15px rgba(188, 108, 37, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {!email.trim() || !password.trim()
              ? "Uzupełnij dane"
              : "🚀 Zaloguj się"}
          </button>

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
                border: "2px solid #10b981",
              }}
            >
              ✅ Logowanie wysłane (symulacja)!
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
