import { useEffect, useState } from "react";

export default function VerSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    const carregarSolicitacoes = () => {
        const dados = JSON.parse(localStorage.getItem("solicitacoes")) || [];

        const minhasComoSolicitante = dados.filter(
            (item) => item.solicitante.email === loggedUser.email
        );

        const minhasComoPrestador = dados.filter(
            (item) => item.prestador.email === loggedUser.email
        );

        const todasMinhas = [...minhasComoSolicitante, ...minhasComoPrestador];

        setSolicitacoes(todasMinhas);
    };

    useEffect(() => {
        carregarSolicitacoes();
    }, []);

    const atualizarStatus = (id, novoStatus) => {
        const todas = JSON.parse(localStorage.getItem("solicitacoes")) || [];

        const atualizadas = todas.map(item =>
            item.id === id ? { ...item, status: novoStatus } : item
        );

        localStorage.setItem("solicitacoes", JSON.stringify(atualizadas));
        carregarSolicitacoes();
    };

    const regrasDesabilitar = (status, botao) => {
        if (status === "Concluído") return true;

        if (status === "Em andamento") {
            if (botao === "Aceito") return true;       
            if (botao === "Em andamento") return true;  
            return false;                               
        }

        if (status === "Aceito") {
            if (botao === "Concluído") return true;
            return false;                            
        }

        return false;
    };

    if (solicitacoes.length === 0) {
        return <p>Você ainda não tem solicitações.</p>;
    }

    return (
        <div className="solicitacoes-container">
            <h2>Minhas Solicitações</h2>

            {solicitacoes.map((item) => {
                const prestadorÉLogado = loggedUser?.email === item.prestador.email;
                const statusAtual = item.status;

                return (
                    <div key={item.id} className="solicitacao-card">
                        <h3>Solicitação #{item.id}</h3>

                        <p><strong>Prestador:</strong> {item.prestador.nome}</p>
                        <p><strong>Área:</strong> {item.prestador.area}</p>
                        <p><strong>Email:</strong> {item.prestador.email}</p>

                        <p><strong>Serviço solicitado:</strong> {item.tipoServico}</p>
                        <p><strong>Data desejada:</strong> {item.dataSolicitada}</p>

                        <p><strong>Status atual:</strong> {item.status}</p>

                        {prestadorÉLogado && (
                            <div className="botoes-status">

                                <button
                                    disabled={regrasDesabilitar(statusAtual, "Aceito")}
                                    onClick={() => atualizarStatus(item.id, "Aceito")}
                                >
                                    Aceito
                                </button>

                                <button
                                    disabled={regrasDesabilitar(statusAtual, "Em andamento")}
                                    onClick={() => atualizarStatus(item.id, "Em andamento")}
                                >
                                    Em andamento
                                </button>

                                <button
                                    disabled={regrasDesabilitar(statusAtual, "Concluído")}
                                    onClick={() => atualizarStatus(item.id, "Concluído")}
                                >
                                    Concluído
                                </button>

                            </div>
                        )}

                        <hr />
                    </div>
                );
            })}
        </div>
    );
}
