import { useState } from "react";

export default function SolicitacoesPrestador() {
  const prestadorLogado = JSON.parse(localStorage.getItem("prestadorLogado"));

  const [solicitacoes, setSolicitacoes] = useState(
    JSON.parse(localStorage.getItem("solicitacoes")) || []
  );

  const minhas = solicitacoes.filter(
    (s) => s.prestadorId === prestadorLogado.id
  );

  function atualizarStatus(id, novoStatus) {
    const novasSolicitacoes = solicitacoes.map((s) =>
      s.id === id ? { ...s, status: novoStatus } : s
    );

    setSolicitacoes(novasSolicitacoes);
    localStorage.setItem("solicitacoes", JSON.stringify(novasSolicitacoes));
  }

  return (
    <div>
      <h2>Minhas Solicitações</h2>

      {minhas.length === 0 && <p>Nenhuma solicitação encontrada.</p>}

      {minhas.map((s) => (
        <div key={s.id} style={{ marginBottom: 20 }}>
          <p><strong>Cliente ID:</strong> {s.clienteId}</p>
          <p><strong>Data:</strong> {s.dataSolicitada}</p>
          <p><strong>Tipo:</strong> {s.tipoServico}</p>
          <p><strong>Status atual:</strong> {s.status}</p>

          <select
            value={s.status}
            onChange={(e) => atualizarStatus(s.id, e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Aceito">Aceito</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
      ))}
    </div>
  );
}
