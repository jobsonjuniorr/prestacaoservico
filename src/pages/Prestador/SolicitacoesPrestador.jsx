import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../Context/serviceContext.jsx";
import "../../styles/SolicitacoesPrestador.css";
import { 
    LuCheck, LuX, LuPlay, LuCircleCheck, LuClock, 
    LuCalendar, LuMapPin, LuDollarSign, LuMessageCircle,
    LuBriefcase 
} from "react-icons/lu";

export default function VerSolicitacoes() {
  const navigate = useNavigate();
  const { prestadores } = useContext(ServiceContext);
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  
  const [meusPedidos, setMeusPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrestador, setIsPrestador] = useState(true); // Estado para controlar se é prestador

  console.log("Meus Pedidos:", meusPedidos);

  useEffect(() => {
   
    if (!user) {
        navigate("/login");
        return;
    }

    const todosPrestadores = [
        ...(prestadores || []), 
        ...(JSON.parse(localStorage.getItem("prestadores")) || [])
    ];
    
    // Verifica se o usuário logado tem perfil de prestador
    const meuPerfilPrestador = todosPrestadores.find(p => String(p.usuarioId) === String(user.id));

    if (!meuPerfilPrestador) {
        
        setIsPrestador(false);
        setLoading(false);
        return;
    }

    // Se for prestador, segue a vida normal
    const todasSolicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];

    const pedidosFiltrados = todasSolicitacoes
        .filter(s => String(s.prestadorId) === String(meuPerfilPrestador.id))
        .reverse();

    setMeusPedidos(pedidosFiltrados);
    setLoading(false);

  }, [navigate, prestadores]);

  const atualizarStatus = (idSolicitacao, novoStatus) => {
    const todasSolicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
    
    const atualizadas = todasSolicitacoes.map(req => {
        if (req.id === idSolicitacao) {
            return { ...req, status: novoStatus };
        }
        return req;
    });

    localStorage.setItem("solicitacoes", JSON.stringify(atualizadas));
    
    window.location.reload(); 
  };

  if (loading) return <div style={{padding:20, textAlign:'center'}}>Carregando painel...</div>;

  // SE NÃO FOR PRESTADOR
  if (!isPrestador) {
      return (
        <div className="provider-requests-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
            <div className="empty-state" style={{maxWidth: '500px', textAlign: 'center', padding: '40px'}}>
                <LuBriefcase size={60} color="#2d8cff" style={{marginBottom: '20px'}} />
                <h2 style={{fontSize: '1.5rem', marginBottom: '10px', color: '#333'}}>Você ainda não é um Prestador</h2>
                <p style={{color: '#666', marginBottom: '30px'}}>
                    Para gerenciar solicitações e oferecer seus serviços, você precisa completar seu cadastro profissional.
                </p>
                <button 
                    onClick={() => navigate("/prestador/register")} 
                    className="btn-action"
                    style={{
                        backgroundColor: '#2d8cff', 
                        color: 'white', 
                        padding: '12px 24px', 
                        fontSize: '1rem',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                   <LuPlay /> Começar Agora
                </button>
            </div>
        </div>
      );
  }

  // (SE FOR PRESTADOR) 
  const renderBotoes = (pedido) => {
      switch (pedido.status) {
          case "Pendente":
              return (
                  <>
                    <button className="btn-action btn-reject" onClick={() => atualizarStatus(pedido.id, "Recusado")}>
                        <LuX /> Recusar
                    </button>
                    <button className="btn-action btn-accept" onClick={() => atualizarStatus(pedido.id, "Aceito")}>
                        <LuCheck /> Aceitar Serviço
                    </button>
                  </>
              );
          case "Aceito":
              return (
                  <button className="btn-action btn-start" onClick={() => atualizarStatus(pedido.id, "Em Andamento")}>
                      <LuPlay /> Iniciar Serviço
                  </button>
              );
          case "Em Andamento":
              return (
                  <button className="btn-action btn-finish" onClick={() => atualizarStatus(pedido.id, "Concluído")}>
                      <LuCircleCheck /> Marcar como Concluído
                  </button>
              );
          case "Concluído":
              return <span style={{color:'orange', fontWeight:600}}>Aguardando confirmação do cliente</span>;
          case "Finalizado":
              return <span style={{color:'green', fontWeight:600}}>Serviço Finalizado com Sucesso!</span>;
          case "Cancelado":
          case "Recusado":
              return <span style={{color:'red'}}>Cancelado/Recusado</span>;
          default:
              return null;
      }
  };

  const getBorderClass = (status) => {
      if(status === "Pendente") return "border-pendente";
      if(status === "Aceito") return "border-aceito";
      if(status === "Em Andamento") return "border-andamento";
      if(status.includes("Concluído") || status === "Finalizado") return "border-concluido";
      return "border-cancelado";
  };

  return (
    <div className="provider-requests-container">
      
      <header className="requests-header">
        <h1 className="requests-title">Gerenciar Pedidos</h1>
        <p className="requests-subtitle">Acompanhe e gerencie as solicitações dos seus clientes.</p>
      </header>

      <div className="requests-list">
        {meusPedidos.length === 0 ? (
            <div className="empty-state">
                <p>Você ainda não recebeu nenhuma solicitação de serviço.</p>
            </div>
        ) : (
            meusPedidos.map(pedido => (
                <div key={pedido.id} className={`provider-request-card ${getBorderClass(pedido.status)}`}>
                    
                    {/* Topo do Card */}
                    <div className="card-top">
                        <div className="client-info">
                            <h3>{pedido.clienteNome}</h3>
                            <span>Solicitou: <strong>{pedido.tipoServico}</strong></span>
                            
                            {/* Link do Whatsapp se aceito */}
                            {(pedido.status === "Aceito" || pedido.status === "Em Andamento") && (
                                <div>
                                    <a 
                                        href={`https://wa.me/55${pedido.clienteWhatsapp?.replace(/\D/g,'')}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="contact-link"
                                    >
                                        <LuMessageCircle /> Chamar no WhatsApp
                                    </a>
                                </div>
                            )}
                        </div>
                        <span className="status-tag">{pedido.status}</span>
                    </div>

                    {/* Detalhes */}
                    <div className="card-details">
                        <div className="detail-item">
                            <label><LuCalendar /> Data e Hora</label>
                            <p>{pedido.dataSolicitada}
                                {pedido.horarioSolicitado ? ` às ${pedido.horarioSolicitado}` : ""}
                            </p>
                            
                        </div>
                        <div className="detail-item">
                            <label><LuDollarSign /> Valor Estimado</label>
                            <p>R$ {pedido.precoEstimado}</p>
                        </div>
                        <div className="detail-item">
                            <label><LuMapPin /> Modalidade</label>
                            <p>{pedido.modalidade || "Não informado"}</p>
                        </div>
                        
                        {pedido.observacao && (
                            <div className="detail-item obs-box">
                                <label>Observação do Cliente:</label>
                                "{pedido.observacao}"
                            </div>
                        )}
                    </div>

                    {/* Ações */}
                    <div className="action-buttons">
                        {renderBotoes(pedido)}
                    </div>

                </div>
            ))
        )}
      </div>
    </div>
  );
}