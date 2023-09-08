import React from 'react';

const GrayBoxComponent = ({ sentences, chunkRatings, sentenceStems }) => {

  function ToFixed(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    const roundedNumber = Math.round(number * factor) / factor;
    const decimalPart = (roundedNumber % 1).toFixed(decimalPlaces).substring(1);

    return `${Math.floor(roundedNumber)}${decimalPart}`;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>Sentences and chunk ratings</h2>
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
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Sentence stems:</p>
              <div
                style={{
                  border: '1px solid gray',
                  backgroundColor: '#f0f0f0',
                  padding: '10px',
                  margin: '5px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  lineHeight: '1.5',
                }}
              >
                {sentenceStems[index].join(' ')}
              </div>
              <p style={{ fontWeight: 'bold' }}>Sentence:</p>
              <span style={{ marginRight: '10px' }}>{sentence}</span>
              <span>Chunkrating:  </span>
              <span style={{ fontWeight: 'bold' }}>{ToFixed(chunkRatings[index], 2)}</span>
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
