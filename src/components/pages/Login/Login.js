import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour stocker le message d'erreur
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté en vérifiant l'existence du jeton d'accès dans les cookies
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      // Rediriger l'utilisateur vers la page d'accueil s'il est déjà connecté
      navigate("/acceuil");
    }
  }, [navigate]);

  const handleChange = (event) => {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "motdepasse") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/api/auth/login", {
        email: email,
        motdepasse: password,
      })
      .then((response) => {
        const { accessToken } = response.data;

        // Enregistrez le jeton d'accès dans les cookies
        Cookies.set("accessToken", accessToken);

        // Redirigez l'utilisateur vers la page d'accueil
        navigate("/acceuil", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        // Récupérez le message d'erreur de la réponse
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Une erreur s'est produite lors de la connexion.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login">
        <span className="login-title">Connexion</span>
        <div className="login-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            onChange={handleChange}
            value={email}
            required
          />
          <label htmlFor="motdepasse">Mot de passe</label>
          <input
            type="password"
            id="motdepasse"
            className="login-input"
            onChange={handleChange}
            value={password}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Affichage du message d'erreur */}
        </div>
        <button className="login-button" type="submit">
          Se connecter
        </button>
      </div>
    </form>
  );
};

export default Login;
