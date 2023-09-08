import './App.css';
import { useEffect, useState } from 'react';
import apiService from './services/api';
import apiServiceChat from './services/chatApi';
import Sidebar from './components/Sidebar';
import InputChatBox from './components/InputChatBox';
import TextBoxesShow from './components/TextBoxesShow';
import apiServiceSummaryChat from './services/summaryChatApi';
import cueWordsService from './services/cueWordsApi';
import goldenSummaryApi from './services/goldenSummaryApi';
import HomeScreen from './components/HomeScreen';
import LoadingSideBar from './components/LoadingSideBar';

const App = () => {
  const [newChats, setNewChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState(null)
  const [selectedModel, setSelectedModel] = useState("default");
  const [inputText, setInputText] = useState('');
  const [wordLimit, setWordLimit] = useState(120);
  const [lists, setLists] = useState(["", "", ""]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getAll();
        console.log(response, "useEffect fetch");
        setNewChats(response);
        setLists(response.edmundson_cue_words);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setTimeout(() => {
          fetchData();
        }, 5000);
      }
    }

    console.log("fetching")
    if (loading) {
      fetchData();
    }
  }, [loading]);


  const handleSubmit = () => {
    const newCueWords = {
      "edmundson_cue_words": lists
    };
    cueWordsService.update(newCueWords)
      .then(response => {
        console.log('Word submitted:', response);
        setLists(response.edmundson_cue_words);
      })
      .catch(error => {
        console.error('Error submitting word:', error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
  };


  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFileInput = (props) => {
    setInputText(props);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };


  const sendMessage = () => {
    console.log('Message sent:', inputText);
    if (selectedChat) {
      const edmundson_cue_words = lists
      const chatId = newChats.chats[selectedChat - 1].id;
      const chatModel = newChats.chats[selectedChat - 1].model;
      const summariesV = newChats.chats[selectedChat - 1].summaries;
      const lastSummaryIndex = summariesV.length;
      const newSummaryKey = `summary${lastSummaryIndex + 1}`;
      const newSummary = {
        [newSummaryKey]: [inputText, "output", 'exp', wordLimit, chatModel, edmundson_cue_words]
      };

      apiServiceSummaryChat.update(chatId, newSummary)
        .then(response => {
          console.log('New summary added:', response);
          const updatedChats = newChats.chats.map((chat, index) => {
            if (index === selectedChat - 1) {
              return {
                ...chat,
                summaries: [...chat.summaries, response]
              };
            }
            return chat;
          });

          setNewChats(prevState => ({
            ...prevState,
            chats: updatedChats
          }));
        })
        .catch(error => {
          console.log('Error adding new summary:', error);
        });
    }
    setInputText('');
  };

  const handleInputChange = (event) => {
    console.log("Input change")
    const limit = parseInt(event.target.value);
    if (limit >= 0 && limit <= 1000) {
      setWordLimit(limit);
    }
  };

  const handleButtonClick = () => {
    console.log('Word Limit:', wordLimit);
  };


  const handleAddChat = () => {
    const usedIds = newChats.chats.map(chat => chat.id);
    let newId = 1;

    while (usedIds.includes(newId)) {
      newId++;
    }

    const nameID = `chat${newId}`;
    const newChat = {
      name: nameID,
      id: newId,
      model: selectedModel
    };

    apiServiceChat.update(nameID, newChat)
      .then(response => {
        setNewChats(prevState => {
          const updatedChats = [...(prevState.chats || []), response];
          const updatedModels = [...(prevState.models || [])];
          return { chats: updatedChats, models: updatedModels };
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log('Error: ID already exists');
        } else {
          console.log('Error: Failed to add chat');
        }
      });
  };

  const handleChatClick = id => {
    const chatIndex = newChats.chats.findIndex(chat => chat.id === id);
    setSelectedChat(chatIndex + 1);
    setSelectedChatName(id);
  };


  const handleDeleteOf = (id) => {
    const chatID = `chat${id}`;
    apiServiceChat.deleteP(chatID)
      .then(response => {
        console.log(response);
        setNewChats(prevState => {
          const updatedChats = prevState.chats.filter(chat => chat.id !== id);
          const updatedModels = [...(prevState.models || [])];
          return { chats: updatedChats, models: updatedModels };
        });
      })
      .catch(error => {
        console.log('Error deleting chat:', error);
      });
  };

  const handleAddWord = (listName, word) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const listIndex = getListIndex(listName);
      updatedLists[listIndex] = word;
      return updatedLists;
    });
  };

  const getListIndex = (listName) => {
    switch (listName) {
      case 'list1':
        return 0;
      case 'list2':
        return 1;
      case 'list3':
        return 2;
      default:
        return -1;
    }
  };

  const handleGoldenSummary = (summaryID) => {
    //add how many summaries to calculate
    const summaryListIndex = summaryID.slice(7);
    const thisSummary = newChats.chats[selectedChat - 1].summaries[summaryListIndex - 1];
    console.log(thisSummary)
    goldenSummaryApi.update(selectedChatName, summaryListIndex, thisSummary)
      .then(response => {
        const updatedChats = { ...newChats };
        updatedChats.chats[selectedChat - 1].summaries[summaryListIndex - 1] = response;
        setNewChats(updatedChats);
      })
      .catch(error => {
        console.error('Error with golden summary apif:', error);
      });
  };


  return (
    <>
      {loading ? (
        <LoadingSideBar></LoadingSideBar>
      ) : (
        <Sidebar
          handleAddChat={handleAddChat}
          handleDeleteOf={handleDeleteOf}
          itemsToShow={newChats}
          onChatClick={handleChatClick}
          onModelSelect={handleModelSelect}
          wordLimit={wordLimit}
          selectedModel={selectedModel}
          handleButtonClick={handleButtonClick}
          handleInputChange={handleInputChange}
          loading={loading}>
        </Sidebar>
      )}
      <div className='mainWrapper' id='mainWrapper'>
        {selectedChat && newChats.chats && newChats.chats.length > 0 && newChats.chats[selectedChat - 1] && (
          <>
            <TextBoxesShow
              data={newChats.chats[selectedChat - 1]}
              lists={lists} handleSubmit={handleSubmit}
              handleAddWord={handleAddWord}
              handleGoldenSummary={handleGoldenSummary}>
            </TextBoxesShow>
          </>
        )}
        {!selectedChat && (
          <HomeScreen></HomeScreen>
        )}
        <InputChatBox
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          sendMessage={sendMessage}
          InputText={inputText}
          handleFileChange={handleFileChange}
          handleFileInput={handleFileInput}>
        </InputChatBox>
      </div>
    </>
  );
}
export default App;

