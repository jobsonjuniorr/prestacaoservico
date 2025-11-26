import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import PrestadorRegister from "./pages/Prestador/PrestadorRegister.jsx";
import Catalog from "./pages/Catalog/catalog.jsx";
import PrestadorProfile from "./pages/Prestador/PrestadorProfile.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/prestador/register" element={<PrestadorRegister />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/prestador/:id" element={<PrestadorProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
