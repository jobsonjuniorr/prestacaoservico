import { useEffect, useState } from "react";

export default function VerSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("solicitacoes")) || [];
        setSolicitacoes(dados);
    }, []);

    if (solicitacoes.length === 0) {
        return <p>Nenhuma solicitação registrada.</p>;
    }

    return (
        <div className="solicitacoes-container">
            <h2>Solicitações de Serviço</h2>

            {solicitacoes.map((item) => (
                <div key={item.id} className="solicitacao-card">
                    <h3>Solicitação #{item.id}</h3>

                    <p><strong>Cliente:</strong> {item.solicitante.nome}</p>
                    <p><strong>Email:</strong> {item.solicitante.email}</p>
                    <p><strong>Telefone:</strong> {item.solicitante.telefone}</p>

                    <p><strong>Prestador:</strong> {item.prestador.nome}</p>
                    <p><strong>Área:</strong> {item.prestador.area}</p>

                    <p><strong>Data desejada:</strong> {item.dataSolicitada}</p>
                    <p><strong>Serviço solicitado:</strong> {item.tipoServico}</p>

                    <p><strong>Status:</strong> {item.status}</p>

                    <hr />
                </div>
            ))}
        </div>
    );
}
