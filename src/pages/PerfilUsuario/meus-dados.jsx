import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LuChevronLeft, LuCamera, LuPencil, LuUser, 
  LuMail, LuPhone, LuFileText, LuX, LuCheck 
} from "react-icons/lu";
import "../../styles/meusdados.css";
import "../../styles/global.css";

const placeholderUserImg = "https://cdn.create.vista.com/api/media/small/51405259/stock-vector-male-avatar-profile-picture-use-for-social-website-vector";

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
  
  // Formatadores 
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
    if (name === "telefone") formattedValue = formatTelefone(value);
    setUser((prev) => ({ ...prev, [name]: formattedValue }));
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
    alert("Dados atualizados com sucesso!");
  };

  return (
    <div className="meusdados-page">
      
      {/* HEADER */}
      <header className="page-header-simple">
        <button onClick={() => navigate("/perfil")} className="back-btn-simple">
          <LuChevronLeft size={28} />
        </button>
        <h2>Meus Dados</h2>
      </header>

      {/* CARD PRINCIPAL */}
      <div className="meusdados-card">
        
        {/* SEÇÃO HERO (FOTO) */}
        <div className="hero-section">
          <div className="avatar-wrapper">
            <img
              src={user.fotoPreview || user.img || placeholderUserImg}
              alt="Foto de Perfil"
              className="avatar-img"
            />
            {editMode && (
              <>
                <label htmlFor="file-upload" className="camera-btn">
                  <LuCamera size={18} />
                </label>
                <input id="file-upload" type="file" accept="image/*" hidden />
              </>
            )}
          </div>
          <h3 className="user-name-title">{user.nome}</h3>
          <p className="user-role-subtitle">Cliente Local+</p>
        </div>

        {/* BARRA DE TÍTULO DA SEÇÃO */}
        <div className="section-divider">
          <span className="divider-label">Informações Pessoais</span>
          {!editMode && (
            <button className="icon-edit-btn" onClick={() => setEditMode(true)}>
              <LuPencil size={18} />
            </button>
          )}
        </div>

        {/* FORMULÁRIO / DADOS */}
        <div className="form-content">
          
          {/* Campo Nome */}
          <div className="input-group">
            <label className="input-label"><LuUser size={14}/> Nome Completo</label>
            {editMode ? (
              <input
                type="text"
                name="nome"
                className="custom-input"
                value={user.nome}
                onChange={handleChange}
              />
            ) : (
              <div className="view-value">{user.nome}</div>
            )}
          </div>

          {/* Campo Email */}
          <div className="input-group">
            <label className="input-label"><LuMail size={14}/> E-mail</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                className="custom-input"
                value={user.email}
                onChange={handleChange}
              />
            ) : (
              <div className="view-value">{user.email}</div>
            )}
          </div>

          {/* Campo Telefone */}
          <div className="input-group">
            <label className="input-label"><LuPhone size={14}/> Telefone</label>
            {editMode ? (
              <input
                type="text"
                name="telefone"
                className="custom-input"
                value={user.telefone}
                onChange={handleChange}
              />
            ) : (
              <div className="view-value">{user.telefone}</div>
            )}
          </div>

          {/* Campo CPF */}
          <div className="input-group">
            <label className="input-label"><LuFileText size={14}/> CPF</label>
            {editMode ? (
              <input
                type="text"
                name="cpf"
                className="custom-input"
                value={user.cpf}
                onChange={handleCpfChange}
                maxLength={14}
              />
            ) : (
              <div className="view-value">{user.cpf}</div>
            )}
          </div>

          {/* AÇÕES */}
          {editMode && (
            <div className="action-buttons animate-fade">
              <button className="btn-cancel" onClick={() => setEditMode(false)}>
                <LuX size={18} /> Cancelar
              </button>
              <button className="btn-save" onClick={saveChanges}>
                <LuCheck size={18} /> Salvar
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}