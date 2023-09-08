import React from 'react';

const GrayBoxComponent = (props) => {
  return (
    <div>
      {props.data && props.cueData ? (
        <>
          <h4 style={{ marginBottom: '10px' }}>Found cue words and sentence ratings:</h4>
          <div
            style={{
              textAlign: 'center',
              border: '1px solid gray',
              backgroundColor: '#f0f0f0',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {props.data.map((sentence, index) => {
              const rating = props.cueData[props.data[index]['sentence']];
              const bonusWords = props.data[index]['bonus_word_matches'].join(' ');
              const stigmaWords = props.data[index]['stigma_word_matches'].join(' ');

              if (bonusWords || stigmaWords) {
                return (
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
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Sentence:</p>
                    <p>
                      {props.data[index]['sentence']} <strong>rating: {rating}</strong>
                    </p>
                    {bonusWords && (
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
                        Bonus words found: <strong>{bonusWords}</strong>
                      </div>
                    )}
                    {stigmaWords && (
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
                        Stigma words found: <strong>{stigmaWords}</strong>
                      </div>
                    )}
                  </div>
                );
              } else {
                return null;
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
