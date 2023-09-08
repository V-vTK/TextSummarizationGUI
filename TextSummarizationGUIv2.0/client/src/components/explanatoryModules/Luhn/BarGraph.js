import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, LinearScale, Title, Legend, BarElement, Tooltip } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Frequency Analysis: Most Commonly Occurring Words (Occurrences > 1)",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || '';
          if (context.parsed.y !== null) {
            const value = context.parsed.y;
            const word = context.label;
            return `${label}: ${value} (${word})`;
          }
          return label;
        },
      },
    },
  },
};


const BarGraph = (props) => {
  const data = props.data;
  const filteredData = Object.entries(data).filter(([_, count]) => count > 1);
  filteredData.sort((a, b) => b[1] - a[1]);

  const chartData = {
    labels: filteredData.map(([word]) => word),
    datasets: [
      {
        label: 'Value',
        data: filteredData.map(([_, count]) => count),
        backgroundColor: 'rgba(32, 22, 174, 0.8)',
        borderColor: 'rgba(28, 19, 139, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '70vh', width: '70vw' }}>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default BarGraph;
