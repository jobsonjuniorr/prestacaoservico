import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/verificado.css";
import { 
  LuChevronLeft, LuShieldCheck, LuClock, LuFileText, 
  LuUpload, LuLock, LuCircleCheck 
} from "react-icons/lu";
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function Verificado() {
  const navigate = useNavigate();
  const { prestadores } = useContext(ServiceContext);
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [status, setStatus] = useState('loading');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user || !user.id) { // Verifica se o usuário e o ID existem
      navigate('/login');
      return;
    }

  
    const prestadorEncontrado = prestadores.find(p => 
        p.usuarioId && String(p.usuarioId) === String(user.id)
    );

    if (prestadorEncontrado) {
        if (prestadorEncontrado.verified) {
            setStatus('approved');
            return;
        } else {
            // É prestador mas não verificado = Em análise 
            setStatus('pending');
            return;
        }
    }

    // Se não for prestador, verifica a flag de envio avulso
    const isPending = localStorage.getItem(`verification_pending_${user.id}`);
    if (isPending) {
        setStatus('pending');
        return;
    }

    // Se chegou até aqui, é um usuário novo limpo
    setStatus('initial');

  }, [prestadores, user, navigate]);


  const handleFileChange = (e) => {
    if(e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleEnviarAnalise = () => {
    if (!file) return alert("Por favor, anexe a foto do documento.");

    // Salva a flag com o ID do usuário para não perder se der refresh
    localStorage.setItem(`verification_pending_${user.id}`, "true");
    
    alert("Documento enviado com segurança! Nossa equipe fará a análise.");
    setStatus('pending');
  };

  
  if (status === 'approved') {
    return (
      <div className="verificado-container">
        <Header navigate={navigate} />
        <div className="content-card">
          <div className="status-icon-box status-approved">
            <LuShieldCheck size={45} />
          </div>
          <h2 className="status-title">Conta Verificada!</h2>
          <p className="status-text">
            Parabéns! Sua identidade foi confirmada. O selo de verificado 
            <LuShieldCheck style={{verticalAlign: 'middle', color:'#28a745', marginLeft:5}}/> 
            já está visível no seu perfil.
          </p>
          <button className="verify-btn" style={{backgroundColor: '#28a745'}} onClick={() => navigate('/home')}>
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }


  if (status === 'pending') {
    return (
      <div className="verificado-container">
        <Header navigate={navigate} />
        <div className="content-card">
          <div className="status-icon-box status-pending">
            <LuClock size={45} />
          </div>
          <h2 className="status-title">Em Análise</h2>
          <p className="status-text">
            Recebemos seus documentos.
            <br/><br/>
            Nossa equipe está analisando as informações.
            <br/>
            <strong>Prazo estimado:</strong> 24 horas úteis.
          </p>
          <div className="security-note">
            <LuLock size={16}/> Seus dados estão seguros.
          </div>
          <button className="verify-btn" style={{backgroundColor: '#666', marginTop: 20}} onClick={() => navigate('/ContaUsuario')}>
            Voltar para Minha Conta
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="verificado-container">
      <Header navigate={navigate} />
      
      <div className="content-card">
        <div className="status-icon-box status-initial">
            <LuShieldCheck size={40} />
        </div>
        <h2 className="status-title">Verificação de Identidade</h2>
        <p className="status-text">
            Para garantir a segurança da plataforma, precisamos confirmar quem você é.
        </p>

        <div className="instruction-box">
          <div className="instruction-title">
            <LuFileText size={20} />
            <span>Instruções:</span>
          </div>
          <ul className="instruction-list">
            <li>Envie uma foto segurando seu <strong>RG ou CNH</strong> ao lado do rosto.</li>
            <li>Certifique-se de que os dados estejam legíveis.</li>
          </ul>
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
                <LuCircleCheck size={32} color="#28a745" />
                <span className="file-name-display">{file.name}</span>
                <span style={{fontSize:'0.8rem', color:'#666'}}>Clique para trocar</span>
              </>
            ) : (
              <>
                <LuUpload size={32} />
                <span style={{fontWeight:'600', marginTop:'10px'}}>Toque para enviar foto</span>
              </>
            )}
          </label>
        </div>

        <button 
          className="verify-btn" 
          onClick={handleEnviarAnalise} 
          disabled={!file}
        >
          {file ? "Enviar para Análise" : "Selecione uma foto"}
        </button>
      </div>
    </div>
  );
}

const Header = ({ navigate }) => (
  <header className="page-header-nav">
    <button onClick={() => navigate(-1)} className="back-btn">
      <LuChevronLeft size={28} />
    </button>
    <h2 className="page-header-title">Verificação</h2>
  </header>
);