import React, { useState, useEffect } from 'react';

const RougeComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (props.goldenData === null && buttonPressed) {
      setIsLoading(true);
    }
    else {
      setIsLoading(false)
    }
  }, [props.goldenData, buttonPressed]);

  const buttonStyle = {
    borderRadius: "7px",
    border: "none",
    background: "#1875FF",
    color: "white",
    fontFamily: "inherit",
    textAlign: "center",
    fontSize: "1.4vw",
    boxShadow: "0px 14px 56px -11px #010812",
    width: "9.5em",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };

  const handleMouseEnter = (event) => {
    event.target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (event) => {
    event.target.style.transform = "scale(1)";
  };

  const handleButtonClick = () => {
    setButtonPressed(true);
    props.handleGoldenSummary();
  }

  return (
    <div style={{
      marginTop: "8vh", display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "4vw",
      paddingRight: "4vw"
    }}>
      <h2>Rouge analysis</h2>
      <div style={{
        width: "40vw",
        padding: "1vw",
        border: '1.8px solid #ccc',
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        flex: "wrap",
        backgroundColor: '#f0f0f0',
        alignItems: "center"
      }}>

        <p>Golden summary</p>
        {props.goldenData && props.goldenData[0] && Array.isArray(props.goldenData) && (
          <>
            <div style={{ fontSize: "1.2vw", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: '#f3f3f3', }}>
              <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "8px", width: "35vw", textAlign: "left" }}>
                {Array.isArray(props.goldenData[0]) ? (
                  <p style={{ margin: "0px" }}>{props.goldenData[0].join(' ')}</p>
                ) : (
                  <p style={{ margin: "0px" }}>{props.goldenData[0]}</p>
                )}
              </div>
            </div>
            <p>Rouge scores</p>
            <div style={{ fontSize: "1.4vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "8px", width: "35vw", textAlign: "left" }}>
                <p><strong>Rouge1</strong>{"  "}{props.goldenData[1][0]}</p>
                <p><strong>Rouge2</strong>{"  "}{props.goldenData[1][1]}</p>
                <p><strong>RougeL</strong>{"  "}{props.goldenData[1][2]}</p>
              </div>
            </div>
          </>
        )}
        {props.goldenData === null || !Array.isArray(props.goldenData[0]) ? (
          <button style={buttonStyle} onClick={handleButtonClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        ) : null}
        <div style={{ textAlign: 'left', paddingLeft: "4vw", paddingRight: "4vw" }}>
          <p style={{ fontSize: "1vw", marginBottom: "0vw" }}>This requires the installation of GPT4ALL and enabling the api interface. See The StartReadMe File</p>
          <p style={{ fontSize: "1vw", marginTop: "0.1vw", marginBottom: "0px" }}>The progress can be followed in the GPT4ALL server window</p>
        </div>
      </div>
    </div>
  )
}

export default RougeComponent
