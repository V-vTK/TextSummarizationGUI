import React from 'react';

const GrayBoxComponent = ({ sentences }) => {

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>Significant Sentences</h2>
      {sentences.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            maxWidth: '40vw',
            minHeight: '10vh',
            minWidth: '10vh'
          }}
        >
          {sentences.map((sentence, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '5px',
                borderRadius: '5px',
                fontSize: '16px',
                textAlign: 'left',
              }}
            >
              {sentence}
            </div>
          ))}
        </div>
      ) : (
        <p>No sentences available.</p>
      )}
    </div>
  );
};

export default GrayBoxComponent;
