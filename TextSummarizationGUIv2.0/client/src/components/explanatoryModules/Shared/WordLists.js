import React from 'react';

const BoxContainer = ({ wordLists }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "2vw", marginBottom: "0px" }}>Sentences as stemmed words</h2>
      <div style={styles.container}>
        {wordLists.map((list, index) => (
          <div key={index} style={styles.box}>  <strong style={{ margin: "3px", padding: '3px 10px', }}>s{index + 1}</strong>
            {list.map((word, idx) => (
              <div key={idx} style={styles.wordBox}>
                {word}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "0.5vw",
    background: '#ccc',
    borderRadius: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: "column",
    margin: "4vw",
  },
  box: {
    display: 'flex',
    flexDirection: "row",
    margin: '5px',
    padding: '5px',
    background: '#fff',
    borderRadius: '5px',
    width: '60vw',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap'
  },
  wordBox: {
    margin: '3px',
    padding: '3px 10px',
    borderRadius: '3px',
  },
};

export default BoxContainer;
