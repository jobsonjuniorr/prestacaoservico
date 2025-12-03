import React, { useState, useEffect } from "react";
import { 
  LuPencil, LuBriefcase, LuX, LuCheck, 
  LuSparkles, LuMonitor, LuHammer, LuPalette, 
  LuBookOpen, LuHeartPulse, LuCalendarDays, LuDog, LuBus, 
  LuLeaf, LuWrench, LuUtensils, LuClipboardList, LuCar, 
  LuBaby, LuDumbbell, LuChevronLeft, LuLock 
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/editarCategoria.css";

export default function EditarCategoria() {
  const [prestador, setPrestador] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [editMode, setEditMode] = useState(false);
  const [originalFormat, setOriginalFormat] = useState(null);
  const [arrayIndex, setArrayIndex] = useState(null);

  const navigate = useNavigate();

  // Lista de Categorias
  const categories = [
    { name: "Limpeza", icon: <LuSparkles /> },
    { name: "Tecnologia", icon: <LuMonitor /> },
    { name: "Reforma", icon: <LuHammer /> },
    { name: "Beleza", icon: <LuPalette /> },
    { name: "Aulas", icon: <LuBookOpen /> },
    { name: "Saúde", icon: <LuHeartPulse /> },            
    { name: "Eventos", icon: <LuCalendarDays /> },        
    { name: "Pets", icon: <LuDog /> },                    
    { name: "Transporte", icon: <LuBus /> },              
    { name: "Jardinagem", icon: <LuLeaf /> },             
    { name: "Consertos", icon: <LuWrench /> },            
    { name: "Cozinha", icon: <LuUtensils /> },            
    { name: "Administrativo", icon: <LuClipboardList /> },
    { name: "Automotivo", icon: <LuCar /> },              
    { name: "Babá / Cuidados", icon: <LuBaby /> },        
    { name: "Fitness", icon: <LuDumbbell /> }, 
  ];

  useEffect(() => {
    const raw = localStorage.getItem("prestadores");
   
    if (!raw) {
        setLoading(false);
        return;
    }

    let parsed;
    try { parsed = JSON.parse(raw); } catch { 
        setLoading(false);
        return; 
    }

    function findIndex(arr) {
      const logged = JSON.parse(localStorage.getItem("loggedUser") || "null");
      if (!logged) return -1;

      // Procura por ID ou Email
      let byId = arr.findIndex(it => String(it?.usuarioId) === String(logged.usuarioId) || String(it?.usuarioId) === String(logged.id));
      if (byId !== -1) return byId;

      return arr.findIndex(it => it?.email === logged.email);
    }

    if (Array.isArray(parsed)) {
      const idx = findIndex(parsed);
      if (idx !== -1) {
        const found = parsed[idx];
        setPrestador({
          ...found,
          categoria: found.categoria || found.category || "",
          area: found.area || found.role || ""
        });
        setOriginalFormat("array");
        setArrayIndex(idx);
      }
    } else {
       // Caso seja um objeto único (legado)
       const logged = JSON.parse(localStorage.getItem("loggedUser") || "null");
       if (logged && (parsed.email === logged.email || String(parsed.usuarioId) === String(logged.id))) {
           setPrestador({
             ...parsed,
             categoria: parsed.categoria || parsed.category || "",
             area: parsed.area || parsed.role || ""
           });
           setOriginalFormat("object");
       }
    }
    
    setLoading(false); // Finaliza o carregamento
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestador((p) => ({ ...p, [name]: value }));
  };

  const saveChanges = () => {
    try {
      const raw = localStorage.getItem("prestadores");
      const parsed = raw ? JSON.parse(raw) : null;

      const updated = {
        ...prestador,
        category: prestador.categoria,
        area: prestador.area
      };

      if (originalFormat === "object") {
        localStorage.setItem("prestadores", JSON.stringify({ ...parsed, ...updated }));
      } else {
        const arr = Array.isArray(parsed) ? parsed : [];
        if (arrayIndex !== null) {
            arr[arrayIndex] = { ...arr[arrayIndex], ...updated };
            localStorage.setItem("prestadores", JSON.stringify(arr));
        }
      }

      setEditMode(false);
      alert("Categoria atualizada com sucesso!");
    } catch {
      alert("Erro ao salvar.");
    }
  };

  if (loading) return null; 


  if (!prestador) {
    return (
      <div className="categoria-page">
        <header className="page-header-fixed">
          <button onClick={() => navigate("/perfil")} className="back-btn-simple">
            <LuChevronLeft size={28} />
          </button>
          <h2>Categoria</h2>
        </header>
        <div style={{ height: "70px" }}></div>

        <div className="categoria-card restricted-card">
          <div className="warning-icon-box">
             <LuLock size={40} />
          </div>
          <h3>Você não é um prestador</h3>
          <p>
            A edição de categoria e profissão é exclusiva para parceiros que prestam serviços na plataforma.
          </p>
          <button 
            className="btn-become-provider"
            onClick={() => navigate('/prestador/register')}
          >
            Quero ser um prestador
          </button>
        </div>
      </div>
    );
  }

 
  return (
    <div className="categoria-page">

      {/* HEADER */}
      <header className="page-header-fixed">
        <button onClick={() => navigate("/perfil")} className="back-btn-simple">
          <LuChevronLeft size={28} />
        </button>
        <h2>Editar Categoria</h2>
      </header>
      <div style={{ height: "70px" }}></div>

      <div className="categoria-card">

        <div className="card-header">
          <div className="header-icon-title">
            <div className="icon-box">
              <LuBriefcase size={22} color="#1A8BF0" />
            </div>
            <h3 className="card-title">Dados Profissionais</h3>
          </div>

          {!editMode && (
            <button className="icon-btn" onClick={() => setEditMode(true)}>
              <LuPencil size={18} />
            </button>
          )}
        </div>

        <div className="card-content">
          {editMode ? (
            <div className="edit-wrapper animate-fade">

              <div className="input-group">
                <label className="input-label">Cargo / Profissão</label>
                <input
                  type="text"
                  name="area"
                  className="custom-input"
                  placeholder="Ex: Eletricista"
                  value={prestador.area}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Categoria Principal</label>
                <div className="select-wrapper">
                    <select
                      name="categoria"
                      className="custom-select"
                      value={prestador.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Selecione...</option>
                      {categories.map((c, i) => (
                        <option key={i} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-cancel" onClick={() => setEditMode(false)}>
                  <LuX size={18} /> Cancelar
                </button>
                <button className="btn-save" onClick={saveChanges}>
                  <LuCheck size={18} /> Salvar
                </button>
              </div>

            </div>
          ) : (
            <div className="view-wrapper animate-fade">

              <div className="info-display-row">
                <span className="info-label">Cargo:</span>
                <span className="info-value big-text">
                  {prestador.area || <i className="placeholder-text">Não informado</i>}
                </span>
              </div>

              <div className="info-display-row">
                <span className="info-label">Categoria:</span>
                <span className="category-badge">
                  {prestador.categoria || "Sem categoria"}
                </span>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}