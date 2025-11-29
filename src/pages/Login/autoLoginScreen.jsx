import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"; 

const AutoLoginScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedUser");

    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="login-page">
      <div className="form">

        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#1b3f66" }}>
          Olá, {user.nome}
        </h2>

        <label style={{ fontSize: "14px", fontWeight: "500", marginTop: "10px" }}>
          Email detectado:
        </label>

        <div className="inputForm" style={{ background: "#f2f4f7" }}>
          <span style={{ marginLeft: "5px", color: "#1f2937" }}>{user.email}</span>
        </div>

        <button
          className="button-submit"
          onClick={() => navigate("/home")}
        >
          Entrar
        </button>

        <button
          className="google-btn"
          onClick={() => {
            localStorage.removeItem("loggedUser");
            navigate("/login");
          }}
        >
          Não sou eu
        </button>
      </div>
    </div>
  );
};

export default AutoLoginScreen;
