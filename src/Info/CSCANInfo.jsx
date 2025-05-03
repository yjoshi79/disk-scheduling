import React from 'react';
import './CSCANInfo.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CSCANInfo = () => {
  return (
    <>
    <Header/>
    <div className="cscan-info-container">
      <h2 className="cscan-info-title">C-SCAN Disk Scheduling Algorithm</h2>
      <div className="cscan-info-content">
        <p>
          The Circular SCAN (C-SCAN) algorithm is a variation of the SCAN algorithm. The disk arm moves in one direction and, upon reaching the end, it returns to the beginning without servicing any requests, continuing in the same direction. This ensures that the disk arm always moves in one direction, avoiding unnecessary back-and-forth movement.
        </p>
        
        <h3>How C-SCAN Works:</h3>
        <ul>
          <li>The disk arm starts at the initial position and moves in one direction, servicing all the requests in that direction.</li>
          <li>Once the end of the disk is reached, the arm returns to the beginning (without servicing any requests) and continues moving in the same direction.</li>
          <li>The algorithm ensures that requests are serviced in one direction, providing a more uniform wait time for all requests.</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>Provides better performance than SCAN for large disk systems with a high number of requests.</li>
          <li>Offers a more uniform wait time by reducing the back-and-forth movement of the disk arm.</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Can lead to high turnaround times for requests at the beginning and end of the disk.</li>
          <li>Requires knowledge of the position of the disk arm and the requests in the queue.</li>
        </ul>

        <div className="example-box">
          <h4>Example</h4>
          <p>Consider the disk arm starts at position 53. The requests are 98, 183, 37, 122, and 14. The disk arm moves from 53 to 98, 122, 183, and then reaches the end of the disk. Once the end is reached, it goes back to position 0 and continues to service requests in the same direction.</p>
        </div>

        <div className="visualization-box">
          <h4>C-SCAN Algorithm Visualization</h4>
          <p>In this simulation, you can visualize how the disk arm moves from the starting point to the end, then returns to the beginning to continue servicing requests in the same direction.</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CSCANInfo;
