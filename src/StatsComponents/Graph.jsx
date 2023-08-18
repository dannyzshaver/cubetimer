
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,} from "chart.js"
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ... rest of your component code ...
/* eslint-disable react/prop-types */
function formatTime(milliseconds) {
  
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const remainingMilliseconds = milliseconds % 1000;
  
    const formattedMinutes = minutes > 0 ? minutes.toString().padStart(1, '0') + ':' : '';
    const formattedSeconds = minutes > 0 ? seconds.toString().padStart(2, '0') : seconds.toString() 
    const formattedMilliseconds = remainingMilliseconds.toString().padStart(3, '0').slice(0, -1);
  
  return `${formattedMinutes}${formattedSeconds}.${formattedMilliseconds}`;
}



export function Graph({ solves }) {

  const times = solves.map(solve => solve.time);
  const chartData = {
    labels: times.map((_, index) => index + 1), // Indices as labels
    datasets: [
      {
        label: 'Times:',
        data: times,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 0, // Remove data point circles
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true, 
          text: 'solve #', 
          color: 'rgba(255, 255, 255, 1)',
          font: {
            size: 16,
            weight: 'bold',
          },
          padding: {
            bottom: 10,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
          maxRotation: 0,
          minRotation: 0, 
          font: {
            size: 16, 
          },
        },
      },
      y: {
        title: {
          display: true, 
          text: 'time', 
          color: 'rgba(255, 255, 255, 1)',
          font: {
            size: 16,
            weight: "bold",
          },
          padding: {
            bottom: 10,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
          callback: (value) => formatTime(value),
          font: {
            size: 16,
          },
        },
      },
    },
    
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="graph" style={{ background: 'transparent', 
    padding: '1.25rem', 
    borderRadius: '0.5rem',
  }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}