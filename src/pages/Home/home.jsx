import React, { useState, useEffect, useContext } from 'react';
import "../../styles/Home.css"; // Verifique se o nome do arquivo CSS está correto
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../Context/serviceContext.jsx";
import { Link } from "react-router-dom";  
// --- SEUS IMPORTS ---
import tecnico from "../../assets/arcond.png";
import diarista from "../../assets/diarista.png";
import equipe from "../../assets/equipe.png";
import pedreiro from "../../assets/pedreiro.png";

// Ícones
import {
  LuSearch, LuUser, LuFilter, LuArrowUpDown,
  LuLayoutGrid, LuSparkles, LuMonitor, LuHammer, LuPalette, LuBookOpen,
  LuCalendar, LuClock
} from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";

// Imagens
import logoImg from '../../assets/logobranca.png';

const HomeScreen = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { prestadores } = useContext(ServiceContext);

  const banners = [
    { id: 1, title: "TODOS OS SERVIÇOS EM UM SÓ LUGAR!", sub: "Encontre profissionais confiáveis.", color: "#2d8cff", img: equipe },
    { id: 2, title: "PRECISA DE UM PEDREIRO?", sub: "Reformas rápidas e baratas.", color: "#4cc38a", img: pedreiro },
    { id: 3, title: "MANUTENÇÃO DE AR-CONDICIONADO", sub: "Prepare-se para o verão.", color: "#ff9f43", img: tecnico },
    { id: 4, title: "DIARISTAS AVALIADAS", sub: "Sua casa limpa com segurança.", color: "#ff6b6b", img: diarista }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const categories = [
    { name: "Todos", icon: <LuLayoutGrid /> },
    { name: "Limpeza", icon: <LuSparkles /> },
    { name: "Tecnologia", icon: <LuMonitor /> },
    { name: "Reforma", icon: <LuHammer /> },
    { name: "Beleza", icon: <LuPalette /> },
    { name: "Aulas", icon: <LuBookOpen /> },
  ];


  const normalizedProviders = prestadores.map(p => ({
    id: p.id,
    name: p.nomeProfissional,
    role: p.area,
    category: p.category,
    rating: p.rating || 5,
    reviews: p.reviews || 0,
    verified: p.verified,
    urgent: p.urgent,
    calendar: p.calendar,
    img: p.img,
    extraInfo: p.extraInfo || {}
  }));

  const filteredProviders = selectedCategory === "Todos"
    ? normalizedProviders
    : normalizedProviders.filter(provider => provider.category === selectedCategory);


  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < rating ? <FaStar /> : <FaRegStar className="star-empty" />}
          </span>
        ))}
      </div>
    );
  };
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };
  return (
    <div className="home-container">

      <header className="home-header">
        <div className="header-top">
          <img src={logoImg} alt="Local Logo" className="header-logo" />
          <Link to="/perfil"  className="user-profile-chip">
                   <LuUser className="user-icon" />
            <span> {user?.nome}</span>
          </Link>
        </div>

        <div className="search-bar-container">
          <LuSearch className="search-icon" />
          <input type="text" placeholder="O que você precisa hoje?" className="search-input" />
        </div>
      </header>

      {/* --- CATEGORIAS --- */}
      <section className="categories-section">
        <div className="categories-list">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`category-item ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <div className="cat-icon-box">
                {cat.icon}
              </div>
              <span className="cat-name">{cat.name}</span>
            </div>
          ))}
          <button onClick={handleLogout}>Sair</button>
        </div>

      </section>

      {/* --- BANNER (CORRIGIDO AQUI) --- */}
      <section className="banner-section">
        <div className="banner-card" style={{ backgroundColor: banners[currentBanner].color }}>
          <div className="banner-content">

            {/* --- ADICIONEI ESTE BLOCO DA IMAGEM QUE FALTAVA --- */}
            <div className="banner-img-container">
              <img
                src={banners[currentBanner].img}
                alt="Banner Ilustração"
                className="banner-image"
              />
            </div>
            {/* -------------------------------------------------- */}

            <div className="banner-text">
              <h3>{banners[currentBanner].title}</h3>
              <p>{banners[currentBanner].sub}</p>
            </div>
          </div>
          <div className="banner-dots">
            {banners.map((_, idx) => (
              <span key={idx} className={`dot ${idx === currentBanner ? 'active' : ''}`}></span>
            ))}
          </div>
        </div>
      </section>

      {/* --- FILTROS --- */}
      <section className="filters-section">
        <button className="filter-btn">
          <LuFilter className="icon-btn" /> Filtrar
        </button>
        <button className="filter-btn">
          <LuArrowUpDown className="icon-btn" /> Ordenar
        </button>
      </section>

      {/* --- LISTA DE PRESTADORES --- */}
      <section className="providers-list">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div key={provider.id} className="provider-card">
              <div className="card-left">
                <div className="provider-avatar-wrapper">
                  <img src={provider.img} alt={provider.name} className="provider-avatar" />
                  {provider.verified && <span className="verified-badge">✔</span>}
                </div>
              </div>
              <div className="card-right">
                <div className="card-header">
                  <h3 className="role-title">{provider.role}</h3>
                  {renderStars(provider.rating)}
                </div>
                <div className="provider-info">
                  <p className="p-name"><LuUser /> {provider.name}</p>

                  {Object.entries(provider.extraInfo).map(([key, text]) => (
                    <p key={key} className="p-detail">
                      {key === "calendar" && <LuCalendar />}
                      {key === "urgent" && <LuClock />}
                      {text}
                    </p>
                  ))}
                </div>
               
                  <Link to={`/prestador/${provider.id}`}> <button className="orcamento-btn">Solicitar</button></Link>
               
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            Nenhum prestador encontrado nesta categoria.
          </p>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;