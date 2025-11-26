import { Link } from "react-router-dom";

export default function Catalog() {
  const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];

  return (
    <div>
      <h1>Catálogo de Serviços</h1>

      {prestadores.length === 0 && <p>Nenhum prestador cadastrado.</p>}

      <ul>
        {prestadores.map(p => (
          <li key={p.id}>
            <h3>{p.nome}</h3>
            <p>Área: {p.area}</p>
            <p>Nome do Profissional: {p.nomeProfissional}</p>
            <p>Preço Médio: R$ {p.preco}</p>
            <Link to={`/prestador/${p.id}`}>Ver Perfil</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
