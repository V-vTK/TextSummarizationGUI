import BarGraph from "./BarGraph.js";
import WordList from "./WordList.js";
import ChunkRatings from "./ChunkRatings.js";
import ImportantSentences from "./ImportantSentences.js";
import OutputExp from "../Shared/OutputExp.js";
import CollapseContainer from "../Shared/CollapseContainer.js";
import FlowChart from "./FlowChart.js";
import TermComponent from "../Shared/TermComponent.js";

const LuhnMainComponent = (props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: "3vh"
        }}
      >
        <h2 style={{ marginTop: "5vh" }}>Luhn summarization</h2>
        <p style={{ textAlign: "center" }}>
          Luhn summarization is a {' '}
          <TermComponent word={"heuristic-based"} hoverText={"In text summarization, heuristic-based methods use rules or strategies to select and condense important information from a text without exhaustively analyzing every word. These methods prioritize efficiency and speed over perfect summarization. Examples include extracting key sentences based on criteria like sentence length or keyword frequency."}></TermComponent>
          {' '}
          method designed to distill the essential information from a document.
          It operates by identifying significant words and evaluating sentences based on their association with these words.
          The goal is to select the most relevant sentences that capture the main ideas effectively. Significance in Luhn summarization is determined by word frequencies,
          wherein important words are moderately frequent within the text — present enough to carry meaning but not overly common.
        </p>
        <h3>Word frequencies</h3>
        {props.data.wordFreq && Object.keys(props.data.wordFreq).length > 0 ? (
          <BarGraph data={props.data.wordFreq} />
        ) : (
          <p>No data available.</p>
        )}
      </div>
      <div>
        <FlowChart></FlowChart>
      </div>
      <div style={{ marginTop: '5vw', textAlign: 'center', padding: '2vw' }}>
        <p>
          In the Luhn algorithm the words are first
          {' '}
          <TermComponent word={"stemmed"} hoverText={"Stemming is the process of removing a part of a word, or reducing a word to its stem or root. For example: waiting --> wait"}></TermComponent>
          {' '}
          then
          {' '}
          <TermComponent word={"stop words"} hoverText={"A set of commonly used words in any language. For example, in English, “the”, “is” and “and” These words are considered insignificant in the context of NLP."}></TermComponent>
          {' '}
          are filtered out. By identifying the words with higher frequencies, which are often indicative of their significance, the algorithm highlights the key terms that carry substantial meaning within the document.
          These important words play a crucial role in the subsequent steps of sentence rating and selection, leading to the creation of a meaningful and concise summary.
        </p>
        {props.data.significantWords && Object.keys(props.data.significantWords).length > 0 ? (
          <WordList words={props.data.significantWords} name={"Most significant stems"} />
        ) : (
          <p>No data available.</p>
        )}
        {props.data.stopwords && Object.keys(props.data.stopwords).length > 0 ? (
          <WordList words={props.data.stopwords} name={"Stop words removed"} />
        ) : (
          <p>No data available.</p>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: "3vh",
          marginTop: "5vh",
          textAlign: "left",
        }}
      >
        <p style={{ textAlign: "center", alignItems: "center" }}>With the significant stems we can calculate chunk ratings. </p>
        <CollapseContainer content={<ChunkRatings sentences={props.data.sentences} chunkRatings={props.data.chunkRatings} sentenceStems={props.data.SentenceStems}></ChunkRatings>}></CollapseContainer>
        <p style={{ textAlign: "left" }}>By using chunk ratings we can calculate sentence ratings and deduce the most important sentences.</p>
        <CollapseContainer content={<ImportantSentences sentences={props.data.significantSentences}></ImportantSentences>}></CollapseContainer>
        <CollapseContainer content={<OutputExp sentences={props.data.significantSentences} output={props.output}></OutputExp>}></CollapseContainer>
      </div>

    </>
  )
}

export default LuhnMainComponent

//<p> output: {props.output}</p>
//More theory
//Written explanation of the module
//How does the algorithm parse the final text?
//Output highlight in different colors


//<LuhnPicture />
//<p>Too high frequency (is, a , the) and too low frequency words are filtered out as they are not significant</p>
//are the stopwords really filtered? at least not at the significant words stage



// The __call__ method is the entry point of the summarization process. It takes a document (presumably an instance of a document class) and the desired number of sentences_count in the summary.

// Inside __call__, the _get_significant_words method is called to extract the significant words from the document. These words are considered important for determining the significance of sentences. The method removes stop words (common words like "the," "and," etc.) and creates a TfDocumentModel instance to calculate word frequencies.

// The rate_sentence method is used to rate each sentence in the document based on the occurrence of significant words. It calls _get_chunk_ratings to break each sentence into chunks and determine the ratings for each chunk.

// The _get_chunk_ratings method divides each sentence into chunks, where a chunk is a consecutive sequence of words. It assigns a rating to each chunk based on the presence of significant words. If a chunk contains a significant word, it is assigned a rating of 1; otherwise, it is assigned a rating of 0.

// The _get_chunk_rating method calculates the rating for each chunk. It considers the ratio of significant words to the total number of words in the chunk. If there is only one significant word in the chunk, the rating is set to 0 (to avoid single-word sentences). Otherwise, the rating is calculated as the square of the number of significant words divided by the total number of words in the chunk.

// Finally, the sentences are sorted based on their ratings, and the top sentences_count sentences with the highest ratings are selected to form the summary.




// In the Luhn algorithm, the words undergo stemming, followed by the removal of stop words. After these preprocessing steps, the algorithm determines the most important words based on the principle of term frequency.
//  Term frequency refers to the number of times a word appears in the document.
//  By identifying the words with higher frequencies, which are often indicative of their significance, the algorithm highlights the key terms that carry substantial meaning within the document.
// These important words play a crucial role in the subsequent steps of sentence rating and selection, leading to the creation of a meaningful and concise summary.