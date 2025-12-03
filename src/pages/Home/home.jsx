import React, { useState, useEffect, useContext } from 'react';
import "../../styles/Home.css";
import "../../styles/global.css"; 
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../Context/serviceContext.jsx";
import { Link } from "react-router-dom";
import tecnico from "../../assets/arcond.png";
import diarista from "../../assets/diarista.png";
import equipe from "../../assets/equipe.png";
import pedreiro from "../../assets/pedreiro.png";
import logoImg from '../../assets/logobranca.png';

// Ícones do sistema
import {
  LuSearch, LuUser, LuFilter, LuArrowUpDown,
  LuLayoutGrid, LuSparkles, LuMonitor, LuHammer, LuPalette, LuBookOpen,
  LuCalendar, LuClock, LuClipboardList // <--- Adicionei este ícone
} from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";

const HomeScreen = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { prestadores } = useContext(ServiceContext);

  const [searchText, setSearchText] = useState("");

  const [showFilterMenu, setShowFilterMenu] = useState(false);
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

      const matchCategory =
        selectedCategory === "Todos" || provider.category === selectedCategory;

      const matchSearch =
        provider.role?.toLowerCase().includes(searchText.toLowerCase()) ||
        provider.name?.toLowerCase().includes(searchText.toLowerCase());

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

      {/* --- HEADER REESTRUTURADO --- */}
      <header className="home-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px' }}>
        
        {/* 1. Logo à Esquerda */}
        <div className="logo-area">
           <img src={logoImg} alt="Local Logo" className="header-logo" style={{height: '40px', objectFit: 'contain'}} />
        </div>

        {/* 2. Barra de Pesquisa no Centro/Lado */}
        <div className="search-bar-container" style={{ 
            flex: 1, 
            maxWidth: '600px', 
            margin: '0 30px',
            background: 'rgba(255, 255, 255, 1)', // Fundo translúcido para combinar com o azul
            display: 'flex',
            alignItems: 'center',
            padding: '8px 15px',
            borderRadius: '50px'
        }}>
          <LuSearch className="search-icon" style={{color: 'rgb(141, 141, 141)'}} />
          <input
            type="text"
            placeholder="O que você precisa hoje?"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#fff', 
                outline: 'none', 
                width: '100%',
                marginLeft: '10px',
                fontSize: '1rem'
            }}
          />
          {/* Hack CSS para o placeholder branco: adicione isso no seu CSS global se precisar: 
              ::placeholder { color: rgba(255,255,255,0.8); } 
          */}
        </div>

        {/* 3. Área da Direita: Botão Solicitações + Perfil */}
        <div className="header-actions" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            
  <Link 
  to="/minhas-solicitacoes" 
  className="user-profile-chip"
  style={{
    background: 'rgba(255,255,255,0.2)',
    padding: '8px 15px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: 'white'
  }}
>
    <LuClipboardList size={18}/>
    <span>Minhas Solicitações</span>
</Link>

            {/* Perfil do Usuário */}
            <Link to="/ContaUsuario" className="user-profile-chip" style={{background: 'rgba(255,255,255,0.2)', padding: '8px 15px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white'}}>
                <LuUser className="user-icon" />
                <span> {user?.nome || "Visitante"}</span>
            </Link>
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
        </div>
      </section>

      {/* --- BANNER --- */}
      <section className="banner-section">
        <div className="banner-card" style={{ backgroundColor: banners[currentBanner].color }}>
          <div className="banner-content">
            <div className="banner-img-container">
              <img
                src={banners[currentBanner].img}
                alt="Banner Ilustração"
                className="banner-image"
              />
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

      {/* --- FILTROS --- */}
      <section className="filters-section">
        <button
          className="filter-btn"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          <LuFilter className="icon-btn" /> Filtrar
        </button>
      </section>

      {showFilterMenu && (
        <div className="filters-box">

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filterUrgent}
              onChange={() => {
                setFilterUrgent(!filterUrgent);
                setFilterSchedule(false);
              }}
            />
            Disponível imediato
          </label>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filterSchedule}
              onChange={() => {
                setFilterSchedule(!filterSchedule);
                setFilterUrgent(false);
              }}
            />
            Disponível com agenda
          </label>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filterVerified}
              onChange={() => setFilterVerified(!filterVerified)}
            />
            Verificado
          </label>

        </div>
      )}
      {/* --- LISTA DE PRESTADORES --- */}
      <section className="providers-list">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (

            // 1. O CARD
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
                          <LuCalendar style={{marginRight: 5}}/> Não trabalha com agenda
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
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            Nenhum prestador encontrado nesta categoria.
          </p>
        )}
      </section>

      <footer className="desktop-footer">
        <div className="footer-content">

          {/* Coluna 1 */}
          <div className="footer-column brand-col">
            <img src={logoImg} alt="Local+ Logo" className="footer-logo" />
            <p>Conectando você aos melhores profissionais da sua cidade de forma rápida, segura e eficiente.</p>
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
              <li><Link to="/termos">Termos de Uso</Link></li>
              <li><Link to="/privacidade">Privacidade</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Profissionais</h4>
            <ul>
              <li><Link to="/prestador/register">Seja um parceiro</Link></li>
              <li><Link to="/sucesso">Casos de sucesso</Link></li>
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