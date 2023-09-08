import React from 'react';

const MatrixComponent = (props) => {
  const matrix = props.matrix.slice(0, 40);
  
  return (
    <>
      <div
        style={{
          backgroundColor: 'lightgray',
          padding: '10px',
          borderRadius: '10px',
          overflow: 'auto',
          maxWidth: '50vw',
          maxHeight: '60vh'
        }}
      >
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ border: '1px solid black', padding: '5px' }}>
                    {cell.toFixed(4)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MatrixComponent;


