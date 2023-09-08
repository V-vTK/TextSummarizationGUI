import React from 'react';

const WordList = ({ words, name }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>{name}</h2>
      {words && words.length > 0 ? (
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
          }}
        >
          {words.map((word, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '5px',
                margin: '5px',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            >
              {word}
            </div>
          ))}
        </div>
      ) : (
        <p>No words found.</p>
      )}
    </div>
  );
};

export default WordList;
