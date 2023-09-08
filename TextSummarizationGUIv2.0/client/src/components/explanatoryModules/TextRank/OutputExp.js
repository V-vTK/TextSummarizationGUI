import React from 'react';

const Highlighter = ({ output, sentences }) => {
  const escapeRegexSpecialCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const colors = ['#123070', '#800000', '#0000FF', '#006400', '#808080', '#006400'];

  const highlightText = (text) => {
    let highlightedText = [text];

    sentences.forEach((sentence, index) => {
      const escapedSentence = escapeRegexSpecialCharacters(sentence);
      const regex = new RegExp(`(${escapedSentence})`, 'gi');
      const color = colors[index % colors.length];

      highlightedText = highlightedText.flatMap((chunk) => {
        if (typeof chunk === 'string') {
          return chunk.split(regex).map((textChunk, i) => {
            if (i % 2 === 1) {
              return (
                <span key={`${index}-${i}`} style={{ color }}>
                  {textChunk}
                </span>
              );
            }
            return textChunk;
          });
        }
        return chunk;
      });
    });

    return <>{highlightedText}</>;
  };

  return (
    <>
      <p style={{ marginTop: '10vh', textAlign: 'center' }}>Result:</p>
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
          fontSize: '26px',
          width: 'max-content',
          minWidth: '40vw',
          justifyContent: 'center',
        }}
      >
        <p style={{ margin: 0 }}>{highlightText(output)}</p>
      </div>
    </>
  );
};

export default Highlighter;