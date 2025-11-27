import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../../pages/Context/serviceContext.jsx";
import { serviceCategories } from "../../data/categories.js";
import { Link } from "react-router-dom";

export default function Catalog() {
  const { prestadores } = useContext(ServiceContext);
  const [prestadoresLista, setPrestadoresLista] = useState([]);
  const [search, setSearch] = useState("");


useEffect(() => {
  const storagePrestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));


  const dadosCombinados = [...prestadores, ...storagePrestadores];


  const semDuplicados = dadosCombinados.filter(
    (item, index, self) =>
      index === self.findIndex((p) => p.id === item.id)
  );

  const semMeuServico = semDuplicados.filter((p) => {
    if (!loggedUser) return true;
    return p.email !== loggedUser.email; 
  });

  setPrestadoresLista(semMeuServico);
}, [prestadores]);


  const filteredPrestadores = prestadoresLista.filter((p) => {
    const termo = search.toLowerCase();

    return (
      p.nomeProfissional.toLowerCase().includes(termo) ||
      p.area.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="catalog-container">
      <h2>Catálogo de Serviços</h2>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar por nome, área ou palavra-chave..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <h3>Categorias disponíveis</h3>
      <div className="category-list">
        {serviceCategories.map((cat) => (
          <span key={cat} className="category-chip">
            {cat}
          </span>
        ))}
      </div>

      <h3>Prestadores encontrados</h3>

      <div className="prestadores-list">
        {filteredPrestadores.length === 0 ? (
          <p>Nenhum serviço encontrado…</p>
        ) : (
          filteredPrestadores.map((p) => (
            <div key={p.id} className="prestador-card">
              <h4>{p.nomeProfissional}</h4>
              <p><strong>Área:</strong> {p.area}</p>
              <p><strong>Descrição:</strong> {p.descricao}</p>
              <p><strong>Preço médio:</strong> R$ {p.preco}</p>

              <Link to={`/prestador/${p.id}`}>Ver Perfil</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
