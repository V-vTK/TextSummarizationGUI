import React, { useState, useEffect } from 'react';

const LoadingSidebar = () => {
  const [dotPhase, setDotPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotPhase((prevPhase) => (prevPhase + 1) % 4);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getDots = () => {
    switch (dotPhase) {
      case 1:
        return '.';
      case 2:
        return '..';
      case 3:
        return '...';
      default:
        return '';
    }
  };

  return (
    <div className="sidebar">
      <h2 style={{ display: 'flex', justifyContent: 'center', color: 'white', height: '100%', margin: 0, marginTop: "3vw" }}>
        <span style={{ textAlign: 'left' }}>Loading</span>
        {getDots()}
      </h2>
    </div>
  );
};

export default LoadingSidebar;





