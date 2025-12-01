import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/prestadorRegister.css"; 
import { 
  FaClipboardList, 
  FaMoneyBillWave, 
  FaClock, 
  FaCheckCircle, 
  FaUser, 
  FaIdCard, 
  FaFileUpload,
  FaTrash,
  FaPlusCircle,
  FaBriefcase
} from 'react-icons/fa';
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function PrestadorRegister() {
  const usuarioLogado = JSON.parse(localStorage.getItem("loggedUser"));
  const { adicionarPrestador } = useContext(ServiceContext);
  const navigate = useNavigate();

  // --- Estados do Formulário ---
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  
  // Novos campos obrigatórios
  const [cpf, setCpf] = useState("");
  const [documentoFoto, setDocumentoFoto] = useState(null); // Para o arquivo
  
  // Profissão
  const [categoria, setCategoria] = useState("");
  const [cargo, setCargo] = useState(""); // Ex: "Programador Fullstack"
  const [descricao, setDescricao] = useState("");

  // Serviços (Lista)
  const [servicos, setServicos] = useState([]);
  const [tempServicoNome, setTempServicoNome] = useState("");
  const [tempServicoPreco, setTempServicoPreco] = useState("");

  // Disponibilidade
  const [atendeImediato, setAtendeImediato] = useState(false);
  const [atendeAgenda, setAtendeAgenda] = useState(false);
  const [tipoAgenda, setTipoAgenda] = useState(""); // "link" ou "contato"
  const [linkAgenda, setLinkAgenda] = useState("");

  useEffect(() => {
    if (usuarioLogado) {
      setNome(usuarioLogado.nome);
      setEmail(usuarioLogado.email);
    } else {
        navigate("/login");
    }
  }, [usuarioLogado, navigate]);

  // --- Funções Auxiliares ---

  // Formata CPF visualmente
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  // Upload de arquivo simulado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setDocumentoFoto(file);
    }
  };

  // Adicionar Serviço na Lista
  const adicionarServico = () => {
    if (!tempServicoNome || !tempServicoPreco) {
        alert("Preencha o nome e o preço do serviço.");
        return;
    }
    if (servicos.length >= 5) {
        alert("Máximo de 5 serviços permitidos.");
        return;
    }

    const novoServico = {
        id: Date.now(),
        nome: tempServicoNome,
        preco: parseFloat(tempServicoPreco).toFixed(2)
    };

    setServicos([...servicos, novoServico]);
    setTempServicoNome("");
    setTempServicoPreco("");
  };

  // Remover Serviço
  const removerServico = (id) => {
    setServicos(servicos.filter(s => s.id !== id));
  };

  // --- Envio do Formulário ---
  function handleSubmit(e) {
    e.preventDefault();

    // Validações
    if (!cpf || !documentoFoto) {
        alert("CPF e Foto do Documento são obrigatórios.");
        return;
    }
    if (!categoria || !cargo || !descricao) {
        alert("Preencha os dados profissionais.");
        return;
    }
    if (servicos.length < 3) {
        alert("Você precisa adicionar pelo menos 3 serviços com preço-base.");
        return;
    }
    if (!atendeImediato && !atendeAgenda) {
        alert("Selecione pelo menos um tipo de disponibilidade (Imediato ou Agenda).");
        return;
    }

    // Cria o objeto do prestador
    const novoPrestador = {
      id: Date.now(),
      usuarioId: usuarioLogado.id,
      nomeProfissional: nome,
      email,
      cpf, // Novo
      
      // Mapeando para o sistema existente
      area: cargo, // O "Cargo" vira a área exibida no card
      category: categoria, // A categoria para filtros
      descricao,
      
      // O preço exibido no card será "A partir de R$ X" (o menor da lista)
      preco: Math.min(...servicos.map(s => parseFloat(s.preco))).toFixed(2), 
      
      img: "https://cdn.create.vista.com/api/media/small/51405259/stock-vector-male-avatar-profile-picture-use-for-social-website-vector",
      verified: false, // Começa não verificado até checarem o documento
      
      // Infos de disponibilidade
      urgent: atendeImediato,
      calendar: atendeAgenda,
      
      // Dados Extras complexos salvos aqui
      listaServicos: servicos,
      dadosAgenda: {
          tipo: tipoAgenda,
          link: linkAgenda
      },
      
      extraInfo: {
        "Serviços": `${servicos.length} opções disponíveis`,
        "Disponibilidade": atendeImediato ? "Atende Imediato" : "Apenas Agendado"
      }
    };

    adicionarPrestador(novoPrestador);
    alert("Solicitação enviada! Analisaremos seu documento e liberaremos seu perfil em breve.");
    navigate("/home");
  }

  return (
    <div className="register-page-container">
      <form onSubmit={handleSubmit} className="register-form-card">
        <h2 className="card-title">Torne-se um Prestador</h2>
        <p className="card-subtitle">Faça seu cadastro profissional para aparecer como prestador de serviços no Local+.</p>

        {/* 1. DADOS PESSOAIS E DOCUMENTOS */}
        <div className="form-section">
          <h3 className="section-title"><FaIdCard /> Documentação Obrigatória</h3>
          <div className="input-row">
            <div className="input-group">
              <label className="input-label required">CPF</label>
              <input 
                className="input-field" 
                value={cpf} 
                onChange={handleCpfChange} 
                placeholder="000.000.000-00"
                maxLength="14"
              />
            </div>
            
            <div className="input-group">
                <label className="input-label required">Documento com Foto (Frente)</label>
                <div className="file-input-wrapper">
                    <input 
                        type="file" 
                        id="doc-upload" 
                        accept="image/*,.pdf" 
                        onChange={handleFileChange}
                        className="file-input-hidden"
                    />
                    <label htmlFor="doc-upload" className="file-input-btn">
                        <FaFileUpload /> {documentoFoto ? "Arquivo Selecionado" : "Anexar RG/CNH"}
                    </label>
                    {documentoFoto && <span className="file-name">{documentoFoto.name}</span>}
                </div>
            </div>
          </div>
        </div>

        {/* 2. DADOS PROFISSIONAIS */}
        <div className="form-section">
          <h3 className="section-title"><FaBriefcase /> Perfil Profissional</h3>
          
          <div className="input-row">
            <div className="input-group">
              <label className="input-label required">Categoria Principal</label>
              <select 
                className="select-field" 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Reformas">Reformas</option>
                <option value="Beleza">Beleza</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Aulas">Aulas</option>
                <option value="Saúde">Saúde</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label required">Seu Cargo / Especialidade</label>
              <input 
                className="input-field" 
                placeholder="Ex: Programador Java, Manicure..." 
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label required">Descrição do Profissional</label>
            <textarea
              className="textarea-field"
              placeholder="Fale sobre sua experiência, tempo de mercado e diferenciais..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows="3"
            />
          </div>
        </div>

        {/* 3. LISTA DE SERVIÇOS */}
        <div className="form-section">
            <h3 className="section-title"><FaMoneyBillWave /> Tabela de Serviços (Mín. 3)</h3>
            <p className="section-hint">Adicione entre 3 e 5 serviços com preço base.</p>
            
            <div className="add-service-box">
                <div className="input-row compact">
                    <input 
                        className="input-field" 
                        placeholder="Nome do serviço (ex: Corte Simples)"
                        value={tempServicoNome}
                        onChange={(e) => setTempServicoNome(e.target.value)}
                    />
                    <input 
                        type="number"
                        className="input-field" 
                        placeholder="Preço R$"
                        value={tempServicoPreco}
                        onChange={(e) => setTempServicoPreco(e.target.value)}
                    />
                    <button type="button" className="add-btn" onClick={adicionarServico} disabled={servicos.length >= 5}>
                        <FaPlusCircle />
                    </button>
                </div>
            </div>

            {/* Lista visual dos serviços adicionados */}
            <div className="services-list-display">
                {servicos.length === 0 && <span className="empty-msg">Nenhum serviço adicionado ainda.</span>}
                
                {servicos.map((servico) => (
                    <div key={servico.id} className="service-item-row">
                        <span className="svc-name">{servico.nome}</span>
                        <span className="svc-price">R$ {servico.preco}</span>
                        <button type="button" className="remove-btn" onClick={() => removerServico(servico.id)}>
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
            {servicos.length > 0 && servicos.length < 3 && (
                <p className="error-text">Adicione mais {3 - servicos.length} serviços para continuar.</p>
            )}
        </div>
        
        {/* 4. DISPONIBILIDADE */}
        <div className="form-section">
            <h3 className="section-title"><FaClock /> Disponibilidade(você pode marcar os dois)</h3>
            
            <div className="availability-options">
                <label className={`check-box-card ${atendeImediato ? 'active' : ''}`}>
                    <input 
                        type="checkbox" 
                        checked={atendeImediato}
                        onChange={(e) => setAtendeImediato(e.target.checked)}
                    />
                    <div className="check-content">
                        <strong>Atendimento Imediato</strong>
                        <span>Posso atender chamados de urgência agora.</span>
                    </div>
                </label>

                <label className={`check-box-card ${atendeAgenda ? 'active' : ''}`}>
                    <input 
                        type="checkbox" 
                        checked={atendeAgenda}
                        onChange={(e) => setAtendeAgenda(e.target.checked)}
                    />
                    <div className="check-content">
                        <strong>Trabalho com Agenda</strong>
                        <span>O cliente marca um horário futuro.</span>
                    </div>
                </label>
            </div>

            {/* Configuração extra se marcar agenda */}
            {atendeAgenda && (
                <div className="agenda-details fade-in">
                    <label className="input-label">Como o cliente agenda?</label>
                    <div className="input-row">
                        <select 
                            className="select-field"
                            value={tipoAgenda}
                            onChange={(e) => setTipoAgenda(e.target.value)}
                        >
                            <option value="">Selecione...</option>
                            <option value="contato">Entrar em contato para combinar</option>
                            <option value="link">Link externo (Calendly, Google Agenda...)</option>
                        </select>
                        
                        {tipoAgenda === 'link' && (
                            <input 
                                className="input-field" 
                                placeholder="Cole o link da sua agenda aqui"
                                value={linkAgenda}
                                onChange={(e) => setLinkAgenda(e.target.value)}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>

        <button type="submit" className="submit-btn">
          Finalizar Cadastro <FaCheckCircle style={{marginLeft: '8px'}} />
        </button>
      </form>
    </div>
  );
}