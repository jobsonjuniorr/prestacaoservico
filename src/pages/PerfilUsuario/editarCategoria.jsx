import React, { useState, useEffect, useRef } from "react";
import { LuPencil } from "react-icons/lu";
import "../../styles/global.css";
import "../../styles/editarCategoria.css";

export default function EditarCategoria() {
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

      const byCategoriaProp = arr.findIndex(
        (it) => it && ("categoria" in it || "category" in it)
      );
      if (byCategoriaProp !== -1) return byCategoriaProp;

      const bySomeId = arr.findIndex(
        (it) => it && (it.id || it.usuarioId || it.nomeProfissional)
      );
      if (bySomeId !== -1) return bySomeId;

      return -1;
    }

    if (Array.isArray(parsed)) {
      const idx = findIndexInArray(parsed);
      if (idx !== -1) {
        const found = parsed[idx];
        // normaliza a categoria
        const normalized = {
          ...found,
          categoria: found.categoria || found.category || "",
        };
        setPrestador(normalized);
        setOriginalFormat("array");
        setArrayIndex(idx);
      } else {
        setPrestador(null);
        setOriginalFormat("array");
        setArrayIndex(null);
      }
    } else if (typeof parsed === "object") {
      const normalized = {
        ...parsed,
        categoria: parsed.categoria || parsed.category || "",
      };
      setPrestador(normalized);
      setOriginalFormat("object");
    } else {
      setPrestador(null);
      setOriginalFormat(null);
    }
  }, []);

  useEffect(() => {
    if (!editMode) {
      setHeight(contentRef.current?.scrollHeight + "px");
    } else {
      setHeight("auto");
    }
  }, [prestador, editMode]);

  if (!prestador) {
    return (
      <div className="categoria-container">
        <div className="categoria-title-row">
          <h3 className="data-title">Categoria profissional</h3>
        </div>
        <p className="categoria-text">
          Dados do prestador não encontrados no localStorage.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setPrestador((prev) => ({
      ...prev,
      categoria: e.target.value,
    }));
  };

  const saveChanges = () => {
    try {
      const raw = localStorage.getItem("prestadores");
      const parsed = raw ? JSON.parse(raw) : null;

      if (originalFormat === "object") {
        const newObj = { ...parsed, ...prestador, category: prestador.categoria };
        localStorage.setItem("prestadores", JSON.stringify(newObj));
      } else if (originalFormat === "array") {
        if (!Array.isArray(parsed)) {
          localStorage.setItem("prestadores", JSON.stringify([prestador]));
        } else if (arrayIndex >= 0 && arrayIndex < parsed.length) {
          const newArr = [...parsed];
          newArr[arrayIndex] = {
            ...newArr[arrayIndex],
            ...prestador,
            category: prestador.categoria,
          };
          localStorage.setItem("prestadores", JSON.stringify(newArr));
        }
      } else {
        localStorage.setItem(
          "prestadores",
          JSON.stringify({ ...prestador, category: prestador.categoria })
        );
      }

      setEditMode(false);
      alert("Categoria atualizada!");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar.");
    }
  };

  return (
    <div className="categoria-container">
      <div className="categoria-title-row">
        <h3 className="data-title">Categoria profissional</h3>

        {!editMode && (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            <LuPencil size={20} />
          </button>
        )}
      </div>

      {/* ----- BLOCO COM EFEITO ----- */}
      <div
        ref={contentRef}
        className="categoria-accordion"
      >
        <div className="categoria-now">
          {editMode ? (
            <select
              className="select-field categoria-text"
              value={prestador.categoria || ""}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Reformas">Reformas</option>
              <option value="Beleza">Beleza</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Aulas">Aulas</option>
              <option value="Saúde">Saúde</option>
            </select>
          ) : (
            <p className="categoria-text">
              {prestador.categoria?.trim()
                ? prestador.categoria
                : "Nenhuma categoria selecionada."}
            </p>
          )}
        </div>
      </div>

      {editMode && (
        <div className="edit-actions">
          <button
            className="categoria-cancelar-btn"
            onClick={() => setEditMode(false)}
          >
            Cancelar
          </button>

          <button className="categoria-dados-btn" onClick={saveChanges}>
            Salvar
          </button>
        </div>
      )}
    </div>
  );
}
