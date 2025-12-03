import React, { useState, useEffect, useRef } from "react";
import { LuPencil, LuFileText, LuX, LuCheck, LuChevronLeft } from "react-icons/lu";
import "../../styles/global.css";
import "../../styles/editarDescriacaoPrestador.css";
import { useNavigate } from "react-router-dom";

export default function DescricaoPrestador() {
  const [prestador, setPrestador] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [originalFormat, setOriginalFormat] = useState(null);
  const [arrayIndex, setArrayIndex] = useState(null);

  const navigate = useNavigate();

  // Lógica de carregamento (Mantida igual para garantir funcionamento)
  useEffect(() => {
    const raw = localStorage.getItem("prestadores");
    if (!raw) return;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("erro ao parsear prestadores:", err);
      return;
    }

    function findIndexInArray(arr) {
      const loggedRaw = localStorage.getItem("loggedUser");
      if (loggedRaw) {
        try {
          const logged = JSON.parse(loggedRaw);
          if (logged) {
            const byUsuarioId = arr.findIndex(
              (it) =>
                it &&
                it.usuarioId !== undefined &&
                (String(it.usuarioId) === String(logged.usuarioId) ||
                  String(it.usuarioId) === String(logged.id))
            );
            if (byUsuarioId !== -1) return byUsuarioId;

            const byEmail = arr.findIndex(
              (it) => it && it.email && logged.email && it.email === logged.email
            );
            if (byEmail !== -1) return byEmail;

            const byCpf = arr.findIndex(
              (it) => it && it.cpf && logged.cpf && it.cpf === logged.cpf
            );
            if (byCpf !== -1) return byCpf;
          }
        } catch {}
      }
      const byDescricaoProp = arr.findIndex((it) => it && "descricao" in it);
      if (byDescricaoProp !== -1) return byDescricaoProp;
      const bySomeId = arr.findIndex(
        (it) => it && (it.id || it.usuarioId || it.nomeProfissional)
      );
      if (bySomeId !== -1) return bySomeId;
      return -1;
    }

    if (Array.isArray(parsed)) {
      const idx = findIndexInArray(parsed);
      if (idx !== -1) {
        setPrestador(parsed[idx]);
        setOriginalFormat("array");
        setArrayIndex(idx);
      } else {
        setPrestador(null);
      }
    } else if (typeof parsed === "object") {
      setPrestador(parsed);
      setOriginalFormat("object");
    } else {
      setPrestador(null);
    }
  }, []);

  const handleChange = (e) => {
    setPrestador((prev) => ({
      ...prev,
      descricao: e.target.value,
    }));
  };

  const saveChanges = () => {
    try {
      const raw = localStorage.getItem("prestadores");
      const parsed = raw ? JSON.parse(raw) : null;

      if (originalFormat === "object") {
        const newObj = { ...parsed, ...prestador };
        localStorage.setItem("prestadores", JSON.stringify(newObj));
      } else if (originalFormat === "array") {
        if (!Array.isArray(parsed)) {
          localStorage.setItem("prestadores", JSON.stringify([prestador]));
        } else if (arrayIndex >= 0 && arrayIndex < parsed.length) {
          const newArr = [...parsed];
          newArr[arrayIndex] = { ...newArr[arrayIndex], ...prestador };
          localStorage.setItem("prestadores", JSON.stringify(newArr));
        }
      } else {
        localStorage.setItem("prestadores", JSON.stringify(prestador));
      }

      setEditMode(false);
      // Opcional: Adicionar um Toast de sucesso aqui
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar.");
    }
  };

  if (!prestador) return null;

  return (
    <div className="descricao-card">

    <header className="page-header-fixed">
            <button onClick={() => navigate("/perfil")} className="back-btn-simple">
              <LuChevronLeft size={28} />
            </button>
            <h2>Editar Categoria</h2>
          </header>
          {/* Espaçamento para compensar header fixo */}
          <div style={{ height: "70px" }}></div>

      <div className="card-header">
        <div className="header-icon-title">
          <div className="icon-box">
            <LuFileText size={22} color="#1A8BF0" />
          </div>
          <h3 className="card-title">Sobre mim</h3>
        </div>

        {!editMode && (
          <button className="icon-btn" onClick={() => setEditMode(true)} title="Editar descrição">
            <LuPencil size={18} />
          </button>
        )}
      </div>

      <div className="card-content">
        {editMode ? (
          <div className="edit-wrapper animate-fade">
            <textarea
              className="custom-textarea"
              rows={6}
              placeholder="Conte aos clientes sobre sua experiência, especialidades e como você trabalha..."
              value={prestador.descricao || ""}
              onChange={handleChange}
              autoFocus
            />
            <div className="char-count">
              {(prestador.descricao || "").length} caracteres
            </div>
            
            <div className="action-buttons">
              <button className="btn-cancel" onClick={() => setEditMode(false)}>
                <LuX size={18} /> Cancelar
              </button>
              <button className="btn-save" onClick={saveChanges}>
                <LuCheck size={18} /> Salvar Alterações
              </button>
            </div>
          </div>
        ) : (
          <div className="view-wrapper animate-fade">
            {prestador.descricao && prestador.descricao.trim().length > 0 ? (
              <p className="description-text">{prestador.descricao}</p>
            ) : (
              <div className="empty-state" onClick={() => setEditMode(true)}>
                <p>Você ainda não adicionou uma descrição.</p>
                <span>Toque para escrever sobre você</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}