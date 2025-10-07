import React from "react";

const Footer: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: "rgb(56, 19, 194, 0.8)",
        height: "80px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        marginTop: "100px",
      }}
    >
      <img
        src="src/assets/logo.png"
        alt="Logo"
        style={{ height: "80px", width: "80px", marginRight: "15px" }}
      />

      <h1
        style={{
          color: "#e5e7eb",
          letterSpacing: "5px",
          fontSize: "30px",
        }}
      >
        TECHNI-KONFIDENT
      </h1>
    </header>
  );
};

export default Footer;
