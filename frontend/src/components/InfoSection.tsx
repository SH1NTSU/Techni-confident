import React from "react";

const InfoSection: React.FC = () => {
  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "3rem auto",
        padding: "0 1rem",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#606c38",
          marginBottom: "2rem",
          fontSize: "2.2rem",
          fontWeight: "700",
          position: "relative",
        }}
      >
        Jak to działa?
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "3px",
            background: "linear-gradient(90deg, #bc6c25 0%, #dda15e 100%)",
            borderRadius: "2px",
          }}
        />
      </h2>

      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "20px",
          marginBottom: "2rem",
          boxShadow: "0 8px 30px rgba(40, 54, 24, 0.1)",
          border: "1px solid rgba(96, 108, 56, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, #dda15e30 0%, #bc6c2530 100%)",
            borderRadius: "50%",
            opacity: 0.7,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #606c38 0%, #283618 100%)",
              color: "white",
              padding: "0.8rem 1.5rem",
              borderRadius: "50px",
              fontSize: "0.9rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1.5rem",
            }}
          >
            🔒 Pełna Anonimowość
          </div>

          <p
            style={{
              margin: "0 0 1.5rem 0",
              lineHeight: "1.8",
              fontSize: "1.1rem",
              color: "#283618",
            }}
          >
            Twoja tożsamość pozostanie w pełni anonimowa. Nie zbieramy żadnych
            danych osobowych, adresów IP ani innych informacji identyfikujących.
          </p>
          <p
            style={{
              margin: 0,
              lineHeight: "1.8",
              fontSize: "1.1rem",
              color: "#606c38",
            }}
          >
            Opisz sytuację w polu poniżej i wyślij zgłoszenie. Wszystkie
            informacje są traktowane poufnie i przekazywane odpowiednim służbom.
          </p>
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
          padding: "2rem",
          borderRadius: "16px",
          border: "2px solid #dda15e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "20px",
            fontSize: "2rem",
            opacity: 0.3,
          }}
        >
          ⚠️
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <strong
            style={{
              color: "#bc6c25",
              fontSize: "1.2rem",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Pamiętaj:
          </strong>
          <p
            style={{
              margin: 0,
              color: "#283618",
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            Zgłaszaj tylko prawdziwe i istotne informacje. Fałszywe doniesienia
            mogą być ścigane prawnie.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
