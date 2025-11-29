import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

import { ServiceContext } from "../Context/serviceContext.jsx";

export default function PrestadorRegister() {
  const usuarioLogado = JSON.parse(localStorage.getItem("loggedUser"));

  const { adicionarPrestador } = useContext(ServiceContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");

  // novos campos:
  const [urgent, setUrgent] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [extraUrgent, setExtraUrgent] = useState("");
  const [extraCalendar, setExtraCalendar] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioLogado) {
      setNome(usuarioLogado.nome);
      setEmail(usuarioLogado.email);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const novoPrestador = {
      id: Date.now(),
      usuarioId: usuarioLogado.id,
      nomeProfissional: nome,
      email,
      area,
      descricao,
      preco,
      img: "https://cdn.create.vista.com/api/media/small/51405259/stock-vector-male-avatar-profile-picture-use-for-social-website-vector",
      category: area,
      verified: false,
      urgent,
      calendar,

      extraInfo: {
        Disponibilidade: extraUrgent || "Verificar com prestador",
        Agenda: extraCalendar || "Disponível imediato"
      }
    };

    // Atualiza via contexto
    adicionarPrestador(novoPrestador);

    alert("Prestador cadastrado com sucesso!");
    navigate("/home");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Prestador</h2>

      <input value={nome} disabled />
      <input value={email} disabled />

      <input
        placeholder="Área de atuação"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
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

      <label>
        Atende urgência?
        <input
          type="checkbox"
          checked={urgent}
          onChange={() => setUrgent(!urgent)}
        />
      </label>

      <input
        placeholder="Mensagem sobre urgência"
        value={extraUrgent}
        onChange={(e) => setExtraUrgent(e.target.value)}
      />

      <label>
        Agenda flexível?
        <input
          type="checkbox"
          checked={calendar}
          onChange={() => setCalendar(!calendar)}
        />
      </label>

      <input
        placeholder="Mensagem sobre agenda"
        value={extraCalendar}
        onChange={(e) => setExtraCalendar(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
