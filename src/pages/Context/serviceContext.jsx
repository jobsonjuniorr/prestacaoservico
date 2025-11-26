import { createContext, useState, useEffect } from "react";

// Criando o contexto
export const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  // Lista de prestadores (pode vir de API futuramente)
  const [prestadores, setPrestadores] = useState([]);

  // Simulação de carregamento inicial
  useEffect(() => {
    // Aqui futuramente você pode buscar via API
    const fakeData = [
      {
        id: 1,
        nomeProfissional: "João Silva",
        area: "Eletricista",
        descricao: "Instalações elétricas em geral",
        preco: 120,
        disponibilidade: "Seg–Sex"
      },
      {
        id: 2,
        nomeProfissional: "Maria Santos",
        area: "Diarista",
        descricao: "Limpeza residencial e comercial",
        preco: 150,
        disponibilidade: "Seg–Sáb"
      },
      {
        id: 3,
        nomeProfissional: "Carlos Andrade",
        area: "Encanador",
        descricao: "Conserto de vazamentos e manutenção",
        preco: 180,
        disponibilidade: "Todos os dias"
      }
    ];

    setPrestadores(fakeData);
  }, []);

  // Função para adicionar novos prestadores (caso tenha cadastro)
  const adicionarPrestador = (novoPrestador) => {
    setPrestadores((prev) => [...prev, novoPrestador]);
  };

  return (
    <ServiceContext.Provider
      value={{
        prestadores,
        adicionarPrestador
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
