import React, { useState } from 'react';
import Chat from "./Chat"
import WordLimitButton from './WordLimit';
import ChatButton from './ChatButton';

const Sidebar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!props.itemsToShow || !props.itemsToShow.chats) {
    return null; // or return an appropriate fallback UI
  }

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "calc(50px)",
    left: "142px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: "9999",
    display: isDropdownOpen ? "block" : "none",
    width: "100px"
  };


  const dropdownButtonStyle = {
    marginRight: '10px',
    padding: '6px 8px',
    backgroundColor: '#fff',
    border: 'none',
    width: "75px",
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    marginTop: "3px",
  };

  const ButtonStyle = {
    marginRight: '10px',
    padding: '6px 12px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    width: "90px",
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    marginTop: "3px",
    height: "35px",
  };

  const menuStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  };

  return (
    <div className="sidebar">
      <ChatButton handleAddChat={props.handleAddChat} />
      <button onClick={handleDropdownToggle} style={ButtonStyle}>
        {props.selectedModel}
      </button>
      <WordLimitButton
        wordLimit={props.wordLimit}
        handleInputChange={props.handleInputChange}
        handleButtonClick={props.handleButtonClick}>
      </WordLimitButton>
      <ul className="menu">
        {props.itemsToShow.chats.map((chat) => (
          <Chat
            key={chat.id}
            name={chat.name}
            model={chat.model}
            handleDelete={() => props.handleDeleteOf(chat.id)}
            handleChatClick={() => props.onChatClick(chat.id)}
          />
        ))}
      </ul>

      {props.selectedModel && props.itemsToShow.models && (
        <div style={dropdownMenuStyle}>
          <ul style={menuStyle}>
            {props.itemsToShow.models.map((model) => (
              <li
                key={model}
                onClick={() => props.onModelSelect(model)}
                style={dropdownButtonStyle}
              >
                {model}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
