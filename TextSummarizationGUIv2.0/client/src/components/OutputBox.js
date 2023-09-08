import React, { useState } from 'react';
import ExplanatoryContainer from './ExplanatoryContainer';

const OutputBox = (props) => {

  const [showButton, setShowButton] = useState(false);
  const [showContainer, setShowContainer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const handleButtonClick = () => {
    setShowContainer(true);
  };

  const closeContainer = () => {
    setShowContainer(false);
  };

  const handleCopyClick = () => {
    const textToCopy = props.data;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log("Text copied successfully:", textToCopy);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });

    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  return (
    <div
      style={{
        backgroundColor: '#393d4d',
        borderRadius: '8px',
        padding: '10px',
        marginLeft: '10vw',
        marginBottom: '3vh',
        marginTop: '3vh',
        textAlign: 'right',
        maxWidth: '33vw',
        position: 'relative',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showButton && (
        <div style={{ position: 'absolute', top: '5px', right: '5px', marginTop: '-1.2vh' }}>
          <button onClick={handleButtonClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 384 512">
              <path
                d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"
                fill="#2053c9"
              />
            </svg>
          </button>
          <button
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
            onClick={handleCopyClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: isClicked ? '1.8em' : '1.65em', transform: 'translateY(1.4px)' }} viewBox="0 0 384 512">
              <path d="M384 160V32c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32v384c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V352h-48v128H48V32h288v128h48zM160 176H48v48h112v-48zm0 96H48v48h112v-48zm0 96H48v48h112v-48zm160-192h-96v48h96v-48zm0 96h-96v48h96v-48zm0 96h-96v48h96v-48zm0 96h-96v48h96v-48z" fill="#2053c9" />
            </svg>
          </button>
        </div>
      )}
      <p style={{ fontSize: '16px', margin: '5px', padding: '10px', textAlign: 'left', whiteSpace: "pre-wrap" }}>
        {props.data}
      </p>
      <p style={{ fontSize: '12px', color: '#888', textAlign: 'left' }}>
        Model: {props.model}, Word Limit: {props.wordLimit}
      </p>
      {showContainer && (
        <ExplanatoryContainer
          handleGoldenSummary={props.handleGoldenSummary}
          closeContainer={closeContainer}
          explanationData={props.explanationData}
          model={props.model}
          output={props.data}
          goldenData={props.goldenData} />
      )}
    </div>
  );
};
export default OutputBox;
