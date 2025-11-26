import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function SolicitarServico() {
   const { idPrestador } = useParams();
    const navigate = useNavigate();

    const { prestadores } = useContext(ServiceContext);

    const [prestador, setPrestador] = useState(null);
    const [data, setData] = useState("");
    const [tipoServ, setTipoServ] = useState("");

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    useEffect(() => {
        if (prestadores.length === 0) return;

        const encontrado = prestadores.find(
            item => String(item.id) === String(idPrestador)
        );

        if (encontrado) {
            setPrestador(encontrado);
        } else {
            // ID inválido / prestador não encontrado
            setPrestador(null);
        }
    }, [idPrestador, prestadores]);

    function enviarSolicitacao(e) {
        e.preventDefault();

        if (!loggedUser) {
            alert("Você precisa estar logado para solicitar um serviço.");
            return;
        }

        if (!prestador) {
            alert("Prestador não encontrado. Não é possível enviar a solicitação.");
            return;
        }

        const novasSolicitacoes =
            JSON.parse(localStorage.getItem("solicitacoes")) || [];

        const novaSolicitacao = {
            id: Date.now(),
            solicitante: {
                nome: loggedUser.nome,
                email: loggedUser.email,
                telefone: loggedUser.telefone
            },
            prestador: {
                id: prestador.id,
                nome: prestador.nomeProfissional,
                area: prestador.area
            },
            dataSolicitada: data,
            tipoServico: tipoServ,
            status: "Pendente"
        };

        novasSolicitacoes.push(novaSolicitacao);
        localStorage.setItem("solicitacoes", JSON.stringify(novasSolicitacoes));

        alert("Solicitação enviada com sucesso!");
        navigate("/home");
    }

    if (prestadores.length > 0 && !prestador) {
        return <p>Prestador não encontrado.</p>;
    }

    if (!prestador) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="solicitar-servico">
            <h2>Solicitar serviço de {prestador.nomeProfissional}</h2>

            <form onSubmit={enviarSolicitacao}>
                <label>Data desejada:</label>
                <input
                    type="date"
                    value={data}
                    onChange={e => setData(e.target.value)}
                    required
                />

                <label>Tipo do serviço:</label>
                <input
                    type="text"
                    placeholder="Ex: Reforma elétrica, limpeza..."
                    value={tipoServ}
                    onChange={e => setTipoServ(e.target.value)}
                    required
                />

                <button type="submit">Enviar Solicitação</button>
            </form>
        </div>
    );
}
