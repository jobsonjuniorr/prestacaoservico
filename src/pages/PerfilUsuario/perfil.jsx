import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LuChevronLeft, 
  LuPencil, 
  LuCamera, 
  LuFileText, 
  LuUser, 
  LuLayoutGrid,
  LuClipboardList 
} from "react-icons/lu";
import "../../styles/perfil.css";
import "../../styles/global.css";

const placeholderUserImg = "https://cdn.create.vista.com/api/media/small/51405259/stock-vector-male-avatar-profile-picture-use-for-social-website-vector"; 

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("loggedUser");
    if (!data) {
      navigate("/"); 
      return;
    }
    setUser(JSON.parse(data));
  }, [navigate]);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;

      const updatedUser = { ...user, fotoPreview: base64String };
      setUser(updatedUser);

      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

      alert("Foto atualizada e salva!");
    };

    reader.readAsDataURL(file);
  }
  };

  if (!user) return null;

  const userSubtitle = (user.profissao && user.categoria) 
    ? `${user.categoria} > ${user.profissao}` 
    : "Cliente Local+";

  const PageContent = () => (
    <>
      <header className="page-header-nav">
        <button onClick={() => navigate('/ContaUsuario')} className="back-btn">
            <LuChevronLeft size={28} />
        </button>
        <h2 className="page-header-title">Seu perfil</h2>
      </header>

      <section className="user-hero">
        <div className="hero-img-wrapper">
            <img 
                src={user.fotoPreview || user.img || placeholderUserImg} 
                alt="Foto de Perfil" 
                className="hero-profile-img" 
            />
            <label htmlFor="file-upload" className="edit-photo-btn">
                <LuCamera />
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handlePhotoChange}/>
        </div>
        <div className="hero-user-details">
            <h3>{user.nome}</h3>
            <p>{userSubtitle}</p>
        </div>
      </section>

 
      <ul className="menu-list">
        <li>
            <Link to="/perfil/EditarCategoria">
                <div className="menu-item-left">
                    <LuLayoutGrid size={24} style={{marginRight: 15, color: '#1A8BF0'}}/>
                    <span>Sua categoria</span>
                </div>
                <LuPencil size={22} className="edit-icon" />
            </Link>
        </li>
        <li>
            <Link to="/perfil/editar-descricao">
                <div className="menu-item-left">
                     <LuFileText size={24} style={{marginRight: 15, color: '#1A8BF0'}}/>
                    <span>Sua descrição</span>
                </div>
                <LuPencil size={22} className="edit-icon" />
            </Link>
        </li>
        <li>
            <Link to="/perfil/editar-dados">
                <div className="menu-item-left">
                    <LuUser size={24} style={{marginRight: 15, color: '#1A8BF0'}}/>
                    <span>Seus dados pessoais</span>
                </div>
                <LuPencil size={22} className="edit-icon" />
            </Link>
        </li>
        

        <li>
            <Link to="/solicitacoes">
                <div className="menu-item-left">
                    <LuClipboardList size={24} style={{marginRight: 15, color: '#1A8BF0'}}/>
                    <span>Minhas Solicitações</span>
                </div>
                <LuChevronLeft size={22} className="edit-icon" style={{transform: "rotate(180deg)"}} />
            </Link>
        </li>

      </ul>
    </>
  );

  return (
    <div className="perfil-container">
      {window.innerWidth >= 768 ? (
        <div className="pc-card-wrapper">
          <PageContent />
        </div>
      ) : (
        <PageContent />
      )}
    </div>
  );
}