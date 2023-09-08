import WordList from "./WordList.js"
import CueMethodRatings from "./CueMethodRatings.js"
import MethodRatings from "./MethodRatings.js"
import CollapseContainer from "../Shared/CollapseContainer.js"
import FlowChart from "./FlowChart.js"
import EdmundsonWeightSimulation from "./EdmundsonWeightSimulation.js"
import TermComponent from "../Shared/TermComponent.js"

const EdmundsonMainComponent = (props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: "3vh",
        }}
      >
        <h2 style={{ marginTop: "2vh" }}>Edmundson summarization</h2>
        <p style={{ textAlign: "center", fontSize: "24px" }}>
          Edmundson summarization is a {' '}
          <TermComponent word={"heuristic-based"} hoverText={"In text summarization, heuristic-based methods use rules or strategies to select and condense important information from a text without exhaustively analyzing every word. These methods prioritize efficiency and speed over perfect summarization. Examples include extracting key sentences based on criteria like sentence length or keyword frequency."}></TermComponent>
          {' '}
          approach aimed at condensing the crucial information from a document.
          It functions by identifying key terms and assessing sentences based on their correlation with these terms.
          The objective is to choose the most pertinent sentences that effectively encapsulate the main concepts.
          In Edmundson summarization, significance is determined by various factors such as frequencies of cue words, and location of sentences within the document.
          By employing this comprehensive evaluation process, Edmundson summarization seeks to extract the essential content while maintaining its coherence and relevance.
        </p>
        <div style={{ marginTop: "6vh" }}>
          <FlowChart></FlowChart>
        </div>
        <h3 style={{ textAlign: "center", marginTop: "6vh" }}> Score = (w1 x P)+(w2 x F)+(w3 x C)+(w4 x S)</h3>
        <p style={{ textAlign: "center", fontSize: "24px" }} >
          Sentences are assigned scores using four different methods and the final score is calculated by the formula above (weight * method score). Higher the score the more important the sentence considered.
          The four different methods are:
          cue method, key method, title method and the location method.
        </p>
      </div>
      <div style={{ marginTop: '5vw', textAlign: 'center', padding: '2vw' }}>
        <h2>The cue method</h2>
        <p style={{ fontSize: "24px" }}>
          The cue method involves identifying specific cue words or phrases that indicate important information.
          These cues can be predetermined terms or phrases that are known to be relevant to the topic at hand.
          Sentences containing these cue words or phrases are given higher significance in the summarization process.
        </p>
        <h4>The cue method uses the bonus and stigma words:</h4>
        {props.data && props.data.bonusWords && props.data.bonusWords.length > 0 ? (
          <WordList words={props.data.bonusWords} name={"Stemmed bonus words"} />
        ) : (
          <p>No data available</p>
        )}
        {props.data && props.data.stigmaWords && props.data.stigmaWords.length > 0 ? (
          <WordList words={props.data.stigmaWords} name={"Stemmed stigma words"} />
        ) : (
          <p>No data available</p>
        )}
        <p style={{ fontSize: "16px" }}>These are editable from the cue words tab</p>
        <p>By examining the frequency of these cue words we can rate the sentences.</p>
        {props.data && props.data.foundCueWords && props.data.allMethodRatings.cueMethod ? (
          <CollapseContainer content={<CueMethodRatings data={props.data.foundCueWords} cueData={props.data.allMethodRatings.cueMethod}></CueMethodRatings>}></CollapseContainer>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div style={{ marginTop: '5vw', textAlign: 'center', padding: '2vw' }}>
        <h2>The key method</h2>
        <p style={{ textAlign: "center", fontSize: "24px" }}>
          The key method focuses on identifying key terms or words that are crucial to understanding the main concepts of the document.
          These key terms are typically identified by their frequency of occurrence within the document.
          Sentences that contain these key terms are considered more important and are more likely to be included in the summary.
        </p>
        <h3>Key method vs Cue method</h3>
        <p style={{ textAlign: "center", fontSize: "24px" }}>
          The cue method counts the occurrences of stigma words and bonus words in sentences, while the key method links bonus words to significant words that represent key concepts in the document.
          The cue method focuses on word counts alone, while the key method connects the bonus words to the essential ideas conveyed by the significant words.
        </p>
        {props.data && props.data.bonusWords && props.data.bonusWords.length > 0 ? (
          <WordList words={props.data.bonusWords} name={"Stemmed bonus words"} />
        ) : (
          <p>No data available</p>
        )}
        {props.data && props.data.keySignificantWords && props.data.keySignificantWords.length > 0 ? (
          <WordList words={props.data.keySignificantWords} name={"Stemmed significant words found in the text"} />
        ) : (
          <p>No data available</p>
        )}
        {props.data && props.data.allMethodRatings.keyMethod ? (
          <CollapseContainer content={<MethodRatings cueData={props.data.allMethodRatings.keyMethod} name={"Found cue words and sentence ratings: "}></MethodRatings>}></CollapseContainer>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div style={{ marginTop: '5vw', textAlign: 'center', padding: '2vw' }}>
        <h2>Location Method</h2>
        <p style={{ textAlign: "center", fontSize: "24px" }}>
          The location method analyzes the hierarchical structure of a document, including headings, subheadings, and paragraphs.
          It assigns scores or ratings to sentences based on their location within these structural elements.
          Sentences positioned in higher-level headings or sections, as well as those at the beginning or end of paragraphs, receive higher scores.
          This approach ensures that important sentences are identified and prioritized for inclusion in the summary, as they are deemed more crucial for conveying the main concepts of the document.
        </p>
        {props.data && props.data.locationSignificantWords && props.data.locationSignificantWords.length > 0 ? (
          <WordList words={props.data.locationSignificantWords} name={"Stemmed significant words gathered from key locations"} />
        ) : (
          <>
            <p>No data available.</p>
            <p style={{ fontSize: "16px", marginTop: "1vh" }}>The location method works better with links and files</p>
          </>
        )}
        <p style={{ textAlign: "center", fontSize: "24px" }}>From the significant words these null words are filtered out: </p>
        {props.data && props.data.nullWords && props.data.nullWords.length > 0 ? (
          <WordList words={props.data.nullWords} name={"Stemmed null words"} />
        ) : (
          <p>No data available.</p>
        )}
        {props.data && props.data.allMethodRatings.locationMethod ? (
          <CollapseContainer content={<MethodRatings cueData={props.data.allMethodRatings.locationMethod} name={"Location method ratings:"}></MethodRatings>}></CollapseContainer>
        ) : (
          <p>No data available.</p>
        )}
      </div>

      <div style={{ marginTop: '5vw', textAlign: 'center', padding: '2vw' }}>
        <h2>Title Method</h2>
        <p style={{ textAlign: "center", fontSize: "24px" }}>
          The title method prioritizes sentences that align with the keywords or concepts found in the document's title.
          These sentences are considered more important and are given higher weight when creating the summary.
        </p>
        <h3>Location method vs Title method</h3>
        <p style={{ textAlign: "center", fontSize: "24px" }}>
          The location method ranks sentences based on their position within the document's structure, such as headings or paragraphs.
          The title method, on the other hand, evaluates sentences by comparing them to keywords found in the document's title.
        </p>
        {props.data && props.data.titleSignificantWords && props.data.titleSignificantWords.length > 0 ? (
          <WordList words={props.data.titleSignificantWords} name={"Stemmed significant words gathered from titles"} />
        ) : (
          <>
            <p>No data available.</p>
            <p style={{ fontSize: "16px", marginTop: "1vh" }}>The location method works better with links and files</p>
          </>
        )}
        <p style={{ textAlign: "center", fontSize: "24px" }}>From the significant words these null words are filtered out: </p>
        {props.data && props.data.nullWords && props.data.nullWords.length > 0 ? (
          <WordList words={props.data.nullWords} name={"Stemmed null words"} />
        ) : (
          <p>No data available.</p>
        )}
        {props.data && props.data.allMethodRatings.locationMethod ? (
          <CollapseContainer content={<MethodRatings cueData={props.data.allMethodRatings.locationMethod} name={"Title method ratings"}></MethodRatings>}></CollapseContainer>
        ) : (
          <p>No data available.</p>
        )}
      </div>

      <div style={{ marginTop: '5vw', textAlign: 'center', padding: '2vw' }}>
        <h2>Results and weight simulation</h2>
        {props.data && props.data.allMethodRatings && props.data.finalOutput ? (
          <EdmundsonWeightSimulation data={props.data.allMethodRatings} output={props.data.finalOutput}></EdmundsonWeightSimulation>
        ) : (
          <p>No data available.</p>
        )}
      </div>

    </>
  )
}

export default EdmundsonMainComponent