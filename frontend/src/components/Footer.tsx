import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #283618 0%, #606c38 100%)",
        color: "#fefae0",
        padding: "3rem 1rem 2rem",
        marginTop: "4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fefae0' fill-opacity='0.2'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Top decorative line */}
        <div
          style={{
            width: "80px",
            height: "3px",
            background: "linear-gradient(90deg, #dda15e 0%, #bc6c25 100%)",
            margin: "0 auto 2rem",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "rgba(254, 250, 224, 0.1)",
              padding: "1.5rem",
              borderRadius: "16px",
              border: "1px solid rgba(254, 250, 224, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              🔒
            </div>
            <p
              style={{
                margin: "0 0 0.5rem 0",
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#fefae0",
              }}
            >
              Zgłoszenia są przetwarzane całkowicie anonimowo
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.95rem",
                opacity: 0.8,
                lineHeight: "1.5",
              }}
            >
              Twoja prywatność i bezpieczeństwo są dla nas najważniejsze
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                gap: "2rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🌐 Dostępne 24/7
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ⚡ Błyskawiczne przetwarzanie
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🔐 Szyfrowanie end-to-end
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(254, 250, 224, 0.3)",
                margin: "1.5rem 0",
              }}
            />

            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                opacity: 0.7,
                fontWeight: "500",
              }}
            >
              © 2025 Techni Konfident - System anonimowego zgłaszania
              nieprawidłowości
            </p>
            <p
              style={{
                margin: "0.5rem 0 0 0",
                fontSize: "0.8rem",
                opacity: 0.6,
              }}
            >
              Zbudowano z myślą o transparentności i sprawiedliwości
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
