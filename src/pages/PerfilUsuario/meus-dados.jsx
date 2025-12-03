import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuChevronLeft, LuCamera, LuPencil } from "react-icons/lu";
import "../../styles/meusdados.css";
import "../../styles/global.css";

const placeholderUserImg =
  "https://cdn.create.vista.com/api/media/small/51405259/stock-vector-male-avatar-profile-picture-use-for-social-website-vector";

export default function MeusDados() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("loggedUser");
    if (!data) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(data));
  }, [navigate]);

  if (!user) return null;
  
  function formatTelefone(value) {
    value = value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) return `(${value}`;
    if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "telefone") {
      formattedValue = formatTelefone(value);
    }

    setUser((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setUser({ ...user, cpf: value });
  };

  const saveChanges = () => {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    setEditMode(false);
    alert("Dados atualizados!");
  };

  return (
    <div className="meusdados perfil-container">

      {/* HEADER */}
      <header className="page-header-nav">
        <button onClick={() => navigate("/ContaUsuario")} className="back-btn">
          <LuChevronLeft size={28} />
        </button>
        <h2 className="page-header-title">Seus dados</h2>
      </header>

      {/* CARD DO USUÁRIO */}
      <section className="user-hero">
        <div className="hero-img-wrapper">
          <img
            src={user.fotoPreview || user.img || placeholderUserImg}
            alt="Foto de Perfil"
            className="hero-profile-img"
          />

          <label htmlFor="file-upload" className="edit-photo-btn">
            <LuCamera />
          </label>
          <input id="file-upload" type="file" accept="image/*" />
        </div>

        <div className="profile-card">
          <h3>{user.nome}</h3>
          <p>Seus dados pessoais</p>
        </div>
      </section>

      {/* SEÇÃO DE DADOS */}
      <div className="content-section">

        <div className="data-title-row">
          <h3 className="data-title">Informações</h3>

          {!editMode && (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              <LuPencil size={20} />
            </button>
          )}
        </div>

        {/* NOME */}
        <div className="data-row">
          <span className="data-label">Nome:</span>
          {editMode ? (
            <input
              type="text"
              name="nome"
              value={user.nome}
              onChange={handleChange}
              className="input-dados"
            />
          ) : (
            <span className="data-value">{user.nome}</span>
          )}
        </div>

        {/* EMAIL */}
        <div className="data-row">
          <span className="data-label">Email:</span>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="input-dados"
            />
          ) : (
            <span className="data-value">{user.email}</span>
          )}
        </div>

        {/* TELEFONE */}
        <div className="data-row">
          <span className="data-label">Telefone:</span>
          {editMode ? (
            <input
              type="text"
              name="telefone"
              value={user.telefone}
              onChange={handleChange}
              className="input-dados"
            />
          ) : (
            <span className="data-value">{user.telefone}</span>
          )}
        </div>

        {/* CPF */}
        <div className="data-row">
          <span className="data-label">CPF:</span>
          {editMode ? (
            <input
              type="text"
              name="cpf"
              value={user.cpf}
              onChange={handleCpfChange}
              className="input-dados"
              maxLength={14}
            />
          ) : (
            <span className="data-value">{user.cpf}</span>
          )}
        </div>

        {/* BOTÕES */}
        {editMode && (
          <div className="edit-actions">
            <button className="cancelar-btn" onClick={() => setEditMode(false)}>
              Cancelar
            </button>

            <button className="dados-btn" onClick={saveChanges}>
              Salvar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
