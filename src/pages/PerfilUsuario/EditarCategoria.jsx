import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuChevronLeft } from "react-icons/lu";
import "../../styles/perfil.css";

export default function EditarCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState("");
  const [profissao, setProfissao] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("loggedUser");
    if (storedData) {
      const user = JSON.parse(storedData);
      setCategoria(user.categoria || "");
      setProfissao(user.profissao || "");
    }
  }, []);

  const handleSave = () => {
    const storedData = localStorage.getItem("loggedUser");
    if (storedData) {
      const user = JSON.parse(storedData);
     
      const updatedUser = { ...user, categoria, profissao };
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
      navigate('/perfil'); 
    }
  };

  const PageContent = () => (
    <>
      <header className="page-header-nav">
        <button onClick={() => navigate('/perfil')} className="back-btn">
            <LuChevronLeft size={28} />
        </button>
        <h2 className="page-header-title">Editar Categoria</h2>
      </header>

      <div className="form-container">
        <div className="form-group">
            <label className="form-label">Categoria Principal</label>
          
            <input 
                type="text" 
                className="form-input" 
                placeholder="Ex: Tecnologia, Reforma..."
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label className="form-label">Profissão / Especialidade</label>
             <input 
                type="text" 
                className="form-input" 
                placeholder="Ex: Desenvolvedora, Eletricista..."
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
            />
        </div>

        <button className="save-btn" onClick={handleSave}>Salvar Alterações</button>
      </div>
    </>
  );

  return (
    <div className="perfil-container">
      {window.innerWidth >= 768 ? <div className="pc-card-wrapper"><PageContent/></div> : <PageContent/>}
    </div>
  );
}