import React from 'react';
import "../../styles/firstscreen.css";
// import "../../styles/global.css"; // Descomente se for necessário

// IMPORTANTE: Importe a sua logo aqui também
import imgMulher from "../../assets/apontando.png";
import imgLogo from "../../assets/logobranca.png"; // <--- Coloque o nome do arquivo da sua logo aqui

const FirstScreen = () => {
  return (
    <div className="container">
      {/* Cabeçalho com Logo (Imagem) */}
      <header className="header">
        <div className="logo-container">
          {/* Aqui entra a imagem da logo que você pediu */}
          <img src={imgLogo} alt="Logo Local" className="app-logo" />
        </div>
        <p className="subtitle">Conectando você ao serviço certo.</p>
      </header>

      <main className="main-content">
        {/* Container da Imagem (Mulher Apontando) */}
        <div className="image-wrapper">
           <img 
             src={imgMulher} 
             alt="Mulher apontando" 
             className="person-image" 
           />
        </div>

        {/* Card de Login */}
        <div className="login-card">
          <button className="btn-outline">Já tenho login</button>
          <div className="divider"></div>
          <button className="btn-outline">Criar uma conta</button>
        </div>
      </main>

      {/* Botão Flutuante de Ajuda */}
      <button className="help-btn">
        <div className="help-icon">?</div>
        <span>Ajuda</span>
      </button>
    </div>
  );
};

export default FirstScreen;