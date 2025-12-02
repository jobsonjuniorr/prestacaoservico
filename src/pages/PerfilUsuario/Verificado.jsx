/*import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/verificado.css";
import { 
  LuChevronLeft, LuShieldCheck, LuClock, LuFileText, 
  LuUpload, LuLock, LuCheckCircle 
} from "react-icons/lu";
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function Verificado() {
  const navigate = useNavigate();
  const { prestadores } = useContext(ServiceContext);
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  // Estados: 'loading', 'initial', 'pending', 'approved'
  const [status, setStatus] = useState('loading'); 
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // 1. Verifica se já foi APROVADO pelo Admin (via Contexto)
    // Procura se esse usuário é um prestador
    const prestadorEncontrado = prestadores.find(p => p.usuarioId === user.id);
    
    if (prestadorEncontrado && prestadorEncontrado.verified) {
        setStatus('approved');
        return;
    }

    // 2. Verifica se está em ANÁLISE (Flag Local)
    // Se a gente já enviou o pedido antes, salvamos isso no navegador
    const isPending = localStorage.getItem(`verification_pending_${user.id}`);
    if (isPending) {
        setStatus('pending');
        return;
    }

    // 3. Se não é nada disso, está no início
    setStatus('initial');

  }, [prestadores, user, navigate]);


  const handleFileChange = (e) => {
    if(e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleEnviarAnalise = () => {
    if (!file) return alert("Por favor, anexe a foto do documento.");

    // Simula o envio
    // Salvamos uma "flag" no localStorage para lembrar que esse usuário pediu
    localStorage.setItem(`verification_pending_${user.id}`, "true");
    
    alert("Documento enviado com segurança! Nossa equipe fará a análise em até 24h.");
    setStatus('pending');
  };

  // --- COMPONENTES DE CADA ESTADO ---

  // 1. TELA DE SUCESSO (JÁ VERIFICADO)
  if (status === 'approved') {
    return (
      <div className="verificado-container">
        <Header navigate={navigate} />
        <div className="content-card">
            <div className="status-icon-box status-approved">
                <LuShieldCheck size={40} />
            </div>
            <h2 className="status-title">Conta Verificada!</h2>
            <p className="status-text">
                Parabéns! Sua identidade foi confirmada. O selo de verificado 
                já está visível no seu perfil para todos os clientes, aumentando 
                sua credibilidade na plataforma.
            </p>
            <button className="verify-btn" onClick={() => navigate('/home')}>Voltar para Home</button>
        </div>
      </div>
    );
  }

  // 2. TELA DE ESPERA (EM ANÁLISE)
  if (status === 'pending') {
    return (
      <div className="verificado-container">
        <Header navigate={navigate} />
        <div className="content-card">
            <div className="status-icon-box status-pending">
                <LuClock size={40} />
            </div>
            <h2 className="status-title">Em Análise</h2>
            <p className="status-text">
                Recebemos seus documentos. Nossa equipe de segurança está analisando 
                suas informações. Esse processo leva em média 24 horas úteis.
                <br/><br/>
                Você receberá uma notificação assim que for aprovado.
            </p>
            <button className="verify-btn" style={{backgroundColor: '#666'}} onClick={() => navigate('/conta')}>Voltar</button>
        </div>
      </div>
    );
  }

  // 3. TELA INICIAL (ENVIAR DOCUMENTO)
  return (
    <div className="verificado-container">
      <Header navigate={navigate} />
      
      <div className="content-card">
        <div className="status-icon-box status-initial">
            <LuShieldCheck size={40} />
        </div>
        <h2 className="status-title">Torne-se Verificado</h2>
        <p className="status-text">
            O selo de verificado transmite confiança para seus clientes. 
            Para obter, precisamos confirmar sua identidade.
        </p>

        <div className="instruction-box">
            <div className="instruction-title"><LuFileText /> Como funciona?</div>
            <ul className="instruction-list">
                <li>Tire uma foto segurando seu documento oficial (RG ou CNH) ao lado do rosto.</li>
                <li>Certifique-se de que a foto esteja nítida e legível.</li>
                <li>O documento deve ser o mesmo cadastrado no seu perfil.</li>
            </ul>
        </div>

      
        <div className="security-note">
            <LuLock size={20} style={{minWidth: '20px'}}/>
            <span>
                <strong>Seus dados estão seguros.</strong> Esta foto é usada 
                exclusivamente para verificação de identidade e é deletada 
                dos nossos servidores após a análise.
            </span>
        </div>

      
        <div className="upload-area">
            <input 
                type="file" 
                id="doc-selfie" 
                accept="image/*" 
                hidden 
                onChange={handleFileChange}
            />
            <label htmlFor="doc-selfie" className="upload-label">
                {file ? (
                    <>
                        <LuCheckCircle size={30} color="#28a745" />
                        <span className="file-name-display">{file.name}</span>
                        <span style={{fontSize:'0.8rem', marginTop:'5px'}}>Clique para trocar</span>
                    </>
                ) : (
                    <>
                        <LuUpload size={30} />
                        <span style={{fontWeight:'600', marginTop:'10px'}}>Toque para enviar foto</span>
                        <span style={{fontSize:'0.8rem'}}>JPG ou PNG</span>
                    </>
                )}
            </label>
        </div>

        <button className="verify-btn" onClick={handleEnviarAnalise} disabled={!file}>
            Enviar para Análise
        </button>

      </div>
    </div>
  );
}

// Componente Headerzinho interno para não repetir código
const Header = ({ navigate }) => (
    <header className="page-header-nav">
        <button onClick={() => navigate('/ContaUsuario')} className="back-btn">
            <LuChevronLeft size={30} />
        </button>
        <h2 className="page-header-title">Verificação</h2>
    </header>
);*/