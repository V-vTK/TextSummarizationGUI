import React, { useState } from 'react';

const HoverableText = ({ word, hoverText }) => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>

      <span
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {' '}{word}{' '}
      </span>
      {hovered && (
        <span
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 100,
            minWidth: '30vw',
            maxWidth: '50vw'
          }}
        >
          {hoverText}
        </span>
      )}
    </span>
  );
};

export default HoverableText;
