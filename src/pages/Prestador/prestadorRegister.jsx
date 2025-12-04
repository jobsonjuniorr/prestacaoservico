import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/prestadorRegister.css"; 
import { 
  FaMoneyBillWave, 
  FaClock, 
  FaCheckCircle, 
  FaIdCard, 
  FaFileUpload, 
  FaTrash, 
  FaPlusCircle, 
  FaBriefcase 
} from 'react-icons/fa';
import { ServiceContext } from "../Context/serviceContext.jsx";
import { useAlert } from "../Notifications/ToastContext.jsx";

export default function PrestadorRegister() {
  
  const usuarioLogado = JSON.parse(localStorage.getItem("loggedUser"));
  const { adicionarPrestador } = useContext(ServiceContext);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [documentoFile, setDocumentoFile] = useState(null); 

  // Profissional
  const [categoria, setCategoria] = useState(""); 
  const [cargo, setCargo] = useState("");         
  const [descricao, setDescricao] = useState("");

  // Lista de Serviços
  const [servicos, setServicos] = useState([]);
  const [tempServicoNome, setTempServicoNome] = useState("");
  const [tempServicoPreco, setTempServicoPreco] = useState("");

  // Disponibilidade
  const [atendeImediato, setAtendeImediato] = useState(false);
  const [atendeAgenda, setAtendeAgenda] = useState(false);
  const [tipoAgenda, setTipoAgenda] = useState(""); 
  const [linkAgenda, setLinkAgenda] = useState("");

  // Carrega dados iniciais
  useEffect(() => {
    if (usuarioLogado) {
      setNome(usuarioLogado.nome);
      setEmail(usuarioLogado.email);
    } else {
        navigate("/login");
    }
  }, [usuarioLogado, navigate]);

  // --- FUNÇÕES AUXILIARES ---

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setDocumentoFile(file);
  };

  // Adicionar Serviço (Mínimo 3, Máximo 5)
  const adicionarServico = () => {
    if (!tempServicoNome || !tempServicoPreco) return alert("Preencha nome e preço.");
    if (servicos.length >= 5) return alert("Máximo de 5 serviços permitidos.");

    const novoServico = {
        id: Date.now(),
        nome: tempServicoNome,
        preco: parseFloat(tempServicoPreco).toFixed(2)
    };

    setServicos([...servicos, novoServico]);
    setTempServicoNome("");
    setTempServicoPreco("");
  };

  const removerServico = (id) => {
    setServicos(servicos.filter(s => s.id !== id));
  };

  
  function handleSubmit(e) {
    e.preventDefault();

   
    if (!cpf || !documentoFile) return showAlert("CPF e Documento são obrigatórios.", "error");
    if (!categoria || !cargo || !descricao) return showAlert("Preencha os dados profissionais.", "error");
    if (servicos.length < 3) return showAlert("Adicione pelo menos 3 serviços na tabela.", "error");
    if (!atendeImediato && !atendeAgenda) return showAlert("Selecione sua disponibilidade.", "error");

    
    const novoPrestador = {
      id: Date.now(),
      usuarioId: usuarioLogado.id,
      nomeProfissional: nome,
      email: email,
      
     
      area: cargo,          
      category: categoria,  
      descricao: descricao,
      img: "https://cdn.create.vista.com/api/media/small/51405259/stock-vector-male-avatar-profile-picture-use-for-social-website-vector", // Placeholder
      
    
      verified: false, 
      
      
      urgent: atendeImediato,
      calendar: atendeAgenda,
      
     
      cpf: cpf,
      docNome: documentoFile.name, 
      listaServicos: servicos, 
      
   
      extraInfo: {
        "Disponibilidade": atendeImediato ? "Atende Imediato" : "Apenas Agendado",
        "Agenda": atendeAgenda ? (tipoAgenda === 'link' ? "Link Externo" : "Combinar via Chat") : "Não agendado",
        "Qtd. Serviços": `${servicos.length} opções disponíveis`
      },
     
      horarioAtendimento: atendeImediato ? "Plantão / Imediato" : "Horário Comercial"
    };

   
    adicionarPrestador(novoPrestador);
    
    showAlert("Solicitação de cadastro enviada! Aguarde a verificação do documento.", "success");
    navigate("/home");
  }

  return (
    <div className="register-page-container">
      <form onSubmit={handleSubmit} className="register-form-card">
        <h2 className="card-title">Torne-se um Prestador</h2>
        <p className="card-subtitle">Complete seu cadastro profissional para começar.</p>

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
                    <input type="file" id="doc-upload" accept="image/*" onChange={handleFileChange} className="file-input-hidden" />
                    <label htmlFor="doc-upload" className="file-input-btn">
                        <FaFileUpload /> {documentoFile ? "Arquivo Selecionado" : "Anexar RG/CNH"}
                    </label>
                    {documentoFile && <span className="file-name">{documentoFile.name}</span>}
                </div>
            </div>
          </div>
        </div>

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
                        placeholder="Nome do serviço"
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
            <h3 className="section-title"><FaClock /> Disponibilidade (Marque pelo menos um)</h3>
            
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