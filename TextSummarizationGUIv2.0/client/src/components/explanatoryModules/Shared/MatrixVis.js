import React from 'react';

const MatrixComponent = (props) => {
  const matrix = props.matrix.slice(0, 40);

  const columnNames = Array.from({ length: matrix[0].length }, (_, index) => `s${index + 1}`);

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
              <th style={{ border: '1px solid black', padding: '5px' }}></th>
              {columnNames.map((columnName, index) => (
                <th key={index} style={{ border: '1px solid black', padding: '5px' }}>
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th style={{ border: '1px solid black', padding: '5px' }}>{`s${rowIndex + 1}`}</th>
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
      <p style={{ textAlign: "center", marginTop: "1vh", marginBottom: "0vh" }}>S1 = The first sentence</p>
      <p style={{ textAlign: "center", marginTop: "1vh" }}>S2 = The second sentence</p>
    </>
  );
};

export default MatrixComponent;


