const ChatButton = (props) => {

  const buttonStyle = {
    display: "inline-block",
    borderRadius: "7px",
    border: "none",
    background: "#1875FF",
    color: "white",
    fontFamily: "inherit",
    textAlign: "center",
    fontSize: "13px",
    boxShadow: "0px 14px 56px -11px #010812",
    width: "9.5em",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
  };

  return (
    <button style={buttonStyle} onClick={props.handleAddChat}>
      New Chat
    </button>
  );
};

export default ChatButton;
