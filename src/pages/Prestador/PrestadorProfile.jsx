import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceContext } from "../Context/serviceContext.jsx";
// Ícones
import { 
  LuChevronLeft, LuClock, LuCalendar, 
  LuStar, LuBriefcase, LuInfo, LuMapPin
} from "react-icons/lu";
// Import do CSS
import "../../styles/prestadorProfile.css";

export default function PrestadorProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(ServiceContext);

    if (!context) return <div style={{padding: 20}}>Carregando sistema...</div>;

    const { prestadores: prestadoresFixos } = context;

    let prestadoresLocal = [];
    try {
        const localData = localStorage.getItem("prestadores");
        if (localData) prestadoresLocal = JSON.parse(localData);
    } catch (error) {
        console.error("Erro ao ler localStorage", error);
    }

    const todosPrestadores = [...(prestadoresFixos || []), ...prestadoresLocal];
    const prestador = todosPrestadores.find((p) => String(p.id) === String(id));

    if (!prestador) {
        return (
            <div className="profile-container" style={{justifyContent:'center', alignItems:'center'}}>
                <p>Prestador não encontrado ou ID inválido.</p>
                <button 
                    onClick={() => navigate('/home')}
                    style={{padding: '10px 20px', marginTop: 10, cursor: 'pointer'}}
                >
                    Voltar para Home
                </button>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <header className="page-header-nav">
                <button onClick={() => navigate('/home')} className="back-btn">
                    <LuChevronLeft size={30} />
                </button>
                <span className="page-header-title">Perfil do Profissional</span>
            </header>

            <div className="grid-layout">
                <div className="left-column">
                    <div className="profile-card">
                        <div style={{position: 'relative', display: 'inline-block'}}>
                            <img 
                                src={prestador.img || "https://placehold.co/150?text=Foto"} 
                                alt={prestador.nomeProfissional} 
                                className="profile-avatar" 
                            />
                            {prestador.verified && (
                                <div className="verified-badge-large" title="Verificado">
                                    ✔
                                </div>
                            )}
                        </div>
                        
                        <h1 className="profile-name">{prestador.nomeProfissional}</h1>
                        <p className="profile-role">{prestador.area || prestador.category || "Profissional"}</p>
                        
                        <div className="profile-rating">
                            <LuStar fill="#FFC107" stroke="none" />
                            <LuStar fill="#FFC107" stroke="none" />
                            <LuStar fill="#FFC107" stroke="none" />
                            <LuStar fill="#FFC107" stroke="none" />
                            <LuStar fill="#FFC107" stroke="none" />
                            <span style={{color: '#666', fontSize: '0.9rem', marginLeft: '5px'}}>
                                (5.0)
                            </span>
                        </div>

                        <div className="tags-container">
                            {prestador.urgent && (
                                <span className="tag tag-urgent">
                                    <LuClock size={14} /> Atende Imediato
                                </span>
                            )}
                            {prestador.calendar && (
                                <span className="tag tag-agenda">
                                    <LuCalendar size={14} /> Agenda Flexível
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="right-column">
                    <div className="content-section">
                        <h3 className="section-title"><LuInfo /> Sobre o profissional</h3>
                        <p className="description-text">
                            {prestador.descricao || "Este profissional é parceiro da Local+ e está pronto para atender suas demandas com qualidade e segurança."}
                        </p>
                    </div>

                    <div className="content-section">
                        <h3 className="section-title"><LuBriefcase /> Serviços e Preços</h3>
                        <div className="services-list">
                            {prestador.listaServicos && prestador.listaServicos.length > 0 ? (
                                prestador.listaServicos.map((servico, index) => (
                                    <div key={index} className="service-row">
                                        <span className="service-name">{servico.nome}</span>
                                        <span className="service-price">R$ {servico.preco}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="service-row">
                                    <span className="service-name">Serviço Base / Visita</span>
                                    <span className="service-price">A partir de R$ {prestador.preco || "A combinar"}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="fixed-bottom-action">
                        <button 
                            className="contract-btn" 
                            onClick={() => navigate(`/solicitar/${prestador.id}`)}
                        >
                            Contratar Serviço
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
