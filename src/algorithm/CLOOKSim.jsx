import React, { useState } from "react";
import "./CLOOKSim.css";  // Import the CLOOK-specific CSS
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CLOOKSim = () => {
  const [requests, setRequests] = useState("");
  const [head, setHead] = useState("");
  const [totalCylinders, setTotalCylinders] = useState("");
  const [direction, setDirection] = useState("right");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqArr = requests.split(",").map(Number);
    const headStart = Number(head);
    const totalCyl = Number(totalCylinders);

    // Separate the requests into two directions based on the initial head position
    const left = reqArr.filter((req) => req < headStart).sort((a, b) => b - a);
    const right = reqArr.filter((req) => req > headStart).sort((a, b) => a - b);

    let sequence = [headStart];
    let movements = [];
    let currentHead = headStart;

    // CLOOK moves the head from one end to the other without going to the end of the disk
    if (direction === "right") {
      sequence = [...right, ...left];
    } else {
      sequence = [...left, ...right];
    }

    // Calculate the seek movements
    sequence.forEach((pos) => {
      movements.push(Math.abs(pos - currentHead));
      currentHead = pos;
    });

    const totalSeekTime = movements.reduce((acc, cur) => acc + cur, 0);

    // For Gantt chart
    let time = 0;
    const ganttData = sequence.map((pos, i) => {
      const move = i === 0 ? 0 : Math.abs(pos - sequence[i - 1]);
      const start = time;
      time += move;
      return {
        label: `Request ${i}`,
        start,
        end: time,
        pos,
      };
    });

    setResult({
      sequence,
      movements,
      totalSeekTime,
      ganttData,
    });
  };

  return (
    <>
      <Header />
      <div className="clook-container">
        <h2>CLOOK Disk Scheduling Simulation</h2>
        <form onSubmit={handleSubmit} className="clook-form">
          <label>Enter Request Queue (comma-separated):</label>
          <input
            type="text"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="e.g. 98,183,37,122"
          />

          <label>Enter Initial Head Position:</label>
          <input
            type="number"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            placeholder="e.g. 53"
          />

          <label>Enter Total Number of Cylinders:</label>
          <input
            type="number"
            value={totalCylinders}
            onChange={(e) => setTotalCylinders(e.target.value)}
            placeholder="e.g. 200"
          />

          <label>Choose Direction:</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
          </select>

          <button type="submit">Simulate</button>
        </form>

        {result && (
          <div className="clook-output">
            <h3>Output</h3>
            <p><strong>Seek Sequence:</strong> {result.sequence.join(" → ")}</p>
            <p><strong>Total Seek Time:</strong> {result.totalSeekTime}</p>

            <div className="charts">
              <div className="chart">
                <h4>Line Graph</h4>
                <Line
                  data={{
                    labels: result.sequence.map((_, i) => `Step ${i}`),
                    datasets: [
                      {
                        label: "Disk Position",
                        data: result.sequence,
                        borderColor: "#4b7bec",
                        fill: false,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </div>

              <div className="chart">
                <h4>Bar Chart of Seek Movements</h4>
                <Bar
                  data={{
                    labels: result.movements.map((_, i) => `Move ${i + 1}`),
                    datasets: [
                      {
                        label: "Seek Distance",
                        data: result.movements,
                        backgroundColor: "#20bf6b",
                      },
                    ],
                  }}
                />
              </div>

              <div className="chart">
                <h4>Gantt Chart (Seek Time Timeline)</h4>
                <Bar
                  data={{
                    labels: result.ganttData.map((d) => d.label),
                    datasets: [
                      {
                        label: "Seek Time",
                        data: result.ganttData.map((d) => d.end - d.start),
                        backgroundColor: "#f39c12",
                        base: result.ganttData.map((d) => d.start),
                      },
                    ],
                  }}
                  options={{
                    indexAxis: "y",
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Time Units",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Requests",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CLOOKSim;
