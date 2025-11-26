import "../../styles/home.css";
import { Link } from "react-router-dom";
export default function Home() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Sistema de Serviços {user?.nome}!</h1>


            <div className="home-buttons">

                <Link to="/catalog"><button type="submit">Explorar Serviços</button></Link>
        
                <Link to="/prestador/register">
                    <button>Cadastre-se como Prestador</button>
                </Link>
                
                 <Link to="/solicitacoes">
                    <button>Solicitações</button>
                </Link>

            </div>
        </div>
    );
}
