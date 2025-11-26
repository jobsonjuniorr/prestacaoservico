import { useParams, useNavigate } from "react-router-dom";

export default function PrestadorProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
    const prestador = prestadores.find(p => p.id == id);

    if (!prestador) {
        return <p>Prestador não encontrado.</p>;
    }

    function contratar() {
        navigate(`/solicitar/${id}`);
    }

    return (
        <div className="prestador-profile">
            <h1>{prestador.nomeProfissional}</h1>

            {/* Caso deseje adicionar foto futuramente */}
            {prestador.foto && (
                <img
                    src={prestador.foto}
                    alt={prestador.nomeProfissional}
                    className="prestador-foto"
                />
            )}

            <p><strong>Área de atuação:</strong> {prestador.area}</p>
            <p><strong>Descrição:</strong> {prestador.descricao}</p>
            <p><strong>Preço médio:</strong> R$ {prestador.preco}</p>
            <p><strong>Disponibilidade:</strong> {prestador.disponibilidade}</p>

            <button onClick={() => navigate(`/solicitar/${prestador.id}`)}>
                Contratar
            </button>
        </div>
    );
}
