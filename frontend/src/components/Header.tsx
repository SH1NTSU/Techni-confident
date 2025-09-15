import React from "react";

const Header: React.FC = () => {
  return (
    <header
      style={{
        background:
          "linear-gradient(135deg, #283618 0%, #606c38 50%, #4a5c2a 100%)",
        color: "#fefae0",
        padding: "4rem 2rem 3rem",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 8px 35px rgba(40, 54, 24, 0.25)",
        overflow: "hidden",
      }}
    >
      {/* Enhanced Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fefae0' fill-opacity='0.4'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating geometric shapes */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "60px",
          height: "60px",
          background:
            "linear-gradient(45deg, rgba(221, 161, 94, 0.2), rgba(188, 108, 37, 0.2))",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "40px",
          height: "40px",
          background:
            "linear-gradient(45deg, rgba(254, 250, 224, 0.2), rgba(221, 161, 94, 0.2))",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "0.5rem 2rem",
            background: "rgba(254, 250, 224, 0.15)",
            borderRadius: "50px",
            marginBottom: "2rem",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(254, 250, 224, 0.2)",
            fontSize: "0.9rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          🛡️ Zaufany System
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "3.5rem",
            fontWeight: "800",
            background:
              "linear-gradient(135deg, #fefae0 0%, #dda15e 50%, #f4e5b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
            letterSpacing: "2px",
            textShadow: "0 4px 8px rgba(0,0,0,0.1)",
            lineHeight: "1.1",
          }}
        >
          Techni Konfident
        </h1>

        <div
          style={{
            width: "120px",
            height: "4px",
            background:
              "linear-gradient(90deg, #bc6c25 0%, #dda15e 50%, #bc6c25 100%)",
            margin: "0 auto 2rem",
            borderRadius: "2px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "8px",
              height: "8px",
              background: "#dda15e",
              borderRadius: "50%",
              boxShadow: "0 0 20px rgba(221, 161, 94, 0.8)",
            }}
          />
        </div>

        <p
          style={{
            opacity: 0.95,
            fontSize: "1.3rem",
            fontWeight: "400",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.7",
            letterSpacing: "0.5px",
          }}
        >
          Bezpieczne i całkowicie anonimowe zgłaszanie nieprawidłowości
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: 0.8,
            }}
          >
            <span>🔒</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              100% Anonimowo
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: 0.8,
            }}
          >
            <span>⚡</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              Natychmiastowe
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: 0.8,
            }}
          >
            <span>🛡️</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              Bezpieczne
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
