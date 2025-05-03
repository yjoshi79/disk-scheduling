import React from 'react';
import { useParams } from 'react-router-dom';

// Import all algorithm components
import FCFSSim from '../algorithm/FCFSSim';
import SJFSSim from '../algorithm/SJFSSim';
import SCANSim from '../algorithm/SCANSim';
import LOOKSim from '../algorithm/LOOKSim';
import CSCANSim from '../algorithm/CSCANSim';
import CLOOKSim from '../algorithm/CLOOKSim';

const Simulate = () => {
  const { algo } = useParams(); // e.g., 'fcfs', 'sstf', etc.

  const renderSimulation = () => {
    switch (algo.toLowerCase()) {
      case 'fcfs':
        return <FCFSSim />;
      case 'sstf':
        return <SJFSSim />;
      case 'scan':
        return <SCANSim />;
      case 'look':
        return <LOOKSim />;
      case 'cscan':
        return <CSCANSim />;
      case 'clook':
        return <CLOOKSim />;
      default:
        return <div>Algorithm "{algo}" not found.</div>;
    }
  };

  return (
    <div>
      {renderSimulation()}
    </div>
  );
};

export default Simulate;
