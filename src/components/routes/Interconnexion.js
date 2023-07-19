import React, { useEffect, useState } from "react";
import axios from "axios";
import "./interconnexion.css";

const Interconnexion = ({ filteredValue }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    axios
      .get("http://localhost:4000/api/client/list")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Filtrer les données basées sur le filtre
    const filtered = data.filter((client) => {
      return (
        client.matricule?.toLowerCase().includes(filteredValue.toLowerCase()) ||
        client.nom?.toLowerCase().includes(filteredValue.toLowerCase()) ||
        client.genre?.toLowerCase().includes(filteredValue.toLowerCase()) ||
        client.email?.toLowerCase().includes(filteredValue.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [filteredValue, data]);

  return (
    <div>
      <table className="tableau">
        <thead>
          <tr>
            <th className="matricule">Matricule</th>
            <th>Nom</th>
            <th>Genre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr className="no-result">
              <td colSpan="4">Résultat non trouvé</td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.matricule}</td>
                <td>{item.nom}</td>
                <td>{item.genre}</td>
                {console.log(item)}
                <td>{item.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Interconnexion;
