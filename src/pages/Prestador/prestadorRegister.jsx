// PrestadorRegister.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/prestadorRegister.css"; 
import { FaClipboardList, FaMoneyBillWave, FaClock, FaCheckCircle, FaCalendarAlt, FaUser, FaEnvelope } from 'react-icons/fa';
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function PrestadorRegister() {
  const usuarioLogado = JSON.parse(localStorage.getItem("loggedUser"));
  const { adicionarPrestador } = useContext(ServiceContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");

  const [urgent, setUrgent] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [extraUrgent, setExtraUrgent] = useState("");
  const [extraCalendar, setExtraCalendar] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioLogado) {
      setNome(usuarioLogado.nome);
      setEmail(usuarioLogado.email);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!area || !descricao || !preco || !disponibilidade) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const novoPrestador = {
      id: Date.now(),
      usuarioId: usuarioLogado.id,
      nomeProfissional: nome,
      email,
      area,
      descricao,
      preco,
      horarioAtendimento: disponibilidade,
      img: "https://cdn.create.vista.com/api/media/small/51405259/stock-vector-male-avatar-profile-picture-use-for-social-website-vector",
      category: area,
      verified: false,
      urgent,
      calendar,
      extraInfo: {
        Disponibilidade: extraUrgent || "Verificar com prestador",
        Agenda: extraCalendar || "Disponível imediato"
      }
    };

    adicionarPrestador(novoPrestador);
    alert("Prestador cadastrado com sucesso!");
    navigate("/home");
  }

  return (
    <div className="register-page-container">
      <form onSubmit={handleSubmit} className="register-form-card">
        <h2 className="card-title">Cadastro de Prestador</h2>
        <p className="card-subtitle">Informe os detalhes do seu serviço para começar a atender.</p>

        {/* Informações Básicas em Linha */}
        <div className="form-section">
          <h3 className="section-title"><FaUser /> Informações Pessoais</h3>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="nome-disabled" className="input-label">Nome Completo</label>
              <input id="nome-disabled" className="input-field" value={nome} disabled />
            </div>
            <div className="input-group">
              <label htmlFor="email-disabled" className="input-label">Email de Contato</label>
              <input id="email-disabled" className="input-field" value={email} disabled />
            </div>
          </div>
        </div>

        {/* Campos de Serviço em Linha */}
        <div className="form-section">
          <h3 className="section-title"><FaClipboardList /> Detalhes do Serviço</h3>
          
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="area-atuacao" className="input-label required">Área de Atuação</label>
              <input
                id="area-atuacao"
                className="input-field"
                placeholder="Ex: Eletricista, Programador"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="preco" className="input-label required"><FaMoneyBillWave /> Preço (R$)</label>
              <input
                id="preco"
                type="number"
                className="input-field"
                placeholder="Ex: 50.00"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="descricao" className="input-label required">Descrição do Serviço</label>
            <textarea
              id="descricao"
              className="textarea-field"
              placeholder="Descreva seu serviço, experiência e diferenciais..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows="3"
              required
            />
          </div>
        </div>
        
        <div className="form-section">
  <h3 className="section-title"><FaClock /> Disponibilidade e Atendimento</h3>

  <div className="input-row">
    <div className="input-group">
      <label htmlFor="disponibilidade" className="input-label required">Período Principal</label>
      <select
        id="disponibilidade"
        className="select-field"
        value={disponibilidade}
        onChange={(e) => setDisponibilidade(e.target.value)}
        required
      >
        <option value="" disabled>Selecione o período</option>
        <option value="Manhã">Manhã (08h - 12h)</option>
        <option value="Tarde">Tarde (12h - 18h)</option>
        <option value="Noite">Noite (18h - 22h)</option>
        <option value="Integral">Integral</option>
      </select>
    </div>
  </div>

  <div className="options-row">
    {/* Opções de Urgência */}
    <div className="option-container">
      <div className="option-group">
        <label className="option-label">
          <input
            type="radio"
            name="urgent-option"
            value="no-urgent"
            checked={!urgent}
            onChange={() => {
              setUrgent(false);
              setExtraUrgent("");
            }}
          />
          <span className="option-checkmark"></span>
          <span className="option-text">Atende urgência</span>
        </label>
        
        <label className="option-label">
          <input
            type="radio"
            name="urgent-option"
            value="urgent"
            checked={urgent}
            onChange={() => setUrgent(true)}
          />
          <span className="option-checkmark"></span>
          <span className="option-text">Disponibilidade de ugência</span>
        </label>
      </div>
      
      {urgent && (
        <div className="input-group extra-info-group">
          <input
            id="extra-urgent"
            className="input-field"
            placeholder="Mensagem sobre urgência"
            value={extraUrgent}
            onChange={(e) => setExtraUrgent(e.target.value)}
          />
        </div>
      )}
    </div>

    {/* Opções de Agenda Flexível */}
    <div className="option-container">
      <div className="option-group">
        <label className="option-label">
          <input
            type="radio"
            name="calendar-option"
            value="no-calendar"
            checked={!calendar}
            onChange={() => {
              setCalendar(false);
              setExtraCalendar("");
            }}
          />
          <span className="option-checkmark"></span>
          <span className="option-text">Horário padrão</span>
        </label>
        
        <label className="option-label">
          <input
            type="radio"
            name="calendar-option"
            value="calendar"
            checked={calendar}
            onChange={() => setCalendar(true)}
          />
          <span className="option-checkmark"></span>
          <span className="option-text">Agenda flexível</span>
        </label>
      </div>
      
      {calendar && (
        <div className="input-group extra-info-group">
          <input
            id="extra-calendar"
            className="input-field"
            placeholder="Mensagem sobre agenda"
            value={extraCalendar}
            onChange={(e) => setExtraCalendar(e.target.value)}
          />
        </div>
      )}
    </div>
  </div>
</div>

        <button type="submit" className="submit-btn">
          Cadastrar Serviço <FaCheckCircle style={{marginLeft: '8px'}} />
        </button>
      </form>
    </div>
  );
}