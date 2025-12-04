import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";
import user from "../../data/users"; 
import logo from "../../assets/logo.png"; 
import { useAlert } from "../Notifications/ToastContext.jsx";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];


    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      showAlert("Já existe um usuário com este e-mail!", "error");
      return;
    }

    
    const cpfExists =
      (user && user.find((u) => u.cpf === cpf)) || users.find((u) => u.cpf === cpf);

    if (cpfExists) {
      showAlert("Este CPF já está cadastrado.", "error");
      return;
    }

    setCpfError("");

 
    const newUser = { 
        id: Date.now(), 
        nome, 
        email, 
        senha, 
        telefone, 
        cpf,
        isAdmin: false 
    };

   
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

  
    localStorage.setItem("loggedUser", JSON.stringify(newUser));

    showAlert("Seja bem vindo ao sistema", "success");
    navigate("/home"); 
  }

  function formatTelefone(value) {
    value = value.replace(/\D/g, "");
    if (value.length <= 2) return `(${value}`;
    if (value.length <= 9) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 9)}-${value.slice(9, 11)}`;
  }

  function formatCPF(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  }

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister}>

    
        <img src={logo} alt="Logo" className="logo" />

        <div className="flex-column">
          <label>Nome</label>
        </div>
        <div className="inputForm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
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
          <label>WhatsApp</label>
        </div>
        <div className="inputForm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 018.5-8.5 8.5 8.5 0 018.5 8.5z"/>
</svg>
          <input
            className="input"
            type="tel"
            placeholder="Digite seu WhatsApp"
            value={telefone}
            onChange={(e) => setTelefone(formatTelefone(e.target.value))}
            required
          />
        </div>

        <div className="flex-column">
          <label>CPF</label>
        </div>
        <div className="inputForm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <line x1="7" y1="15" x2="17" y2="15"></line>
          </svg>

          <input
            className={`input ${cpfError ? "input-error" : ""}`}
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => {
              setCpf(formatCPF(e.target.value));
              setCpfError("");
            }}
            required
            maxLength={14}
          />
        </div>

        {cpfError && <p className="error-text">{cpfError}</p>}

        <button type="submit" className="button-submit">
          Cadastrar
        </button>

        <p className="p">
          Já tem conta? <a href="/login" className="span">Faça login</a>
        </p>

        <button className="google-btn">
          <svg
            xmlSpace="preserve"
            viewBox="0 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FBBB00"
              d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
            c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
            C103.821,274.792,107.225,292.797,113.47,309.408z"
            ></path>
            <path
              fill="#518EF8"
              d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
            c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
            c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176z"
            ></path>
            <path
              fill="#28B446"
              d="M416.253,455.624c-43.857,35.277-99.587,56.376-160.253,56.376
            c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
            c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
            ></path>
            <path
              fill="#F14336"
              d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
            c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276C71.23,56.123,157.06,0,256,0
            C318.115,0,375.068,22.126,419.404,58.936z"
            ></path>
          </svg>
          Entrar com Google
        </button>
      </form>
    </div>
  );
}