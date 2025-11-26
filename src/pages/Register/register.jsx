import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    // Verifica se já existe algum usuário salvo
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verifica se o email já existe
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("Já existe um usuário com este e-mail!");
      return;
    }

    const newUser = { nome, email, senha, telefone };

    // Salva no localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuário cadastrado com sucesso!");
    navigate("/"); // Vai para login
  }

  return (
    <div className="login-container">
      <h2>Registra-se</h2>

      <form className="login-form" onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <button type="submit">Cadastrar</button>

        <p>
          Já tem conta? <a href="/">Voltar</a>
        </p>
      </form>
    </div>
  );
}
