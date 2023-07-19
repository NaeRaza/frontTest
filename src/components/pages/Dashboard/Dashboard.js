import React, { useEffect, useState } from "react";
import Navbar from '../../navbar/Navbar';
import "./dashboard.css";
import axios from "axios";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);

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
        // Calculate the number of males and females
        const maleClients = data.filter((item) => item.genre === "homme");
        const femaleClients = data.filter((item) => item.genre === "femme");
        setMaleCount(maleClients.length);
        setFemaleCount(femaleClients.length);
    }, [data]);

    // Data for PolarArea chart
    const chartData = {
        labels: ['Homme', 'Femme'],
  datasets: [
    {
      label: ' ',
      data: [maleCount, femaleCount],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ],
      borderWidth: 1,
      borderColor: "#9C1D21"
    },
  ],
    };

    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <div className="graph">
                    {/* Display the PolarArea chart */}
                    <Pie data={chartData} />
                </div>
                <div className="description">
                    Texte
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
