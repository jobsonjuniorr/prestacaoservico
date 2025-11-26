export default function MinhasSolicitacoes() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];

  const minhasSolicitacoes = solicitacoes.filter(
    (s) => s.usuarioId === usuarioLogado.id
  );

  return (
    <div>
      <h2>Minhas Solicitações</h2>

      {minhasSolicitacoes.length === 0 ? (
        <p>Você ainda não fez nenhuma solicitação.</p>
      ) : (
        minhasSolicitacoes.map((s) => {
          const prestador = prestadores.find((p) => p.id === s.prestadorId);

          return (
            <div key={s.id} className="solicitacao-card">
              <p><strong>Prestador:</strong> {prestador?.nomeProfissional}</p>
              <p><strong>Data:</strong> {s.data}</p>
              <p><strong>Serviço:</strong> {s.tipoServico}</p>
              <p><strong>Status:</strong> {s.status}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
