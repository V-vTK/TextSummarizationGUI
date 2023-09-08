import React from 'react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  marginTop: '25vh',
  marginBottom: '35vh',
  marginLeft: "4wv",
  marginRight: "4vw",
};

const boxStyle = {
  maxWidth: "400px",
  maxHeight: "400px",
  width: '16vw',
  height: '16vw',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  margin: '10px',
  color: '#fff'
};

const arrowStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
};

const rowStyle = {
  marginTop: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
};

const ArrowRowStyle = {
  marginBottom: '-12vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const BoxArrowComponent = () => {
  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <div style={{ ...boxStyle, backgroundColor: '#FF7675' }} id="box1">
          <h3 style={{ fontSize: "24px", marginBottom: '0px', textAlign: "center" }}>Input text</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
          </ul>
        </div>
        <div style={arrowStyle}>
          <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(0deg)' }}>
            <path d="M10 25 L30 25" stroke="#21438d" strokeWidth="3" />
            <path d="M30 25 L25 20" stroke="#21438d" strokeWidth="2" />
            <path d="M30 25 L25 30" stroke="#21438d" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ ...boxStyle, backgroundColor: '#74B9FF' }} id="box2">
          <h3 style={{ fontSize: "24px", marginBottom: '0px', textAlign: "center" }}>Cue words</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
            <li style={{ marginBottom: '5px' }}>- Choosing user picked 'cue words' for analysis</li>
            <li style={{ marginBottom: '5px' }}>- Cuewords: bonus, stigma and null words </li>
          </ul>
        </div>
        <div style={arrowStyle}>
          <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(0deg)' }}>
            <path d="M10 25 L30 25" stroke="#21438d" strokeWidth="3" />
            <path d="M30 25 L25 20" stroke="#21438d" strokeWidth="2" />
            <path d="M30 25 L25 30" stroke="#21438d" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ ...boxStyle, backgroundColor: '#55E6C1' }} id="box3">
          <h3 style={{ fontSize: "24px", marginBottom: '0px', textAlign: "center" }}>Preprocessing</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
            <li style={{ marginBottom: '5px' }}>- Stemming the text, and cue words</li>
          </ul>
        </div>
      </div>
      <div style={ArrowRowStyle}>
        <div style={{ ...boxStyle, backgroundColor: '#FF7675', visibility: "hidden" }} id="box1">
          Box 1
        </div>
        <div style={{ ...arrowStyle, visibility: "hidden" }}>
          <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(0deg)' }}>
            <path d="M10 25 L30 25" stroke="#21438d" strokeWidth="3" />
            <path d="M30 25 L25 20" stroke="#21438d" strokeWidth="2" />
            <path d="M30 25 L25 30" stroke="#21438d" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ ...boxStyle, backgroundColor: '#FF7675', visibility: "hidden" }} id="box1">
          Box 2
        </div>
        <div style={{ ...arrowStyle, visibility: "hidden" }}>
          <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(0deg)' }}>
            <path d="M10 25 L30 25" stroke="#21438d" strokeWidth="3" />
            <path d="M30 25 L25 20" stroke="#21438d" strokeWidth="2" />
            <path d="M30 25 L25 30" stroke="#21438d" strokeWidth="2" />
          </svg>
        </div>
        <svg width="75" height="75" viewBox="0 0 50 50" style={{ transform: 'rotate(90deg)' }}>
          <path d="M10 25 L30 25" stroke="#21438d" strokeWidth="3" />
          <path d="M30 25 L25 20" stroke="#21438d" strokeWidth="2" />
          <path d="M30 25 L25 30" stroke="#21438d" strokeWidth="2" />
        </svg>
      </div>
      <div style={rowStyle}>
        <div style={{ ...boxStyle, backgroundColor: '#FDCB6E' }} id="box4">
          <h3 style={{ fontSize: "24px", marginBottom: '0px', textAlign: "center" }}>Output</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
            <li style={{ marginBottom: '5px' }}>- Choosing best rated sentences according to the scores and their weights</li>
          </ul>
        </div>
        <div style={arrowStyle}>
          <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(180deg)' }}>
            <path d="M10 25 L30 25" stroke="#21438d" strokeWidth="3" />
            <path d="M30 25 L25 20" stroke="#21438d" strokeWidth="2" />
            <path d="M30 25 L25 30" stroke="#21438d" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ ...boxStyle, backgroundColor: '#F9A602' }} id="box5">
          <h3 style={{ fontSize: "24px", marginBottom: '0px', textAlign: "center" }}>Sentence scoring</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
            <li style={{ marginBottom: '5px' }}>- Each sentence will be scored using four methods, resulting in four individual ratings</li>

          </ul>
        </div>
        <div style={arrowStyle}>
          <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(180deg)' }}>
            <path d="M10 25 L30 25" stroke="#21438d" strokeWidth="3" />
            <path d="M30 25 L25 20" stroke="#21438d" strokeWidth="2" />
            <path d="M30 25 L25 30" stroke="#21438d" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ ...boxStyle, backgroundColor: '#A3CB38' }} id="box6">
          <h3 style={{ fontSize: "24px", marginBottom: '0px', textAlign: "center" }}>Analysis</h3>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
            <li style={{ marginBottom: '5px' }}>Four methods: Cue, Key, Location and Title method</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoxArrowComponent;
