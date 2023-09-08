import React, { useState, useRef, useEffect } from 'react';

const CollapseContainer = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentExceedsThreshold, setContentExceedsThreshold] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleShowLess = () => {
    setExpanded(false);
    contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentExceedsThreshold(contentRef.current.scrollHeight > 600);
    }
  }, [content]);

  return (
    <div>
      <div ref={contentRef} style={{ maxHeight: expanded ? 'none' : '600px', overflow: 'hidden' }}>
        {content}
      </div>
      {!expanded && contentExceedsThreshold && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
          <button onClick={toggleExpand} style={{
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #bbb',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}>Show more</button>
        </div>
      )}
      {expanded && (
        <React.Fragment>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
            <button onClick={handleShowLess} style={{
              padding: '8px 16px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #bbb',
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>Show less</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CollapseContainer;
