import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import TopRatedSentences from './TopRatedSentences';

const WeightManager = (props) => {
  const [weights, setWeights] = useState([1, 1, 1, 1]);

  const handleChangeWeight = (index, newWeight) => {
    const updatedWeights = [...weights];
    updatedWeights[index] = newWeight;
    setWeights(updatedWeights);
  };

  const ButtonGroup = ({ label, weight, onChange }) => {
    return (
      <div style={{ textAlign: 'center', marginBottom: '10px', marginLeft: "4vw", marginRight: "4vw", borderRadius: '4vw', display: 'flex', flexDirection: 'column', alignContent: "space-between", alignItems: "center" }}>
        <label><strong style={{ fontSize: '1.5rem' }}>{label}</strong></label>
        <div>
          <button onClick={() => onChange(weight + 1)} style={{ flex: 1, fontSize: '1.5rem', padding: '1vw', margin: '0.5vw', width: '1.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
        </div>
        <div>
          <button onClick={() => onChange(weight - 1)} style={{ flex: 1, fontSize: '1.5rem', padding: '1vw', margin: '0.5vw', width: '1.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
        </div>
      </div>
    );
  };



  const Graph = ({ weights }) => {
    const maxWeight = Math.max(...weights);
    const headroom = 10;
    const suggestedMax = Math.max(maxWeight + headroom, 10);

    const chartData = {
      labels: ['Cue Weight', 'Key Weight', 'Location Weight', 'Title Weight'],
      datasets: [
        {
          label: 'Weight',
          data: weights,
          backgroundColor: 'rgba(32, 22, 174, 0.8)',
          borderColor: 'rgba(28, 19, 139, 0.8)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: suggestedMax,
            maxTicksLimit: suggestedMax,
          },
        },
      },
    };

    return (
      <div style={{ textAlign: 'center', marginTop: '5vh' }}>
        <Bar data={chartData} options={options} />
      </div>
    );
  };

  return (
    <div style={{
      textAlign: 'center',
      border: '1px solid gray',
      backgroundColor: '#f0f0f0',
      padding: '10px',
      borderRadius: '5px',
    }}>
      <h1>Weight Simulation1</h1>
      <p style={{ fontSize: "1.5rem" }}>Rating = (w1 x P)+(w2 x F)+(w3 x C)+(w4 x S)</p>
      <Graph weights={weights} style={{ marginTop: '2vh', alignItems: 'center', textAlign: 'center' }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ margin: '10px', padding: "2vw" }}>
          <ButtonGroup
            weight={weights[0]}
            label={weights[0]}
            onChange={(newWeight) => handleChangeWeight(0, newWeight)}
          />
        </div>
        <div style={{ margin: '10px', padding: "2vw" }}>
          <ButtonGroup
            weight={weights[1]}
            label={weights[1]}
            onChange={(newWeight) => handleChangeWeight(1, newWeight)}
          />
        </div>
        <div style={{ margin: '10px', padding: "2vw" }}>
          <ButtonGroup
            weight={weights[2]}
            label={weights[2]}
            onChange={(newWeight) => handleChangeWeight(2, newWeight)}
          />
        </div>
        <div style={{ margin: '10px', padding: "2vw" }}>
          <ButtonGroup
            weight={weights[3]}
            label={weights[3]}
            onChange={(newWeight) => handleChangeWeight(3, newWeight)}
          />
        </div>
      </div>
      <div style={{
        textAlign: 'center',
        border: '1px solid gray',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '5px',
        margin: "4vw"
      }}>
        <TopRatedSentences data={props.data} weights={weights} output={props.output}></TopRatedSentences>
      </div>
    </div>
  );
};

export default WeightManager;
