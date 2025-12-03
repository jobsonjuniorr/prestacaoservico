import React, { useState, useEffect, useContext } from 'react';
import "../../styles/Home.css";
import "../../styles/global.css";
import { useNavigate, Link } from "react-router-dom";
import { ServiceContext } from "../Context/serviceContext.jsx";
import logoImg from '../../assets/logobranca.png';

// Importe suas imagens aqui (tecnico, diarista, etc...)
import tecnico from "../../assets/arcond.png";
import diarista from "../../assets/diarista.png";
import equipe from "../../assets/equipe.png";
import pedreiro from "../../assets/pedreiro.png";

import {
  LuSearch, LuUser, LuFilter, LuLayoutGrid, LuSparkles, LuMonitor, 
  LuHammer, LuPalette, LuBookOpen, LuHeartPulse, LuCalendarDays, 
  LuDog, LuBus, LuLeaf, LuWrench, LuUtensils, LuCar, LuBaby, 
  LuDumbbell, LuClipboardList, LuClock, LuCalendar
} from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";

const HomeScreen = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { prestadores } = useContext(ServiceContext);
  const [searchText, setSearchText] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Filtros
  const [filterUrgent, setFilterUrgent] = useState(false);
  const [filterSchedule, setFilterSchedule] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);

  const navigate = useNavigate();

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
    { name: "Saúde", icon: <LuHeartPulse /> },            
    { name: "Eventos", icon: <LuCalendarDays /> },        
    { name: "Pets", icon: <LuDog /> },                    
    { name: "Transporte", icon: <LuBus /> },              
    { name: "Jardinagem", icon: <LuLeaf /> },             
    { name: "Consertos", icon: <LuWrench /> },            
    { name: "Cozinha", icon: <LuUtensils /> },            
    { name: "Administrativo", icon: <LuClipboardList /> },
    { name: "Automotivo", icon: <LuCar /> },              
    { name: "Babá / Cuidados", icon: <LuBaby /> },        
    { name: "Fitness", icon: <LuDumbbell /> }, 
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
  }));

  const applyFilters = () => {
    return normalizedProviders.filter(provider => {
      const matchCategory = selectedCategory === "Todos" || provider.category === selectedCategory;
      const matchSearch = provider.role?.toLowerCase().includes(searchText.toLowerCase()) || provider.name?.toLowerCase().includes(searchText.toLowerCase());

      if (filterUrgent && !provider.urgent) return false;
      if (filterSchedule && !provider.calendar) return false;
      if (filterVerified && !provider.verified) return false;

      return matchCategory && matchSearch;
    });
  };
  const filteredProviders = applyFilters();

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

  return (
    <div className="home-container">

      {/* HEADER CORRIGIDO */}
      <header className="home-header">
        
        {/* Container que segura Logo + Botoes na primeira linha mobile */}
        <div className="header-top-group">
            <div className="logo-area">
               <img src={logoImg} alt="Local Logo" className="header-logo" />
            </div>

            {/* Ações (botões) */}
            <div className="header-actions">
                <Link to="/minhas-solicitacoes" className="user-profile-chip action-btn">
                   <LuClipboardList size={18}/>
                   <span className="btn-text">Solicitações</span>
                </Link>

                <Link to="/ContaUsuario" className="user-profile-chip profile-btn">
                    <LuUser className="user-icon" />
                    <span className="btn-text"> {user ? user.nome.split(' ')[0] : "Entrar"}</span>
                </Link>
            </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="search-bar-wrapper">
            <div className="search-bar-container">
              <LuSearch className="search-icon" />
              <input
                type="text"
                placeholder="O que você precisa hoje?"
                className="search-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
        </div>

      </header>

      {/* CATEGORIAS */}
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
        </div>
      </section>

      {/* BANNER */}
      <section className="banner-section">
        <div className="banner-card" style={{ backgroundColor: banners[currentBanner].color }}>
          <div className="banner-content">
            <div className="banner-img-container">
              <img src={banners[currentBanner].img} alt="Banner" className="banner-image" />
            </div>
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

      {/* FILTROS */}
      <section className="filters-section">
        <button className="filter-btn" onClick={() => setShowFilterMenu(!showFilterMenu)}>
          <LuFilter className="icon-btn" /> Filtrar Resultados
        </button>
      </section>

      {showFilterMenu && (
        <div className="filters-box">
          <label className="filter-option">
            <input type="checkbox" checked={filterUrgent} onChange={() => { setFilterUrgent(!filterUrgent); setFilterSchedule(false); }} />
            Disponível imediato
          </label>
          <label className="filter-option">
            <input type="checkbox" checked={filterSchedule} onChange={() => { setFilterSchedule(!filterSchedule); setFilterUrgent(false); }} />
            Disponível com agenda
          </label>
          <label className="filter-option">
            <input type="checkbox" checked={filterVerified} onChange={() => setFilterVerified(!filterVerified)} />
            Verificado
          </label>
        </div>
      )}

      {/* LISTA PRESTADORES */}
      <section className="providers-list">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div key={provider.id} className="provider-card">
              <div className="provider-card-content">
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
                    {provider.urgent && (
                        <p className="p-detail" style={{color: '#d32f2f', fontWeight: '500'}}>
                          <LuClock style={{marginRight: 5}}/> Atende Imediato
                        </p>
                    )}
                    {provider.calendar ? (
                        <p className="p-detail" style={{color: '#1976d2'}}>
                          <LuCalendar style={{marginRight: 5}}/> Trabalha com Agenda
                        </p>
                    ) : (
                        <p className="p-detail" style={{color: '#777'}}>
                          <LuCalendar style={{marginRight: 5}}/> Sem agenda online
                        </p>
                    )}
                  </div>

                  <Link to={`/prestador/${provider.id}`}>
                    <button className="orcamento-btn">Solicitar</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px', width: '100%' }}>
            Nenhum prestador encontrado.
          </p>
        )}
      </section>

      {/* FOOTER DESKTOP */}
      <footer className="desktop-footer">
        <div className="footer-content">
          <div className="footer-column brand-col">
            <img src={logoImg} alt="Local+ Logo" className="footer-logo" />
            <p>Conectando serviços, transformando a cidade.</p>
          </div>
          <div className="footer-column">
            <h4>Empresa</h4>
            <ul>
              <li><Link to="/sobre">Sobre nós</Link></li>
              <li><Link to="/imprensa">Imprensa</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Suporte</h4>
            <ul>
              <li><Link to="/ajuda">Central de Ajuda</Link></li>
              <li><Link to="/seguranca">Segurança</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Profissionais</h4>
            <ul>
              <li><Link to="/prestador/register">Seja um parceiro</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Local+. Todos os direitos reservados. Feito para Concórdia do Pará.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;