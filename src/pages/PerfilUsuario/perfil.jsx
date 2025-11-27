import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("loggedUser");
    if (!data) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(data));
  }, []);

  if (!user) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Meu Perfil</h2>

      <div style={styles.card}>
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>E-mail:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.telefone}</p>
        <p><strong>CPF:</strong> {user.cpf}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "40px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "320px",
    fontSize: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    lineHeight: "30px",
  },
};
