import React from 'react';
import { useState, useEffect } from 'react';

const IterationBox = ({ sentence, rating, isSelected }) => {
  const boxStyle = {
    border: '1px solid gray',
    padding: '1rem',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: isSelected ? '#b6b7c2' : '#fffff',
    textAlign: 'left',
  };

  const textStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const ratingStyle = {
    fontSize: '14px',
    color: '#555',
  };

  return (
    <div style={boxStyle}>
      <div style={textStyle}>{sentence}</div>
      <div style={ratingStyle}>KLS score: {rating}</div>
    </div>
  );
};

const DictionarySentences = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSelectedIndex, setIsSelectedIndex] = useState(null);
  const dictionaryData = data[currentIndex];

  useEffect(() => {
    const findLowestRating = (currentIndex) => {
      const currentData = data[currentIndex];
      const values = Object.values(currentData);
      const lowestNumber = Math.min(...values);
      return lowestNumber;
    };

    const lowestRating = findLowestRating(currentIndex);
    setIsSelectedIndex(lowestRating);
  }, [currentIndex, data]);

  const boxStyle2 = {
    border: '1px solid gray',
    padding: '2vw',
    borderRadius: '5px',
    marginBottom: '10px',
    textAlign: 'left',
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Simulation on the KLS algorithm</h2>
      <div style={boxStyle2}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
          <div style={{ border: '1px solid gray', padding: '1vw', borderRadius: '5px', marginBottom: "1vh" }}>
            <button onClick={handlePrevious} disabled={currentIndex === 0} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', marginRight: '10px' }}>
              Back
            </button>
            <span style={{ margin: '0 10px' }}>{currentIndex + 1}/{data.length}</span>
            <button onClick={handleNext} disabled={currentIndex === data.length - 1} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', marginLeft: '10px' }}>
              Next
            </button>
          </div>
        </div>
        {Object.entries(dictionaryData).map(([sentence, rating], index) => (
          <IterationBox
            key={rating + index} // key={index} changes to other boxes once the box is removed. Has to be unique
            sentence={sentence}
            rating={rating}
            isSelected={rating === isSelectedIndex}
          />
        ))}
      </div>
    </div>
  );
};



export default DictionarySentences;