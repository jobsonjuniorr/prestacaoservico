import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
      (user) => user.email === email && user.senha === senha
    );

    if (userFound) {
      localStorage.setItem("loggedUser", JSON.stringify(userFound));
      navigate("/home"); // Redireciona para a Home
    } else {
      alert("E-mail ou senha incorretos!");
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleLogin}>
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

        <button type="submit">Entrar</button>

        <p>
          Não tem conta? <a href="/register">Registrar</a>
        </p>
      </form>
    </div>
  );
}
