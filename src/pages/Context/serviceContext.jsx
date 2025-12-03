import { createContext, useState, useEffect } from "react";

export const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [prestadores, setPrestadores] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const fakeData = [
  {
    id: 1,
    usuarioId: 0, // 0 = prestador fictício
    nomeProfissional: "João Silva",
    email: "joao@gmail.com",
    area: "Eletricista",
    descricao: "Instalações elétricas em geral",
    preco: "120.00",
    img: "https://i.pravatar.cc/150?img=11",
    category: "Reforma",
    verified: true,
    urgent: true,
    calendar: true,
    cpf: "",
    dadosAgenda: {
      tipo: "contato",
      link: ""
    },
    extraInfo: {
      Serviços: "2 opções disponíveis",
      Disponibilidade: "Disponível com agenda"
    },
    listaServicos: [
      { id: 101, nome: "Instalação simples", preco: "120.00" },
      { id: 102, nome: "Reparo elétrico", preco: "180.00" }
    ]
  },

  {
    id: 2,
    usuarioId: 0,
    nomeProfissional: "Maria Santos",
    email: "maria@gmail.com",
    area: "Diarista",
    descricao: "Limpeza residencial e comercial",
    preco: "150.00",
    img: "https://i.pravatar.cc/150?img=5",
    category: "Limpeza",
    verified: true,
    urgent: false,
    calendar: true,
    cpf: "",
    dadosAgenda: {
      tipo: "contato",
      link: ""
    },
    extraInfo: {
      Serviços: "3 opções disponíveis",
      Disponibilidade: "Atende Imediato"
    },
    listaServicos: [
      { id: 201, nome: "Limpeza básica", preco: "150.00" },
      { id: 202, nome: "Limpeza pesada", preco: "250.00" },
      { id: 203, nome: "Limpeza pós-obra", preco: "350.00" }
    ]
  },

  {
    id: 3,
    usuarioId: 0,
    nomeProfissional: "Carlos Andrade",
    email: "carlos@gmail.com",
    area: "Técnico de TI",
    descricao: "Conserto de computadores e suporte técnico",
    preco: "180.00",
    img: "https://i.pravatar.cc/150?img=3",
    category: "Tecnologia",
    verified: true,
    urgent: true,
    calendar: true,
    cpf: "",
    dadosAgenda: {
      tipo: "contato",
      link: ""
    },
    extraInfo: {
      Serviços: "3 opções disponíveis",
      Disponibilidade: "Atende Imediato"
    },
    listaServicos: [
      { id: 301, nome: "Formatação", preco: "120.00" },
      { id: 302, nome: "Limpeza interna", preco: "150.00" },
      { id: 303, nome: "Troca de peças", preco: "180.00" }
    ]
  }
];

 useEffect(() => {
    loadPrestadores();
  }, [trigger]); 
  
  const loadPrestadores = () => {
    const localPrestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
    const listaCompleta = [...fakeData, ...localPrestadores];
    const listaUnica = listaCompleta.filter((item, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
    );
    setPrestadores(listaUnica);
  };

 const adicionarPrestador = (novoPrestador) => {
    const localPrestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
    const atualizadoLocal = [...localPrestadores, novoPrestador];
    localStorage.setItem("prestadores", JSON.stringify(atualizadoLocal));
    setTrigger(prev => prev + 1); // Força recarregamento
  };

 const atualizarPrestador = (prestadorAtualizado) => {
    const localPrestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
    
    // Encontra e atualiza o prestador
    const atualizadoLocal = localPrestadores.map(p => 
      p.id === prestadorAtualizado.id ? { ...p, ...prestadorAtualizado } : p
    );
    
    localStorage.setItem("prestadores", JSON.stringify(atualizadoLocal));
    setTrigger(prev => prev + 1); // Força recarregamento
  };
  return (
     <ServiceContext.Provider value={{ 
      prestadores, 
      adicionarPrestador, 
      atualizarPrestador, // Exporta a nova função
      loadPrestadores // Exporta também para recarregamento manual
    }}>
      {children}
    </ServiceContext.Provider>
  );
}