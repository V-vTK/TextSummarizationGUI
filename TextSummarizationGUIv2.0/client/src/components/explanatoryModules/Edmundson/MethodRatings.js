import React from 'react';

const GrayBoxComponent = (props) => {
  return (
    <div>
      {props.cueData ? (
        <>
          <h4 style={{ marginBottom: '10px' }}>{props.name}</h4>
          <div
            style={{
              textAlign: 'center',
              border: '1px solid gray',
              backgroundColor: '#f0f0f0',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {Object.entries(props.cueData).map(([sentence, rating]) => {
              if (rating > 0) {
                return (
                  <div
                    key={sentence}
                    style={{
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                      fontSize: '16px',
                      textAlign: 'left',
                    }}
                  >
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Sentence:</p>
                    <div style={{
                      border: '1px solid gray',
                      backgroundColor: '#f0f0f0',
                      padding: '10px',
                      borderRadius: '5px',
                    }}>
                      {sentence} <strong>rating: {rating}</strong>
                    </div>
                  </div>
                );
              } else {
                return null; // Skip rendering the sentence if rating is 0 or less
              }
            })}
          </div>
        </>
      ) : (
        <p>No sentences available.</p>
      )}
    </div>
  );
};

export default GrayBoxComponent;
