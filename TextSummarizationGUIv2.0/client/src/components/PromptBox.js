import React, { useState } from 'react';

const PromptBox = (props) => {

  const [showButton, setShowButton] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const handleButtonClick = () => {
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
        position: 'relative',
        backgroundColor: '#58606e',
        borderRadius: '8px',
        padding: '10px',
        marginLeft: '45vw',
        marginRight: '12vw',
        marginBottom: '3vh',
        marginTop: '3vh',
        textAlign: 'right',
        wordBreak: 'break-word',
        minWidth: "5vw"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showButton && (
        <button
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          onClick={handleButtonClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: isClicked ? '1.5em' : '1.3em' }} viewBox="0 0 512 512">
            <path fill="#1f4294" d="M448 384H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V320c0 35.3-28.7 64-64 64zM64 128h96v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V416h48v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z" />
          </svg>
        </button>
      )}
      <p style={{ fontSize: '16px', margin: '5px', padding: '5px', textAlign: 'left', whiteSpace: "pre-wrap" }}>{props.data}</p>
    </div>
  );
};

export default PromptBox;

