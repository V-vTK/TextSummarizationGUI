import React from 'react';

const VectorMatrix = ({ vector }) => {
  const matrixStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '10px',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
  };

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <div style={matrixStyle}>
      {vector.map((value, index) => (
        <div key={index} style={cellStyle}>
          {value.toFixed(3)}
        </div>
      ))}
    </div>
  );
};

export default VectorMatrix