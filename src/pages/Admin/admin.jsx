import React, { useState, useEffect, useContext } from 'react';
import "../../styles/admin.css"; 
import { FaCheckCircle, FaTimesCircle, FaIdCard, FaUserShield, FaTrash } from 'react-icons/fa';
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function AdminPanel() {
  const { prestadores, setPrestadores } = useContext(ServiceContext);
  
  // Separamos em duas listas visuais
  const [pendentes, setPendentes] = useState([]);
  const [aprovados, setAprovados] = useState([]);

  useEffect(() => {
    // Atualiza as listas sempre que os dados mudam
    setPendentes(prestadores.filter(p => !p.verified));
    setAprovados(prestadores.filter(p => p.verified));
  }, [prestadores]);

  // Função genérica para mudar o status (Serve para Aprovar ou Revogar)
  const toggleStatusVerificado = (id, novoStatus) => {
    // 1. Cria a nova lista atualizada
    const novaLista = prestadores.map(prestador => {
      if (prestador.id === id) {
        return { ...prestador, verified: novoStatus }; 
      }
      return prestador;
    });

    // 2. Atualiza o Contexto e o LocalStorage
    setPrestadores(novaLista); // O ServiceContext já deve ter a lógica de salvar no useEffect dele
    
    // Força salvamento manual no localStorage para garantir
    localStorage.setItem("prestadores", JSON.stringify(novaLista));

    alert(novoStatus ? "Prestador Verificado com sucesso!" : "Verificado removido com sucesso!");
  };

  const verDocumento = (url) => {
    // Se for link real (Cloudinary) abre, se não, mostra o alerta
    if (url && url.startsWith("http")) {
        window.open(url, "_blank");
    } else {
        alert("Simulação: Visualizando documento anexado...\n[Status: Documento Válido]");
    }
  };

  const excluirPrestador = (id) => {
      if(window.confirm("Tem certeza que deseja excluir este prestador do sistema?")) {
          const novaLista = prestadores.filter(p => p.id !== id);
          setPrestadores(novaLista);
          localStorage.setItem("prestadores", JSON.stringify(novaLista));
      }
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1><FaUserShield /> Painel Administrativo Local+</h1>
        <p>Gerencie quem recebe o selo de verificado</p>
      </header>

      <div className="admin-content">
        
        {/* --- SEÇÃO 1: PENDENTES --- */}
        <section>
            <h2 style={{borderBottom: '2px solid orange', paddingBottom: '10px', display:'inline-block'}}>
                Solicitações Pendentes ({pendentes.length})
            </h2>

            {pendentes.length === 0 ? (
            <p className="empty-msg">Nenhuma solicitação nova.</p>
            ) : (
            <div className="pending-list">
                {pendentes.map((p) => (
                <div key={p.id} className="request-card pending-card">
                    <div className="request-info">
                        <h3>{p.nomeProfissional}</h3>
                        <span className="badge-category">{p.category}</span>
                        <p><strong>CPF:</strong> {p.cpf || "Não informado"}</p>
                    </div>
                    
                    <div className="request-actions">
                        <button className="btn-doc" onClick={() => verDocumento(p.docUrl)}>
                            <FaIdCard /> Doc
                        </button>
                        <button className="btn-approve" onClick={() => toggleStatusVerificado(p.id, true)}>
                            <FaCheckCircle /> Aprovar
                        </button>
                        <button className="btn-reject" onClick={() => excluirPrestador(p.id)}>
                            <FaTrash /> Excluir
                        </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </section>

        {/* --- SEÇÃO 2: APROVADOS (Para você remover se quiser) --- */}
        <section style={{ marginTop: '50px' }}>
            <h2 style={{borderBottom: '2px solid green', paddingBottom: '10px', display:'inline-block'}}>
                Prestadores Verificados ({aprovados.length})
            </h2>

            {aprovados.length === 0 ? (
            <p className="empty-msg">Nenhum prestador verificado ainda.</p>
            ) : (
            <div className="pending-list">
                {aprovados.map((p) => (
                <div key={p.id} className="request-card approved-card">
                    <div className="request-info">
                        <h3>{p.nomeProfissional} <FaCheckCircle color="green"/></h3>
                        <span className="badge-category">{p.category}</span>
                        <p><strong>Email:</strong> {p.email}</p>
                    </div>
                    
                    <div className="request-actions">
                        {/* Botão para tirar o verificado */}
                        <button className="btn-reject" onClick={() => toggleStatusVerificado(p.id, false)}>
                            <FaTimesCircle /> Revogar Verificado
                        </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </section>

      </div>
    </div>
  );
}