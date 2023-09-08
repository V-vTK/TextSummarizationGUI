import PromptBox from "./PromptBox"
import OutputBox from "./OutputBox"
import React, { useEffect, useRef, useState } from 'react';

const TextBoxesShow = (props) => {
  const mainWrapperRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    adjustContainerHeight();
    window.addEventListener("resize", adjustContainerHeight);

    return () => {
      window.removeEventListener("resize", adjustContainerHeight);
    };
  }, [props.data]);

  useEffect(() => {
    adjustContainerHeight();
    scrollToBottom();
  }, [props.data]);

  function adjustContainerHeight() {
    const mainWrapper = mainWrapperRef.current;
    const chatItems = mainWrapper.getElementsByClassName("chat-item");
    let totalHeight = 0;

    for (let i = 0; i < chatItems.length; i++) {
      totalHeight += chatItems[i].clientHeight;
    }

    setContentHeight(totalHeight);
  }


  function scrollToBottomButton() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  function scrollToBottom() {
    const mainWrapper = mainWrapperRef.current;
    mainWrapper.scrollTop = mainWrapper.scrollHeight;
  }

  const minHeight = `calc(${contentHeight + 500}px)`;
  return (
    <div ref={mainWrapperRef} style={{ minHeight, position: "relative" }}>
      {props.data.model === "edmundson" && !isMenuOpen && (
        <button style={{ position: "fixed", fontSize: "4wv", top: "3vh", right: "1vw", padding: "0.4vw", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }} onClick={toggleMenu}>Cue Words</button>
      )}
      {props.data.model === "edmundson" && isMenuOpen && (
        <div style={{ position: "fixed", top: "50%", left: "54%", transform: "translate(-50%, -50%)", backgroundColor: "#58606e", padding: "20px", borderRadius: "8px", minWidth: "60vw", maxHeight: "60vh", zIndex: 2, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <button style={{ position: "fixed", top: "5px", right: "10px", backgroundColor: "transparent", color: "none", border: "none", borderRadius: "4px", padding: "0.4vh", cursor: "pointer" }} onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 384 512" fill="#123070">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "10px" }}>
              <p style={{ fontSize: "16px", margin: "0" }}>Bonus words</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  onChange={(e) => props.handleAddWord("list1", e.target.value)}
                  style={{ marginTop: "20px", marginBottom: "10px", height: "30px", flex: 1, borderRadius: "4px", padding: "8px" }}
                  value={props.lists[0]}
                />
                <button style={{ backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", padding: "1.3vh", margin: 0, marginTop: "10px" }} onClick={() => props.handleSubmit("list1")}>Submit</button>
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <p style={{ fontSize: "16px", margin: "0" }}>Stigma words</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  onChange={(e) => props.handleAddWord("list2", e.target.value)}
                  style={{ marginTop: "20px", marginBottom: "10px", height: "30px", flex: 1, borderRadius: "4px", padding: "8px" }}
                  value={props.lists[1]}
                />
                <button style={{ backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", padding: "1.3vh", margin: 0, marginTop: "10px" }} onClick={() => props.handleSubmit("list2")}>Submit</button>
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <p style={{ fontSize: "16px", margin: "0" }}>Null words</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  onChange={(e) => props.handleAddWord("list3", e.target.value)}
                  style={{ marginTop: "20px", marginBottom: "10px", height: "30px", flex: 1, borderRadius: "4px", padding: "8px" }}
                  value={props.lists[2]}
                />
                <button style={{ backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", padding: "1.3vh", margin: 0, marginTop: "10px" }} onClick={() => props.handleSubmit("list3")}>Submit</button>
              </div>
              <p style={{ fontSize: "16px", margin: "2vh" }}>If any of the fields are left empty during submission, the fields will automatically populate with a predefined set of cue words.</p>
            </div>
          </div>
        </div>
      )}
      {props.data.summaries.map((summaryObj, index) => {
        const summaryKey = Object.keys(summaryObj)[0];
        const summaryPrompt = Object.values(summaryObj)[0][0];
        const summaryValue = Object.values(summaryObj)[0][1];
        const summaryExplanation = Object.values(summaryObj)[0][2];
        const summaryWordLimit = Object.values(summaryObj)[0][4];
        const summaryModel = Object.values(summaryObj)[0][3];
        const summaryGoldenData = Object.values(summaryObj)[0][6]
        const handleGoldenSummaryClick = () => {
          props.handleGoldenSummary(summaryKey);
        };

        return (
          <div key={summaryKey} className="chat-item">
            <PromptBox data={summaryPrompt} />
            <OutputBox
              handleGoldenSummary={handleGoldenSummaryClick}
              data={summaryValue}
              explanationData={summaryExplanation}
              model={summaryWordLimit}
              wordLimit={summaryModel}
              goldenData={summaryGoldenData || null}
            />
          </div>
        );
      })}

      <button
        style={{
          position: "fixed",
          bottom: "3vh",
          right: "1vw",
          padding: "0.3vw",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "0.85vw",
          zIndex: 1,
          opacity: 0.8,
          transition: "transform 0.2s",
          transformOrigin: "center"
        }}
        onClick={scrollToBottomButton}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 384 512" fill="white" style={{ transform: "inherit" }}>
          <path
            d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
          />
        </svg>
      </button>
    </div>
  );
};

export default TextBoxesShow;
