import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/minhasSolicitacoes.css";
import { 
    LuArrowLeft, LuClock, LuCalendar, LuCircleCheck, 
    LuOctagonAlert, LuCircleX, LuMessageCircle, LuChevronLeft
} from "react-icons/lu";

export default function MinhasSolicitacoes() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  

  const [todasSolicitacoes, setTodasSolicitacoes] = useState([]);
  
  useEffect(() => {
    if (!user) {
        navigate("/login");
        return;
    }
    const dados = JSON.parse(localStorage.getItem("solicitacoes")) || [];
   
    const minhas = dados
        .filter(s => s.clienteId === user.id)
        .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
        
    setTodasSolicitacoes(minhas);
  }, [navigate]);

  const atualizarStatusLocal = (idSolicitacao, novoStatus) => {
  
    const bancoGeral = JSON.parse(localStorage.getItem("solicitacoes")) || [];
    
   
    const bancoAtualizado = bancoGeral.map(item => {
        if (item.id === idSolicitacao) {
            return { ...item, status: novoStatus };
        }
        return item;
    });

    
    localStorage.setItem("solicitacoes", JSON.stringify(bancoAtualizado));
   
    setTodasSolicitacoes(
        bancoAtualizado
            .filter(s => s.clienteId === user.id)
            .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))
    );
  };

  const handleCancelar = (id) => {
      if(window.confirm("Tem certeza que deseja cancelar esta solicitação?")) {
          atualizarStatusLocal(id, "Cancelado");
      }
  };

  const handleConfirmarConclusao = (id) => {
   
      atualizarStatusLocal(id, "Finalizado");
      alert("Serviço finalizado! Obrigado por usar a Local+.");
  
  };

 
  const renderStatusBadge = (status) => {
      switch(status) {
          case "Pendente": return <span className="status-badge badge-pendente">Aguardando Prestador</span>;
          case "Aceito": return <span className="status-badge badge-aceito">Aceito</span>;
          case "Em Andamento": return <span className="status-badge badge-andamento">Em Execução</span>;
          case "Concluído": return <span className="status-badge badge-finalizado" style={{background:'orange', color:'white'}}>Aguardando sua Confirmação</span>;
          case "Finalizado": return <span className="status-badge badge-finalizado">Concluído</span>;
          case "Cancelado": return <span className="status-badge badge-cancelado">Cancelado</span>;
          default: return <span className="status-badge">{status}</span>;
      }
  };

  const renderActionArea = (item) => {
     
      if (item.status === "Pendente") {
          return (
              <div className="action-area">
                  <span className="status-message">
                      <LuClock /> Aguardando o prestador aceitar...
                  </span>
                  <button className="btn-cancel" onClick={() => handleCancelar(item.id)}>
                      Cancelar Pedido
                  </button>
              </div>
          );
      }

      if (item.status === "Aceito") {
          return (
              <div className="action-area" style={{background: '#fde3e3ff'}}>
                  <span className="status-message" style={{color:'#0d47a1'}}>
                      <LuMessageCircle /> O prestador aceitou! Aguarde o contato no WhatsApp.
                  </span>
                  <button className="btn-cancel" onClick={() => handleCancelar(item.id)}>
                      Cancelar Pedido
                  </button>
              </div>
          );
      }

      if (item.status === "Em Andamento") {
          return (
              <div className="action-area" style={{background: '#e0f7fa'}}>
                  <span className="status-message" style={{color:'#006064'}}>
                      <LuOctagonAlert /> Serviço em execução. Não é possível cancelar agora.
                  </span>
              </div>
          );
      }

      if (item.status === "Concluído") {
          return (
              <div className="action-area" style={{background: '#fff3cd', border:'1px solid #ffeeba'}}>
                  <strong style={{color:'#856404', display:'block', marginBottom:10}}>
                      O prestador marcou como concluído. Tudo certo?
                  </strong>
                  <button className="btn-finish" onClick={() => handleConfirmarConclusao(item.id)}>
                      <LuCircleCheck /> Sim, serviço finalizado!
                  </button>
              </div>
          );
      }

      return null; 
  };


  const getBorderClass = (status) => {
      if(status === "Pendente") return "status-pendente";
      if(status === "Aceito") return "status-aceito";
      if(status === "Em Andamento") return "status-andamento";
      if(status === "Concluído") return "status-concluido-prestador";
      if(status === "Finalizado") return "status-finalizado";
      if(status === "Cancelado") return "status-cancelado";
      return "";
  };

  return (
    <div className="requests-container">
      
      <div className="requests-header">
        <button onClick={() => navigate('/home')} style={{background:'none', border:'none', cursor:'pointer'}}>
            <LuChevronLeft size={28} color="#333"/>
        </button>
        <h1 className="requests-title">Minhas Solicitações</h1>
        <div style={{width:28}}></div> 
      </div>

      <div className="requests-list">
        {todasSolicitacoes.length === 0 ? (
            <div className="empty-state">
                <p>Você ainda não solicitou nenhum serviço.</p>
                <button 
                    onClick={() => navigate('/home')}
                    style={{marginTop: 20, padding: '10px 20px', background:'#1A8BF0', color:'white', border:'none', borderRadius: 8, cursor:'pointer'}}
                >
                    Procurar Profissionais
                </button>
            </div>
        ) : (
            todasSolicitacoes.map((item) => (
                <div key={item.id} className={`request-card ${getBorderClass(item.status)}`}>
                    
                 
                    <div className="card-header-row">
                        <div>
                            <h3 className="service-title">{item.tipoServico}</h3>
                            <p className="provider-name">Profissional: <strong>{item.prestadorNome}</strong></p>
                        </div>
                        {renderStatusBadge(item.status)}
                    </div>

                   
                    <div className="card-body-row">
                        <div className="info-item">
                            <label><LuCalendar size={12}/> Data e Hora</label>
                            <span>{item.dataSolicitada}
                                {item.horarioSolicitado ? ` às ${item.horarioSolicitado}` : ""}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Valor Estimado</label>
                            <span style={{color: 'green'}}>R$ {item.precoEstimado}</span>
                        </div>
                    </div>

                    {item.observacao && (
                        <div className="observation-box">
                            " {item.observacao} "
                        </div>
                    )}

                
                    {renderActionArea(item)}

                </div>
            ))
        )}
      </div>
    </div>
  );
}