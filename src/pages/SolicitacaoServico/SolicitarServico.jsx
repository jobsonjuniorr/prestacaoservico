import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceContext } from "../Context/serviceContext.jsx";
import "../../styles/SolicitarServico.css";
import { 
    LuChevronLeft, LuTriangleAlert, LuCalendar, LuClock, 
    LuMapPin, LuLaptop, LuShieldCheck, LuInfo 
} from "react-icons/lu";

export default function SolicitarServico() {
  const { idPrestador } = useParams();
  const navigate = useNavigate();
  const { prestadores } = useContext(ServiceContext);
  const user = JSON.parse(localStorage.getItem("loggedUser"));


  const [prestador, setPrestador] = useState(null);
  
  
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [modalidade, setModalidade] = useState("Presencial"); 
  const [servicoSelecionado, setServicoSelecionado] = useState(null); 
  const [descricaoOutro, setDescricaoOutro] = useState("");

  useEffect(() => {
    if (!user) {
        alert("Você precisa estar logado para solicitar um serviço.");
        navigate("/login");
        return;
    }

    const prestadoresLocal = JSON.parse(localStorage.getItem("prestadores")) || [];
    const todos = [...(prestadores || []), ...prestadoresLocal];
    const encontrado = todos.find(p => String(p.id) === String(idPrestador));

    if (encontrado) {
        setPrestador(encontrado);
        
    
        if (!encontrado.listaServicos || encontrado.listaServicos.length === 0) {
            setServicoSelecionado({ nome: "Serviço Padrão", preco: encontrado.preco });
        }
    }
  }, [idPrestador, prestadores, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!servicoSelecionado) return alert("Selecione um serviço.");
    if (servicoSelecionado === 'outro' && !descricaoOutro) return alert("Descreva o serviço que você precisa.");
    if (!data || !horario) return alert("Informe a data e hora.");

    const nomeServicoFinal = servicoSelecionado === 'outro' 
        ? "Serviço Personalizado" 
        : servicoSelecionado.nome;
    
    const descricaoFinal = servicoSelecionado === 'outro' 
        ? descricaoOutro 
        : `Serviço de lista: ${servicoSelecionado.nome}`;

    const novaSolicitacao = {
        id: Date.now(),
        // Quem pede
        clienteId: user.id,
        clienteNome: user.nome,
        clienteWhatsapp: user.telefone || "Não informado", 
        
        // Quem faz
        prestadorId: prestador.id,
        prestadorNome: prestador.nomeProfissional,
        
        // Detalhes
        tipoServico: nomeServicoFinal,
        detalhes: descricaoFinal,
        precoEstimado: servicoSelecionado === 'outro' ? "A combinar" : servicoSelecionado.preco,
        modalidade,
        
        // Agenda
        dataSolicitada: data,
        horarioSolicitado: horario,
        statusAgenda: prestador.calendar ? "Horário Marcado" : "Sugestão de Horário",
        
        // Status do fluxo
        status: "Pendente",
        dataCriacao: new Date().toISOString()
    };

    // Salva no localStorage
    const solicitacoesExistentes = JSON.parse(localStorage.getItem("solicitacoes-prestador")) || [];
    localStorage.setItem("solicitacoes", JSON.stringify([...solicitacoesExistentes, novaSolicitacao]));

    // Feedback e Redirecionamento
    alert(`Solicitação enviada para ${prestador.nomeProfissional}!\n\nSe ele aceitar, entrará em contato pelo seu WhatsApp cadastrado.`);
    navigate("/minhas-solicitacoes"); 
  };

  if (!prestador) return <div style={{padding:20}}>Carregando...</div>;

  return (
    <div className="solicitar-container">
      
      <div className="header-nav-simple">
        <button onClick={() => navigate(-1)} className="back-btn">
            <LuChevronLeft size={24} /> Voltar
        </button>
      </div>

      <div className="solicitar-card">
        
        {/* AVISO LEGAL IMPORTANTE */}
        <div className="legal-warning">
            <LuTriangleAlert size={24} style={{minWidth:24}} />
            <span>
                <strong>Aviso Importante:</strong> A Local+ conecta você ao prestador. 
                O pagamento e os detalhes finais do contrato devem ser combinados diretamente 
                entre vocês. Não realizamos transações financeiras na plataforma.
            </span>
        </div>

        {/* Resumo do Prestador */}
        <div className="provider-mini-profile">
            <img 
                src={prestador.img || "https://placehold.co/150"} 
                alt={prestador.nomeProfissional} 
                className="mini-avatar" 
            />
            <div className="mini-info">
                <h3>{prestador.nomeProfissional}</h3>
                <p>{prestador.area || prestador.category}</p>
            </div>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>
            
         
            <div className="form-section">
                <label className="label-title">Qual serviço você precisa?</label>
                
                <div className="services-grid">
                  
                    {prestador.listaServicos && prestador.listaServicos.map((svc, idx) => (
                        <div 
                            key={idx} 
                            className={`service-option ${servicoSelecionado?.nome === svc.nome ? 'selected' : ''}`}
                            onClick={() => setServicoSelecionado(svc)}
                        >
                            <div className="radio-fake"></div>
                            <span className="svc-info">{svc.nome}</span>
                            <span className="svc-price">R$ {svc.preco}</span>
                        </div>
                    ))}

                    
                    <div 
                        className={`service-option ${servicoSelecionado === 'outro' ? 'selected' : ''}`}
                        onClick={() => setServicoSelecionado('outro')}
                    >
                        <div className="radio-fake"></div>
                        <span className="svc-info">Outro serviço (Personalizado)</span>
                        <span className="svc-price">A combinar</span>
                    </div>
                </div>

                {servicoSelecionado === 'outro' && (
                    <div style={{marginTop: 15}}>
                        <label className="label-title">Descreva o que você precisa:</label>
                        <textarea 
                            className="textarea-field" 
                            value={descricaoOutro}
                            onChange={(e) => setDescricaoOutro(e.target.value)}
                            required
                        />
                    </div>
                )}
            </div>

           
            <div className="form-section">
                <label className="label-title">Detalhes do Agendamento</label>
                
              
                <p className="helper-text">
                    {prestador.calendar 
                        ? "Este profissional possui agenda ativa. Selecione o horário para reserva." 
                        : "Este profissional combina horários. Sugira uma data para ele confirmar."}
                </p>

                <div className="input-row">
                    <div>
                        <label style={{fontSize:'0.9rem'}}>Data</label>
                        <input 
                            type="date" 
                            className="input-field" 
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={{fontSize:'0.9rem'}}>Horário (Comercial)</label>
                        <input 
                            type="time" 
                            className="input-field" 
                            min="08:00" 
                            max="18:00"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div style={{marginTop: 15}}>
                    <label className="label-title">Modalidade</label>
                    <div className="input-row">
                        <label className="service-option" style={{padding: '10px'}}>
                            <input 
                                type="radio" 
                                name="modalidade" 
                                checked={modalidade === "Presencial"} 
                                onChange={() => setModalidade("Presencial")}
                                style={{marginRight: 10}}
                            /> 
                            <LuMapPin /> Presencial
                        </label>
                        <label className="service-option" style={{padding: '10px'}}>
                            <input 
                                type="radio" 
                                name="modalidade" 
                                checked={modalidade === "Remoto"} 
                                onChange={() => setModalidade("Remoto")}
                                style={{marginRight: 10}}
                            /> 
                            <LuLaptop /> Remoto
                        </label>
                    </div>
                </div>
            </div>

  
            <button type="submit" className="btn-confirm">
                Solicitar Serviço
            </button>

        </form>
      </div>

      <div className="help-section">
        <p style={{marginBottom: 15, color: '#666'}}>Dúvidas sobre como contratar?</p>
        <button className="btn-help-link" onClick={() => navigate('/ajuda')}>
            <LuInfo style={{verticalAlign: 'middle'}}/> Precisa de Ajuda?
        </button>
      </div>

    </div>
  );
}