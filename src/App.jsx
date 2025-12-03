import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import PrestadorRegister from "./pages/Prestador/prestadorRegister.jsx";
import Catalog from "./pages/Catalog/catalog.jsx";
import PrestadorProfile from "./pages/Prestador/PrestadorProfile.jsx";
import { ServiceProvider } from "./pages/Context/serviceContext.jsx";
import SolicitarServico from "./pages/SolicitacaoServico/SolicitarServico.jsx";
import VerSolicitacoes from "./pages/SolicitacaoServico/verSolicitacoes.jsx";
import Perfil from "./pages/PerfilUsuario/perfil.jsx"; 
import FirstScreen from "./pages/First Screen/FirstScreen.jsx";
import Help from "./pages/Help/Help.jsx";
import AutoLoginScreen from "./pages/Login/autoLoginScreen.jsx";
import ContaUsuario from "./pages/ContaUsuario/ContaUsuario.jsx"; 
import AdminPanel from "./pages/Admin/admin.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Verificado from "./pages/Verificado/verificado.jsx"; 
import MinhasSolicitacoes from "./pages/SolicitacaoServico/MinhasSolicitacoes.jsx";
import SolicitacoesPrestador from "./pages/Prestador/SolicitacoesPrestador.jsx";

export default function App() {
  return (
    <ServiceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />       
          <Route path="/register" element={<Register />} />
          <Route path="/prestador/register" element={<PrestadorRegister />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/prestador/:id" element={<PrestadorProfile />} />
          <Route path="/solicitar/:idPrestador" element={<SolicitarServico />} />
          <Route path="/solicitacoes" element={<VerSolicitacoes />} />
          <Route path="/ContaUsuario" element={<ContaUsuario />} /> 
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/auto-login" element={<AutoLoginScreen />} />
          <Route path="/help" element={<Help />} />            
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/verificado" element={<Verificado />} />
          <Route path="/minhas-solicitacoes" element={<MinhasSolicitacoes />} />
          <Route path="/solicitacoes-prestador" element={<SolicitacoesPrestador />} />

        </Routes>
      </BrowserRouter>
    </ServiceProvider>
  );
}