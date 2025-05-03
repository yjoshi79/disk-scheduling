import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from './Header';
import Footer from './Footer';

const algorithms = [
  { title: "FCFS", description: "The requests are addressed in order.", path: "fcfs" },
  { title: "SSTF", description: "Shortest seek time first.", path: "sstf" },
  { title: "SCAN", description: "Disk arm moves in one direction.", path: "scan" },
  { title: "LOOK", description: "Goes only to last request in each direction.", path: "look" },
  { title: "C-SCAN", description: "Circular scan from start to end.", path: "cscan" },
  { title: "C-LOOK", description: "Circular LOOK algorithm.", path: "clook" }
];

const Home = () => {
  const navigate = useNavigate();

  const handleSimulateClick = (path) => {
    navigate(`/simulate/${path}`); // Pass algorithm type to Simulate.jsx
  };

  const handleMoreInfoClick = (path) => {
    navigate(`/moreinfo/${path}`); // Pass algorithm type to MoreInfo.jsx
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <section className="disk-scheduling-info">
          <h2>What is Disk Scheduling?</h2>
          <p>
            Disk scheduling is the process of determining the order in which disk I/O requests are to be processed. Disk scheduling algorithms help manage the movement of the disk arm so that data requests are handled efficiently, minimizing the time the disk arm spends seeking between requests. The objective is to reduce latency and increase throughput, ensuring optimal performance in systems with heavy I/O operations.
          </p>
        </section>

        <div className="algorithm-grid">
          {algorithms.map((algo, index) => (
            <div className="algorithm-card" key={index}>
              <h3>{algo.title}</h3>
              <p>{algo.description}</p>
              <div className="button-group">
                <button
                  className="info-button"
                  onClick={() => handleMoreInfoClick(algo.path)}  // Route to MoreInfo page
                >
                  More Information
                </button>
                <button
                  className="simulate-button"
                  onClick={() => handleSimulateClick(algo.path)}  // Route to Simulate page
                >
                  Simulate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
