import React from 'react';

const GrayBoxComponent = (props) => {
  return (
    <div>
      {props.data ? (
        <>
          <h4 style={{ marginBottom: '10px', textAlign: "center" }}>{props.name}</h4>
          <div
            style={{
              textAlign: 'center',
              border: '1px solid gray',
              backgroundColor: '#f0f0f0',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {Object.entries(props.data).map(([sentence, rating]) => {
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
                  <div
                    style={{
                      border: '1px solid gray',
                      backgroundColor: '#f0f0f0',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    {sentence} <strong>rating: {rating.toFixed(3)}</strong>
                  </div>
                </div>
              );
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

