import React from 'react';

const DictionaryComponent = ({ dictionary }) => {
  const sortedEntries = Object.entries(dictionary).sort((a, b) => a[1] - b[1]);

  return (
    <div style={styles.dictionary}>
      <h2 style={styles.heading}>LSA Dictionary</h2>
      <ul style={styles.wordList}>
        {sortedEntries.map(([word, value]) => (
          <li key={word} style={styles.wordItem}>
            <span style={styles.word}>{word}</span>
            <span style={styles.value}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  dictionary: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: "center",
    fontSize: '24px',
    marginBottom: '10px',
  },
  wordList: {
    listStyle: 'none',
    padding: '0',
    display: 'flex',
    flexWrap: 'wrap',
  },
  wordItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px',
    padding: '5px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  word: {
    flex: '1',
  },
  value: {
    fontWeight: 'bold',
    marginLeft: '10px',
  },
};

export default DictionaryComponent;
