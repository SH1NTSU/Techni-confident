import React from "react";

const Header: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: "rgb(56, 19, 194,0.8)",
        width: "100%",
        height: "80px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        boxSizing: "border-box",
        margin: 0,
        marginBottom: "100px",
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
          margin: 0,
        }}
      >
        TECHNI-KONFIDENT
      </h1>
    </header>
  );
};

export default Header;
