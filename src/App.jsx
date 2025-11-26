import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import PrestadorRegister from "./pages/Prestador/PrestadorRegister.jsx";
import Catalog from "./pages/Catalog/catalog.jsx";
import PrestadorProfile from "./pages/Prestador/PrestadorProfile.jsx";
import { ServiceProvider } from "./pages/Context/serviceContext.jsx";
import SolicitarServico from "./pages/SolicitacaoServico/SolicitarServico.jsx";
import VerSolicitacoes from "./pages/SolicitacaoServico/verSolicitacoes.jsx";

export default function App() {
  return (
    <ServiceProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/prestador/register" element={<PrestadorRegister />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/prestador/:id" element={<PrestadorProfile />} />
        <Route path="/solicitar/:idPrestador" element={<SolicitarServico />} />
        <Route path="/solicitacoes" element={<VerSolicitacoes />} />
      </Routes>
    </BrowserRouter>
    </ServiceProvider>
  );
}
