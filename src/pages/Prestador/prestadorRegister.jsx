import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrestadorRegister() {
  
  const usuarioLogado = JSON.parse(localStorage.getItem("loggedUser")); // ← ADICIONADO

  const [nome, setNome] = useState("");
  const [area, setArea] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Verifica se existe usuário logado
    if (!usuarioLogado) {
      alert("Você precisa estar logado para se cadastrar como prestador.");
      return navigate("/");
    }

    const novoPrestador = {
      id: Date.now(),
      usuarioId: usuarioLogado.id, // ← VINCULADO AO USUÁRIO
      nomeProfissional: nome,
      area,
      descricao,
      preco,
      disponibilidade,
    };

    const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
    prestadores.push(novoPrestador);
    localStorage.setItem("prestadores", JSON.stringify(prestadores));

    alert("Prestador cadastrado com sucesso!");
    navigate("/catalog");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Prestador</h2>

      <input
        placeholder="Nome profissional"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder="Área de atuação"
        value={area}
        onChange={e => setArea(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />

      <input
        type="number"
        placeholder="Preço médio"
        value={preco}
        onChange={e => setPreco(e.target.value)}
      />

      <input
        placeholder="Disponibilidade"
        value={disponibilidade}
        onChange={e => setDisponibilidade(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
