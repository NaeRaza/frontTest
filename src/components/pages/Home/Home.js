import React, { useState, useEffect } from 'react';
import Navbar from '../../navbar/Navbar';
import Interconnexion from '../../routes/Interconnexion';
import "./home.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredValue, setFilteredValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en vérifiant l'existence du jeton d'accès
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      // Rediriger l'utilisateur vers la page de connexion s'il n'est pas connecté
      navigate('/login');
    }
  }, [navigate]);

  const handleSearch = () => {
    setFilteredValue(searchValue);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setFilteredValue('');
  };

  return (
    <div className="home">
      <Navbar />
      <h1 className="title">Liste des collaborateurs</h1>
      <div className="find">
        <input
          placeholder="Recherche de collaborateur"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <button className="clear-button" onClick={handleClearSearch}>
            X
          </button>
        )}
        <button className="validate" onClick={handleSearch}>
          Rechercher
        </button>
      </div>
      <Interconnexion filteredValue={filteredValue} />
    </div>
  );
};

export default Home;
