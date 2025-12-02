import React, { useState, useEffect, useContext } from 'react';
import "../../styles/admin.css"; 
import { FaCheckCircle, FaTimesCircle, FaIdCard, FaUserShield, FaTrash, FaBan } from 'react-icons/fa';
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function AdminPanel() {
  const { prestadores, setPrestadores } = useContext(ServiceContext);
  
  const [pendentes, setPendentes] = useState([]);
  const [aprovados, setAprovados] = useState([]);

  useEffect(() => {
    setPendentes(prestadores.filter(p => !p.verified));
    setAprovados(prestadores.filter(p => p.verified));
  }, [prestadores]);

  const toggleStatusVerificado = (id, novoStatus) => {
    const novaLista = prestadores.map(prestador => {
      if (prestador.id === id) return { ...prestador, verified: novoStatus }; 
      return prestador;
    });
    setPrestadores(novaLista);
    localStorage.setItem("prestadores", JSON.stringify(novaLista));
    alert(novoStatus ? "Verificado com sucesso!" : "Verificado removido!");
  };

  const verDocumento = (url) => {
    if (url && url.startsWith("http")) window.open(url, "_blank");
    else alert("Simulação: Visualizando documento...\n[Documento Válido]");
  };

  // --- NOVA FUNÇÃO: BANIR CONTA E PRESTADOR ---
  const banirUsuario = (prestador) => {
      if(window.confirm(`ATENÇÃO: Isso excluirá a conta de "${prestador.nomeProfissional}" permanentemente. Ele não poderá mais fazer login e o serviço sumirá. Confirmar?`)) {
          
          // 1. Remove da lista de Prestadores (Home)
          const novaListaPrestadores = prestadores.filter(p => p.id !== prestador.id);
          setPrestadores(novaListaPrestadores);
          localStorage.setItem("prestadores", JSON.stringify(novaListaPrestadores));

          // 2. Remove da lista de Usuários (Login)
          // Precisamos buscar onde os usuários estão salvos (geralmente "users" ou "users_db")
          const usersDB = JSON.parse(localStorage.getItem("users")) || []; 
          const novaListaUsuarios = usersDB.filter(u => u.id !== prestador.usuarioId);
          localStorage.setItem("users", JSON.stringify(novaListaUsuarios)); // Atualiza o banco de login

          // Se estiver usando "users_db" em vez de "users", descomente abaixo:
          // const usersDB2 = JSON.parse(localStorage.getItem("users_db")) || [];
          // const novaListaUsuarios2 = usersDB2.filter(u => u.id !== prestador.usuarioId);
          // localStorage.setItem("users_db", JSON.stringify(novaListaUsuarios2));

          alert("Conta banida e serviço removido com sucesso.");
      }
  }

  // Função apenas para remover o SERVIÇO (mas manter a conta de usuário)
  const excluirServico = (id) => {
      if(window.confirm("Remover apenas o serviço deste prestador da lista? (A conta de usuário continuará existindo)")) {
          const novaLista = prestadores.filter(p => p.id !== id);
          setPrestadores(novaLista);
          localStorage.setItem("prestadores", JSON.stringify(novaLista));
      }
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1><FaUserShield /> Painel Administrativo Local+</h1>
        <p>Gerencie prestadores e usuários</p>
      </header>

      <div className="admin-content">
        
        {/* PENDENTES */}
        <section>
            <h2 style={{borderBottom: '2px solid orange', paddingBottom: '10px', display:'inline-block'}}>
                Solicitações Pendentes ({pendentes.length})
            </h2>

            {pendentes.length === 0 ? <p className="empty-msg">Nenhuma solicitação.</p> : (
            <div className="pending-list">
                {pendentes.map((p) => (
                <div key={p.id} className="request-card pending-card">
                    <div className="request-info">
                        <h3>{p.nomeProfissional}</h3>
                        <span className="badge-category">{p.category}</span>
                        <p><strong>CPF:</strong> {p.cpf || "N/A"}</p>
                    </div>
                    <div className="request-actions">
                        <button className="btn-doc" onClick={() => verDocumento(p.docUrl)} title="Ver Documento"><FaIdCard /></button>
                        <button className="btn-approve" onClick={() => toggleStatusVerificado(p.id, true)} title="Aprovar"><FaCheckCircle /></button>
                        
                        {/* Botão Banir/Excluir */}
                        <button className="btn-reject" onClick={() => banirUsuario(p)} title="Banir Conta e Serviço">
                            <FaBan /> Banir
                        </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </section>

        {/* APROVADOS */}
        <section style={{ marginTop: '50px' }}>
            <h2 style={{borderBottom: '2px solid green', paddingBottom: '10px', display:'inline-block'}}>
                Prestadores Verificados ({aprovados.length})
            </h2>

            {aprovados.length === 0 ? <p className="empty-msg">Nenhum verificado.</p> : (
            <div className="pending-list">
                {aprovados.map((p) => (
                <div key={p.id} className="request-card approved-card">
                    <div className="request-info">
                        <h3>{p.nomeProfissional} <FaCheckCircle color="green"/></h3>
                        <span className="badge-category">{p.category}</span>
                        <p style={{fontSize:'0.8rem', color:'#666'}}>{p.email}</p>
                    </div>
                    <div className="request-actions">
                        <button className="btn-reject" onClick={() => toggleStatusVerificado(p.id, false)} title="Remover Verificado">
                            <FaTimesCircle /> Revogar
                        </button>
                        
                        {/* Botão Banir/Excluir */}
                        <button className="btn-reject" style={{borderColor:'red', color:'red'}} onClick={() => banirUsuario(p)} title="Excluir Conta Permanentemente">
                            <FaTrash /> Excluir Conta
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