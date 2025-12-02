import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "../../styles/help.css";
export default function Help() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const items = [
    {
      question: "Como me cadastrar como prestador de serviço?",
      answer: `
        Para se cadastrar como prestador, siga estas etapas:

1. Clique no seu nome ou ícone de perfil no canto superior esquerdo.
    No menu, selecione "Começar a prestar serviços".

2. Preencha seus dados pessoais
    Informe seu CPF.
    Envie a foto do seu documento (RG ou CNH).

3. Configure seu perfil profissional
    Escolha sua categoria principal.
    Informe seu cargo ou especialidade.
    Escreva uma descrição profissional.

4. Adicione seus serviços
    Cadastre entre 3 e 5 serviços.
    Cada serviço deve ter nome e preço.

5. Defina sua disponibilidade
    Atendimento imediato.
    Ou atendimento com agenda (contato direto ou link externo).

6. Finalize o cadastro
    Clique em "Finalizar Cadastro".
    Aguarde a validação do administrador.
          `,
    },
    {
      question: "Como solicitar um serviço?",
      answer: `1. Como funciona a escolha do prestador?

Na tela inicial, você pode:

Buscar um profissional pelo nome ou área.
Filtrar por: "Disponível imediato", "Disponível com agenda", ou "Verificado".
Clicar em qualquer prestador para ver mais detalhes.

Ao acessar o perfil do prestador, você verá:

Foto e nome
Área de atuação
Disponibilidade
Botão "Contratar" no final da página

Esse botão leva você para a tela de solicitação.

2. Como solicitar um serviço?

Ao clicar em "Solicitar o Serviço", você deve preencher:
 
Data desejada
Tipo do serviço
(ex.: limpeza pesada, troca de disjuntor, instalação de prateleira)

Clique em "Enviar Solicitação".

Ao confirmar, aparece a mensagem:

“Solicitação enviada com sucesso!”

E você é redirecionado para a Home.`
    },
    {
      question: "Onde eu vejo minhas solicitações?",
      answer:
        `Para acompanhar suas solicitações:

1. Clique no seu nome ou ícone de perfil no canto superior esquerdo.
2. No menu, selecione "Seu Perfil".
3. Toque em "Minhas Solicitações".

Lá você verá todas as solicitações enviadas, com:

Nome do prestador
Data solicitada
Status do pedido`,
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ajuda</h1>
      <p style={{ marginBottom: "20px" }}>Como podemos ajudar você?</p>

      <div className="help-container">
        {items.map((item, index) => (
          <div key={index} className="help-box">
            <button
              className="help-question"
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`icon ${open === index ? "rotate" : ""}`}
                size={20}
              />
            </button>

            <p className={`help-answer ${open === index ? "open" : ""}`}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
