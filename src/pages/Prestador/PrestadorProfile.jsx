import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ServiceContext } from "../Context/serviceContext.jsx";

export default function PrestadorProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { prestadores: prestadoresFixos } = useContext(ServiceContext);

    const prestadoresLocal =
        JSON.parse(localStorage.getItem("prestadores")) || [];

    if (prestadoresFixos.length === 0 && prestadoresLocal.length === 0) {
        return <p>Carregando...</p>;
    }

    const todosPrestadores = [...prestadoresFixos, ...prestadoresLocal];

    const prestador = todosPrestadores.find(
        (p) => String(p.id) === String(id)
    );

    if (!prestador) {
        return <p>Prestador não encontrado.</p>;
    }

    return (
        <div className="prestador-profile">
            <h1>{prestador.nomeProfissional}</h1>

            <p><strong>Área de atuação:</strong> {prestador.area}</p>
            <p><strong>Email:</strong> {prestador.email}</p>
            <p><strong>Descrição:</strong> {prestador.descricao}</p>
            <p><strong>Preço médio:</strong> R$ {prestador.preco}</p>

            {prestador.extraInfo && (
                <div className="extra-info-box">
                    <h3>Informações adicionais</h3>

                    {Object.entries(prestador.extraInfo).map(([key, value]) => (
                        <p key={key}>
                            <strong>{key}:</strong> {value}
                        </p>
                    ))}
                </div>
            )}

            <button onClick={() => navigate(`/solicitar/${prestador.id}`)}>
                Contratar
            </button>
        </div>
    );
}
