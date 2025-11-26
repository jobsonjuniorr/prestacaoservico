import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("Já existe um usuário com este e-mail!");
      return;
    }

    const newUser = { nome, email, senha, telefone, cpf };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  }

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister}>

        <div className="flex-column">
          <label>Nome</label>
        </div>
        <div className="inputForm">
          {/* Ícone de usuário */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a8.38 8.38 0 0113 0" />
          </svg>
          <input
            className="input"
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>E-mail</label>
        </div>
        <div className="inputForm">
          {/* Ícone de email */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16v16H4z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <input
            className="input"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Senha</label>
        </div>
        <div className="inputForm">
          {/* Ícone de senha */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          <input
            className="input"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Telefone</label>
        </div>
        <div className="inputForm">
          {/* Ícone de telefone */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.21.39 2.39.75 3.5a2 2 0 01-.45 2.11L9 10.91a16 16 0 006 6l1.57-1.57a2 2 0 012.11-.45c1.11.36 2.29.62 3.5.75a2 2 0 012 2z"></path>
          </svg>
          <input
            className="input"
            type="tel"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>CPF</label>
        </div>
        <div className="inputForm">
          {/* Ícone de CPF (usando um documento) */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <line x1="7" y1="15" x2="17" y2="15"></line>
          </svg>
          <input
            className="input"
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            maxLength={14} // para formato ###.###.###-##
          />
        </div>

        <button type="submit" className="button-submit">
          Cadastrar
        </button>

        <p className="p">
          Já tem conta? <a href="/" className="span">Voltar</a>
        </p>
      </form>
    </div>
  );
}
