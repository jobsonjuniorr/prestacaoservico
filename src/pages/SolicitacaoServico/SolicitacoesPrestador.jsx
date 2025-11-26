export default function SolicitacoesPrestador() {
  const prestadorLogado = JSON.parse(localStorage.getItem("loggedUser"));
  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];

  // Solicitações recebidas apenas para este prestador
  const recebidas = solicitacoes.filter(
    s => s.prestadorId === prestadorLogado.id
  );

  function atualizarStatus(id, novoStatus) {
    const atualizadas = solicitacoes.map(s =>
      s.id === id ? { ...s, status: novoStatus } : s
    );

    localStorage.setItem("solicitacoes", JSON.stringify(atualizadas));
    window.location.reload(); // recarrega a página para atualizar
  }

  return (
    <div>
      <h1>Solicitações Recebidas</h1>

      {recebidas.length === 0 ? (
        <p>Nenhuma solicitação recebida.</p>
      ) : (
        recebidas.map(s => (
          <div key={s.id} style={{ border: "1px solid #ccc", padding: 10, margin: "10px 0" }}>
            <p><strong>Cliente ID:</strong> {s.clienteId}</p>
            <p><strong>Data solicitada:</strong> {s.dataSolicitada}</p>
            <p><strong>Serviço:</strong> {s.tipoServico}</p>
            <p><strong>Status:</strong> {s.status}</p>

            {/* Botões de atualização */}
            <button onClick={() => atualizarStatus(s.id, "Aceito")}>
              Aceitar
            </button>

            <button onClick={() => atualizarStatus(s.id, "Em andamento")}>
              Em andamento
            </button>

            <button onClick={() => atualizarStatus(s.id, "Concluído")}>
              Concluído
            </button>
          </div>
        ))
      )}
    </div>
  );
}
