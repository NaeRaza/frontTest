import React from "react";
import "./navbar.css";
import Logo from "../../images/logo_sahaza.png";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import {RiLogoutBoxRLine} from "react-icons/ri"


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
   // Supprimer le cookie du jeton d'accès
   Cookies.remove('accessToken');

   // Rediriger vers la page de connexion
   navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={Logo} alt="logo" />
      </div>
      <div className="nav-right">
        <div className="menu">
          <ul>
            <li>
              <a href="/acceuil">Accueil</a>
            </li>
            <li>
              <a href="/a-propos">A propos</a>
            </li>
            <li>
              <a href="/contenu">Contenu</a>
            </li>
            <li>
              <a href="/message">Message</a>
            </li>
          </ul>
        </div>
      </div>
      <button className="logout" onClick={handleLogout}> 
      <RiLogoutBoxRLine className="logout-icon" />
      </button>
    </div>
  );
}

export default Navbar;
