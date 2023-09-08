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
      text: "TF-IDF values for each word",
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
  if (!data || typeof data !== 'object') {
    return <div style={{ fontSize: "1.8rem" }}>No data available for the chart.</div>;
  }

  const scaledData = Object.entries(data).map(([word, value]) => [word, value]);
  scaledData.sort((a, b) => b[1] - a[1]);

  const chartData = {
    labels: scaledData.map(([word]) => word),
    datasets: [
      {
        label: 'Value',
        data: scaledData.map(([_, count]) => count),
        backgroundColor: 'rgba(32, 22, 174, 0.8)',
        borderColor: 'rgba(28, 19, 139, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '60vh', width: '60vw' }}>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};


export default BarGraph;