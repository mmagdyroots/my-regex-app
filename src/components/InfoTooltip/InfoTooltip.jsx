import React, { useState, useEffect, useRef } from 'react';

function InfoTooltip({ tooltipText }) {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => setVisible((v) => !v);

  // Close the tooltip if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onClick={toggleTooltip}
        style={{
          position: 'absolute',
          insetInlineEnd: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#3498db',
          fontSize: '18px',
          transition: 'color 0.3s ease',
        }}
      >
        ℹ️
      </span>

      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: '120%',
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Adjust by half the width of the tooltip
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            whiteSpace: 'pre-line',
            zIndex: 10,
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
            width: '300px',
            transition: 'opacity 0.2s ease',
            opacity: visible ? 1 : 0,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
}

export default InfoTooltip;
