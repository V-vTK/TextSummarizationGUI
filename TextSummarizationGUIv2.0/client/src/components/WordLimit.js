import React, { useState } from 'react';

const WordLimitButton = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const labelStyle = {
    marginLeft: "10px",
    fontSize: "13px",
    fontFamily: "Arial",
    padding: "8px 12px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRight: "none",
    boxShadow: "none",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  };

  const inputStyle = {
    padding: "8px 6px",
    border: "1px solid #ccc",
    fontSize: "13px",
    fontFamily: "Arial",
    borderLeft: "none",
    borderRight: "none",
  };

  const buttonStyle = {
    marginTop: "-0.3px",
    padding: "4.9px 9px",
    backgroundColor: isHovered ? "#21438d" : "white",
    color: "white",
    border: "none",
    fontSize: "14px",
    fontFamily: "Arial",
    cursor: "pointer",
    borderLeft: "none",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  };

  const svgStyle = {
    width: "20px",
    height: "19px",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>Word Limit: </label>
      <input
        type="number"
        defaultValue={props.wordLimit}
        onChange={props.handleInputChange}
        min="0"
        max="1000"
        style={inputStyle}
      />
      <button onClick={props.handleButtonClick}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#1875FF" style={svgStyle}>
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
      </button>
    </div>
  );
};

export default WordLimitButton;
