export default function SolicitacoesRecebidas() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se esse usuário é um prestador
  const meuPrestador = prestadores.find(p => p.usuarioId === loggedUser.id);

  if (!meuPrestador) {
    return <p>Você não é um prestador, portanto não tem solicitações recebidas.</p>;
  }

  // Solicitações para esse prestador
  const minhasSolicitacoes = solicitacoes.filter(
    s => s.prestadorId === meuPrestador.id
  );

  function atualizarStatus(id, status) {
    const lista = [...solicitacoes];
    const index = lista.findIndex(s => s.id === id);

    lista[index].status = status;

    localStorage.setItem("solicitacoes", JSON.stringify(lista));
    window.location.reload();
  }

  return (
    <div>
      <h2>Solicitações Recebidas</h2>

      {minhasSolicitacoes.length === 0 ? (
        <p>Nenhuma solicitação recebida ainda.</p>
      ) : (
        minhasSolicitacoes.map(s => {
          const cliente = usuarios.find(u => u.id === s.usuarioId);

          return (
            <div key={s.id} className="solicitacao-card">
              <p><strong>Cliente:</strong> {cliente?.nome}</p>
              <p><strong>Data:</strong> {s.data}</p>
              <p><strong>Tipo:</strong> {s.tipoServico}</p>

              <select
                value={s.status}
                onChange={e => atualizarStatus(s.id, e.target.value)}
              >
                <option value="Pendente">Pendente</option>
                <option value="Aceito">Aceito</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
          );
        })
      )}
    </div>
  );
}
