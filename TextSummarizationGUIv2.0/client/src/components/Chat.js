const Chat = (props) => {

  const chatItemStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    display: 'inline-block',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: 'white',
    fontSize: "16px",
    padding: "0px 20px 0px 10px",
    transition: 'background-color 0.3s ease',
  };

  const deletebuttonStyle = {
    display: 'inline-block',
    position: "absolute",
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: 'white',
    fontSize: "16px",
    padding: "0px 20px 0px 10px",
    transition: 'background-color 0.3s ease',
    marginTop: "2px",
    right: "34px",
  };

  const buttonContainerStyle = {
    borderRadius: '5px',
    backgroundColor: '#21438d',
    padding: '8px',
    display: 'inline-block',
    width: "195px",
  };

  return (
    <li style={chatItemStyle} >
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={props.handleChatClick} >{props.name} | {props.model} </button>
        <button style={deletebuttonStyle} onClick={props.handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="white">
            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
          </svg>
        </button>
      </div>
    </li>
  )

}

export default Chat