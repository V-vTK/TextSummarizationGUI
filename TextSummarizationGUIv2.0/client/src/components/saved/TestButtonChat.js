const TestButtonChat = (props) => {
  const buttonStyle = {
    padding: "10px 10px",
    margin: "10px",
    fontSize: "14px",
    backgroundColor: "#3d94f6",
    textAlign: "center",
    textShadow: "0px 1px 0px #1570cd",
    boxShadow: "inset 0px 1px 0px 0px #97c4fe",
    borderRadius: "6px",
    color: "#ffffff",
    fontFamily: "Arial",
    cursor: 'pointer',
  }

  return (
    <button style={buttonStyle} onClick={props.handleAddChat}>AddChatIteration</button>
  )

}

export default TestButtonChat