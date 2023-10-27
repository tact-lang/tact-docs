import React, { CSSProperties } from 'react';

const InfoBox = ({ type, color, children, wrapContent = false }) => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      paddingLeft: '1em',
      margin: '1em 0',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      whiteSpace: wrapContent ? 'normal' : 'nowrap',
      overflow: wrapContent ? 'visible' : 'hidden'
    },
    line: {
      position: 'absolute',
      top: 0,
      bottom: '0%',
      left: 0,
      width: '3px',
      backgroundColor: color,
      zIndex: 1
    },
    content: {
      marginLeft: '10px',
      overflow: wrapContent ? 'visible' : 'auto',
      whiteSpace: wrapContent ? 'normal' : 'nowrap'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.line}></div>
      <strong>{type}</strong>: 
      <div style={styles.content}>{children}</div>
    </div>
  );
};

export default InfoBox;
