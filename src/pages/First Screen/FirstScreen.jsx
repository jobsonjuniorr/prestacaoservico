import React from 'react';
import { useNavigate } from "react-router-dom";
import "../../styles/firstscreen.css";

import imgMulher from "../../assets/apontando.png";
import imgLogo from "../../assets/logobranca.png";

const FirstScreen = () => {

  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src={imgLogo} alt="Logo Local" className="app-logo" />
        </div>
        <p className="subtitle">Conectando você ao serviço certo.</p>
      </header>

      <main className="main-content">
        <div className="image-wrapper">
          <img
            src={imgMulher}
            alt="Mulher apontando"
            className="person-image"
          />
        </div>

        <div className="login-card">
          <button
            className="btn-outline"
            onClick={() => {
              const savedUser = localStorage.getItem("loggedUser");

              if (savedUser) {
                navigate("/auto-login"); 
              } else {
                navigate("/login");
              }
            }}
          >
            Já tenho login
          </button>

          <div className="divider"></div>

          <button
            className="btn-outline"
            onClick={() => navigate("/register")}
          >
            Criar uma conta
          </button>
        </div>
      </main>

      <button
        className="help-btn"
        onClick={() => navigate("/help")}
      >
        <div className="help-icon">?</div>
        <span>Ajuda</span>
      </button>
    </div>
  );
};

export default FirstScreen;
