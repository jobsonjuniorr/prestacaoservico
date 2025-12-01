import React, { useState, useEffect, useContext } from 'react';
import { FaCheckCircle, FaTimesCircle, FaIdCard, FaUserShield } from 'react-icons/fa';
import { ServiceContext } from "../Context/serviceContext.jsx";
import "../../styles/admin.css";
import "../../styles/global.css";

export default function AdminPanel() {
  const { prestadores, setPrestadores } = useContext(ServiceContext);
  const [pendentes, setPendentes] = useState([]);

  useEffect(() => {
    // Filtra apenas os que NÃO estão verificados
    const naoVerificados = prestadores.filter(p => !p.verified);
    setPendentes(naoVerificados);
  }, [prestadores]);

  const aprovarPrestador = (id) => {
    // 1. Atualiza a lista localmente
    const novaLista = prestadores.map(prestador => {
      if (prestador.id === id) {
        return { ...prestador, verified: true }; // Vira verdadeiro
      }
      return prestador;
    });

    // 2. Salva no Contexto (se seu contexto tiver setPrestadores)
    // Se não tiver, precisamos salvar no localStorage direto e forçar update
    if (setPrestadores) {
        setPrestadores(novaLista);
    } else {
        // Fallback caso o contexto não exponha o setter
        localStorage.setItem("prestadores", JSON.stringify(novaLista));
        window.location.reload(); // Recarrega para aplicar
    }
    
    alert("Prestador aprovado com sucesso!");
  };

 const verDocumento = (url) => {
    if (url) {
        window.open(url, "_blank"); // Abre a foto numa nova aba
    } else {
        alert("Este prestador não anexou documento (Cadastro antigo ou erro).");
    }
};

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1><FaUserShield /> Painel Administrativo Local+</h1>
        <p>Gerenciamento de solicitações de prestadores</p>
      </header>

      <div className="admin-content">
        <h2>Solicitações Pendentes ({pendentes.length})</h2>

        {pendentes.length === 0 ? (
          <div className="empty-state">
            <FaCheckCircle size={50} color="#28a745" />
            <p>Tudo limpo! Nenhuma solicitação pendente.</p>
          </div>
        ) : (
          <div className="pending-list">
            {pendentes.map((p) => (
              <div key={p.id} className="request-card">
                <div className="request-info">
                  <h3>{p.nomeProfissional}</h3>
                  <span className="badge-category">{p.category}</span>
                  <p><strong>CPF:</strong> {p.cpf}</p>
                  <p><strong>Serviços:</strong> {p.extraInfo?.Serviços || "N/A"}</p>
                </div>
                
                <div className="request-actions">
                  <button className="btn-doc" onClick={() => verDocumento(p.docUrl)}>
                   <FaIdCard /> Ver Doc
                   </button>
                  <button className="btn-approve" onClick={() => aprovarPrestador(p.id)}>
                    <FaCheckCircle /> Aprovar
                  </button>
                  <button className="btn-reject" onClick={() => alert("Função de rejeitar (apenas visual)")}>
                    <FaTimesCircle /> Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}