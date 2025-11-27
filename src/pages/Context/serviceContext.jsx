import { createContext, useState, useEffect } from "react";

export const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [prestadores, setPrestadores] = useState([]);

  useEffect(() => {
    // Prestadores fixos
    const fakeData = [
      {
        id: 1,
        nomeProfissional: "João Silva",
        email:"joao@gmail.com",
        area: "Eletricista",
        descricao: "Instalações elétricas em geral",
        preco: 120,
      },
      {
        id: 2,
        nomeProfissional: "Maria Santos",
        email:"maria@gmail.com",
        area: "Diarista",
        descricao: "Limpeza residencial e comercial",
        preco: 150,
      },
      {
        id: 3,
        nomeProfissional: "Carlos Andrade",
        email:"carlos@gmail.com",
        area: "Encanador",
        descricao: "Conserto de vazamentos e manutenção",
        preco: 180,
      }
    ];

    // Prestadores salvos no localStorage
    const localPrestadores =
      JSON.parse(localStorage.getItem("prestadores")) || [];

    // Junta os dois
    setPrestadores([...fakeData, ...localPrestadores]);
  }, []);

  const adicionarPrestador = (novoPrestador) => {
    setPrestadores((prev) => {
      const updated = [...prev, novoPrestador];

      // mantém salvo no localStorage
      localStorage.setItem("prestadores", JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <ServiceContext.Provider value={{ prestadores, adicionarPrestador }}>
      {children}
    </ServiceContext.Provider>
  );
}
