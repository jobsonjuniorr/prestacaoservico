import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function PrestadorRegister() {
  const usuarioLogado = JSON.parse(localStorage.getItem("loggedUser"));

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState(""); // ← NOVO CAMPO
  const [area, setArea] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");

  const navigate = useNavigate();

  // Preencher nome + email automaticamente ao abrir a página
  useEffect(() => {
    if (usuarioLogado) {
      setNome(usuarioLogado.nome);
      setEmail(usuarioLogado.email);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!usuarioLogado) {
      alert("Você precisa estar logado para se cadastrar como prestador.");
      return navigate("/");
    }

    const novoPrestador = {
      id: Date.now(),
      usuarioId: usuarioLogado.id,
      nomeProfissional: nome,
      email: email,   // ← EMAIL SALVO NO LOCALSTORAGE
      area,
      descricao,
      preco,
      disponibilidade,
    };

    const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
    prestadores.push(novoPrestador);
    localStorage.setItem("prestadores", JSON.stringify(prestadores));

    alert("Prestador cadastrado com sucesso!");
    navigate("/home");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Prestador</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        disabled
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled // ← Usuário não altera o email
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
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Preço médio"
        className="no-arrows"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        onWheel={(e) => e.target.blur()}
      />
      <select
        value={disponibilidade}
        onChange={(e) => setDisponibilidade(e.target.value)}
      >
        <option value="">Selecione a disponibilidade</option>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
        <option value="Noite">Noite</option>
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
