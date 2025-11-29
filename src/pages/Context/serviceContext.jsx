import { createContext, useState, useEffect } from "react";

export const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [prestadores, setPrestadores] = useState([]);

  // Prestadores fixos
  const fakeData = [
    {
      id: 1,
      nomeProfissional: "João Silva",
      email: "joao@gmail.com",
      area: "Eletricista",
      descricao: "Instalações elétricas em geral",
      preco: 120,
      img: "https://i.pravatar.cc/150?img=11",
      category: "Reforma",
      verified: true,
      urgent: true,
      calendar: true,
      extraInfo: {
        Disponibilidade: "Disponível imediato",
        Agenda: "Verificar com prestador"
      }
    },
    {
      id: 2,
      nomeProfissional: "Maria Santos",
      email: "maria@gmail.com",
      area: "Diarista",
      descricao: "Limpeza residencial e comercial",
      preco: 150,
      img: "https://i.pravatar.cc/150?img=5",
      category: "Limpeza",
      rating: 5,
      reviews: 210,
      verified: true,
      urgent: true,
      calendar: true,
      extraInfo: {
        Disponibilidade: "Disponível imediato",
        Agenda: "Verificar com prestador"
      }
    },
    {
      id: 3,
      nomeProfissional: "Carlos Andrade",
      email: "carlos@gmail.com",
      area: "Técnico de TI",
      descricao: "Conserto de vazamentos e manutenção",
      preco: 180,
      img: "https://i.pravatar.cc/150?img=3",
      category: "Tecnologia",
      rating: 5,
      reviews: 89,
      verified: true,
      urgent: true,
      calendar: false,
      extraInfo: {
        Disponibilidade: "Disponível imediato",
        Agenda: "Verificar com prestador"
      }
    },
  ];

  useEffect(() => {
    const localPrestadores = JSON.parse(localStorage.getItem("prestadores")) || [];

    setPrestadores([...fakeData, ...localPrestadores]);
  }, []);

  const adicionarPrestador = (novoPrestador) => {

    const localPrestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
    const atualizadoLocal = [...localPrestadores, novoPrestador];

    localStorage.setItem("prestadores", JSON.stringify(atualizadoLocal));

    setPrestadores(prev => [...prev, novoPrestador]);
  };

  return (
    <ServiceContext.Provider value={{ prestadores, adicionarPrestador }}>
      {children}
    </ServiceContext.Provider>
  );
}
