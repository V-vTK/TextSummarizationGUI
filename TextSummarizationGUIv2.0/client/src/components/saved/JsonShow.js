const JsonShow = ({ data }) => {
  const containerStyle = {
    maxWidth: '100%',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
  };

  const preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
    textAlign: 'left',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <pre style={preStyle}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )

}

export default JsonShow