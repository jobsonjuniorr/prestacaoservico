import React, { useState, useEffect, useRef } from "react";
import { LuPencil } from "react-icons/lu";
import "../../styles/global.css";
import "../../styles/editarDescriacaoPrestador.css";

export default function DescricaoPrestador() {
  const [prestador, setPrestador] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [originalFormat, setOriginalFormat] = useState(null);
  const [arrayIndex, setArrayIndex] = useState(null);

  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const raw = localStorage.getItem("prestadores");
    if (!raw) return;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("erro ao parsear prestadores do localStorage:", err);
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
                (it.usuarioId !== undefined) &&
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

      const bySomeId = arr.findIndex((it) => it && (it.id || it.usuarioId || it.nomeProfissional));
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
        setOriginalFormat("array");
        setArrayIndex(null);
      }
    } else if (typeof parsed === "object") {
      setPrestador(parsed);
      setOriginalFormat("object");
    } else {
      setPrestador(null);
      setOriginalFormat(null);
    }
  }, []);

  useEffect(() => {
    // animação do accordion quando abre/fecha
    if (!editMode) {
      setHeight(contentRef.current?.scrollHeight + "px");
    } else {
      setHeight("auto"); 
    }
  }, [prestador, editMode]);

  if (!prestador) {
    return (
      <div className="descricao-container">
        <div className="descricao-title-row">
          <h3 className="data-title">Descrição do profissional</h3>
        </div>
        <p className="descricao-text">Dados do prestador não encontrados no localStorage.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setPrestador((prev) => ({
      ...prev,
      descricao: e.target.value
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
        } else {
          console.error("Não foi possível identificar o índice correto para salvar.");
          return;
        }
      } else {
        localStorage.setItem("prestadores", JSON.stringify(prestador));
      }

      setEditMode(false);
      alert("Descrição atualizada!");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar.");
    }
  };

  return (
    <div className="descricao-container">
      <div className="descricao-title-row">
        <h3 className="data-title">Descrição do profissional</h3>

        {!editMode && (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            <LuPencil size={20} />
          </button>
        )}
      </div>

      {/* ----- BLOCO COM EFEITO ----- */}
      <div
        ref={contentRef}
        className="descricao-accordion"
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div className="descricao-row">
          {editMode ? (
            <textarea
              className="textarea-dados"
              rows={5}
              value={prestador.descricao || ""}
              onChange={handleChange}
            />
          ) : (
            <p className="descricao-text">
              {prestador.descricao?.trim()
                ? prestador.descricao
                : "Nenhuma descrição adicionada."}
            </p>
          )}
        </div>
      </div>

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
  );
}
