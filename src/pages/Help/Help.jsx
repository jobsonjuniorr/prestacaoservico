import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/help.css";
import { 
  LuChevronDown, 
  LuChevronLeft, 
  LuCircleHelp, 
  LuShieldCheck, 
  LuWallet, 
  LuUserCog, 
  LuBriefcase,
  LuMail
} from "react-icons/lu";

export default function Help() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  // Organizei as perguntas por Seções para ficar mais fácil de ler
  const faqSections = [
    {
      title: "Para Clientes",
      icon: <LuUserCog className="section-icon" />,
      items: [
        {
          question: "Como solicitar um serviço?",
          answer: `É simples! Na tela inicial:\n
1. Busque pelo nome do profissional ou categoria.\n2. Use os filtros para encontrar quem está disponível agora.\n3. Entre no perfil do prestador e clique em "Solicitar".\n4. Informe a data e o tipo de serviço.\n\nPronto! O prestador receberá seu pedido.`
        },
        {
          question: "O pagamento é feito pelo aplicativo?",
          answer: `Atualmente, o Local+ funciona como uma plataforma de conexão. \n\nO pagamento deve ser combinado diretamente com o prestador (Dinheiro, PIX ou Cartão) após a realização do serviço. Nós não cobramos taxas sobre a transação no momento.`
        },
        {
          question: "Como sei se o prestador aceitou?",
          answer: `Você pode acompanhar tudo pelo menu "Minhas Solicitações".\n\nQuando o prestador aceitar ou recusar, o status do pedido mudará automaticamente lá.`
        }
      ]
    },
    {
      title: "Para Prestadores",
      icon: <LuBriefcase className="section-icon" />,
      items: [
        {
          question: "Como me cadastrar como prestador?",
          answer: `1. Vá no seu perfil e clique em "Começar a prestar serviços".\n2. Envie sua foto de documento (RG/CNH).\n3. Escolha sua categoria e descreva seus serviços.\n4. Defina se atende com hora marcada ou imediato.\n\nApós enviar, nossa equipe analisará seu perfil em até 24h.`
        },
        {
          question: "O que é o selo de Verificado?",
          answer: `O selo azul de verificado indica que confirmamos a identidade daquele profissional através de documentos oficiais. Isso aumenta muito a confiança dos clientes e destaca seu perfil nas buscas.`
        },
        {
          question: "Posso editar meus serviços depois?",
          answer: `Sim! Acesse seu perfil de prestador, clique no ícone de edição (lápis) e você poderá alterar preços, descrição e disponibilidade a qualquer momento.`
        }
      ]
    },
    {
      title: "Segurança e Conta",
      icon: <LuShieldCheck className="section-icon" />,
      items: [
        {
          question: "Esqueci minha senha, e agora?",
          answer: `Na tela de login, clique em "Esqueci minha senha". Enviaremos um link para o seu e-mail cadastrado para que você possa redefinir sua senha com segurança.`
        },
        {
          question: "É seguro contratar pelo Local+?",
          answer: `Nós nos esforçamos para manter a comunidade segura. Recomendamos sempre contratar prestadores com o selo "Verificado" e verificar as avaliações (estrelas) deixadas por outros clientes antes de fechar negócio.`
        }
      ]
    }
  ];

  return (
    <div className="help-page-container">
      
      {/* Header com Botão Voltar */}
      <header className="help-header">
  <button onClick={() => navigate('/home')} className="back-btn">
    <LuChevronLeft size={30} />
  </button>
  <div style={{ width: 30 }}></div>
</header>


      <div className="help-content">
        
        <div className="help-intro">
          <LuCircleHelp size={40} className="intro-icon"/>
          <h3>Como podemos ajudar?</h3>
          <p>Tire suas dúvidas sobre o funcionamento da plataforma.</p>
        </div>

        {/* Mapeando as seções */}
        {faqSections.map((section, secIndex) => (
          <div key={secIndex} className="faq-section">
            <h4 className="section-title">
              {section.icon} {section.title}
            </h4>
            
            <div className="faq-list">
              {section.items.map((item, itemIndex) => {
                // Criamos um ID único para o toggle funcionar globalmente ou por seção
                const uniqueIndex = `${secIndex}-${itemIndex}`;
                
                return (
                  <div key={uniqueIndex} className={`faq-box ${open === uniqueIndex ? "active-box" : ""}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggle(uniqueIndex)}
                    >
                      <span>{item.question}</span>
                      <LuChevronDown
                        className={`chevron-icon ${open === uniqueIndex ? "rotate" : ""}`}
                        size={20}
                      />
                    </button>

                    <div className={`faq-answer ${open === uniqueIndex ? "open" : ""}`}>
                      <div className="answer-inner">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Rodapé de contato */}
        <div className="contact-support">
          <p>Ainda precisa de ajuda?</p>
          <button className="contact-btn">
            <LuMail size={18} /> Fale com o Suporte
          </button>
        </div>

      </div>
    </div>
  );
}