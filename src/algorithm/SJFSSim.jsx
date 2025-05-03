import React, { useState } from "react";
import "./SJFSSim.css";  // Import the SJF-specific CSS
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

const SJFSIM = () => {
  const [requests, setRequests] = useState("");
  const [head, setHead] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqArr = requests.split(",").map(Number);
    const headStart = Number(head);

    // Sort the requests based on shortest seek time first
    const sortedRequests = [...reqArr].sort((a, b) => a - b);

    // SJF simulation logic
    let sequence = [headStart];
    let remainingRequests = [...sortedRequests];
    let movements = [];

    let currentHead = headStart;
    while (remainingRequests.length > 0) {
      let closestRequest = remainingRequests.reduce((prev, curr) => {
        return Math.abs(curr - currentHead) < Math.abs(prev - currentHead) ? curr : prev;
      });
      remainingRequests = remainingRequests.filter((r) => r !== closestRequest);
      sequence.push(closestRequest);
      movements.push(Math.abs(closestRequest - currentHead));
      currentHead = closestRequest;
    }

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
      <div className="sjf-container">
        <h2>SJF Disk Scheduling Simulation</h2>
        <form onSubmit={handleSubmit} className="sjf-form">
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

          <button type="submit">Simulate</button>
        </form>

        {result && (
          <div className="sjf-output">
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

export default SJFSIM;
