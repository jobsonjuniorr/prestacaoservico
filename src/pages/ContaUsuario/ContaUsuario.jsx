import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LuBell, 
  LuUser, 
  LuBadgeCheck, 
  LuMessageSquare, 
  LuLogOut, 
  LuBriefcase, 
  LuFileText,
  LuChevronRight 
} from "react-icons/lu";
import "../../styles/contaUsuario.css";

const placeholderUserImg = "https://i.imgur.com/6XYb83n.png";

export default function ContaUsuario() {
  const navigate = useNavigate();
  
  let user = { nome: "Visitante", email: "", profissao: "Tecnologia > Desenvolvedora" };
  try {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
        user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Erro ao ler usuário:", error);
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  const handleNotifications = () => {
    alert("Abrir tela de notificações");
  };

  return (
    <div className="conta-container">
      
      <h2 className="page-header-title">Sua conta</h2>

      <section className="user-hero">
        <div className="user-hero-content">
            <img 
                src={user.img || placeholderUserImg} 
                alt="Foto de Perfil" 
                className="hero-profile-img" 
            />
            <div className="hero-user-details">
                <h3>{user.nome || "Iza Daniela"}</h3>
                <p>{user.profissao || "Cliente Local+"}</p>
            </div>
        </div>
        
        <button className="notification-btn" onClick={handleNotifications}>
            <LuBell size={26} />
        </button>
      </section>

      <ul className="menu-list main-menu">
        <li>
            <Link to="/perfil">
                <div className="menu-item-left">
                    <LuUser size={24} className="menu-icon-blue" />
                    <span>Seu Perfil</span>
                </div>
                <LuChevronRight className="chevron-icon" />
            </Link>
        </li>
        <li>
            <Link to="/verificado">
                <div className="menu-item-left">
                    <LuBadgeCheck size={24} className="menu-icon-blue" />
                    <span>Me tornar um verificado</span>
                </div>
                <LuChevronRight className="chevron-icon" />
            </Link>
        </li>
        <li>
            <Link to="/ajuda">
                <div className="menu-item-left">
                    <LuMessageSquare size={24} className="menu-icon-blue" />
                    <span>Preciso de ajuda</span>
                </div>
                <LuChevronRight className="chevron-icon" />
            </Link>
        </li>
        <li className="logout-item">
            <button onClick={handleLogout} className="logout-btn-link">
                <div className="menu-item-left">
                    <LuLogOut size={24} className="menu-icon-blue" />
                    <span>Sair da conta</span>
                </div>
               <LuChevronRight className="chevron-icon" />
            </button>
        </li>
      </ul>

      <Link to="/prestador/register" className="provider-banner-link">
        <LuBriefcase size={24} />
        <span>Começar a prestar serviços</span>
      </Link>

      <ul className="menu-list legal-menu">
        <li>
            <a href="/pdfs/guia_de_uso.pdf" target="_blank" rel="noopener noreferrer">
                <div className="menu-item-left">
                    <LuFileText size={24} className="menu-icon-gray" />
                    <span>Guia de uso</span>
                </div>
            </a>
        </li>
        <li>
            <a href="/pdfs/termos_de_uso.pdf" target="_blank" rel="noopener noreferrer">
                <div className="menu-item-left">
                    <LuFileText size={24} className="menu-icon-gray" />
                    <span>Termos de uso</span>
                </div>
            </a>
        </li>
        <li>
            <a href="/pdfs/politica_privacidade.pdf" target="_blank" rel="noopener noreferrer">
                <div className="menu-item-left">
                    <LuFileText size={24} className="menu-icon-gray" />
                    <span>Política de privacidade</span>
                </div>
            </a>
        </li>
      </ul>

    </div>
  );
}
