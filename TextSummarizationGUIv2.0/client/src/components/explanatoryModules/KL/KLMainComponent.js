import CollapseContainer from "../Shared/CollapseContainer.js";
import WordList from "../Shared/WordList.js";
import BarGraph from "../Shared/BarGraph.js";
import OutputExp from "../Shared/OutputExp.js";
import KLBarGraph from "./KLBarGraph.js";
import SentenceRatings from "../Shared/SentenceRatings.js";
import SentenceRatingComponent from "./KLIterationProcess.js";
import TermComponent from "../Shared/TermComponent.js";
import FlowChart from "./FlowChart.js";

const KLMainComponent = (props) => {
  const paragraphStyle = {
    textAlign: "left",
    fontSize: "2rem",
    paddingLeft: "4vw",
    paddingRight: "4vw",
    paddingTop: "4vh",
    marginBottom: "1rem",
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: "3vh",
          paddingLeft: "4vw",
          paddingRight: "4vw"
        }}>
        <h2 style={{ marginTop: "2vh" }}>KL sum summarization</h2>
        <p style={{ textAlign: "center", fontSize: "1.8rem", paddingLeft: "2vw", paddingRight: "2vw" }}>
          KL (Kullback-Leibler) summarization is a data-driven technique that employs statistical concepts to extract essential information from a document.
          It calculates the difference between word distributions in the original text and potential summaries to identify sentences that best represent the main ideas while reducing redundancy.
          By analyzing word frequencies, term importance, and contextual information, KL summarization aims to produce concise yet informative summaries.
        </p>
        <div style={{ marginTop: "6vh" }}>
          <FlowChart></FlowChart>
        </div>
        <p style={{ textAlign: "center", fontSize: "2rem", padding: "4vw", marginTop: "5vh" }}>
          First all the words are extracted from the document. Then they are {' '}
          <TermComponent word={"normalized"} hoverText={"Normalization in the context of natural language processing involves cleaning and preprocessing text data to make it consistent and usable for different NLP tasks. The process includes a variety of techniques such as case normalization, punctuation removal, stop word removal, stemming, and lemmatization."}></TermComponent> and {' '}
          <TermComponent word={"stop words"} hoverText={"A set of commonly used words for example, in English, “the”, “is” and “a” These words are considered insignificant in the context of NLP"}></TermComponent>
          {' '}  are filtered out.
        </p>
        <CollapseContainer content={<WordList name={"Normalized words"} words={props.data.normalizedWords}></WordList>}></CollapseContainer>
        <p style={{ textAlign: "left", fontSize: "2rem", padding: "4vw" }}>
          At its core, KL summarization utilizes the Kullback-Leibler divergence, a measure that quantifies the difference between two probability distributions.
          In this context, it measures the discrepancy between the distribution of words in the original document and the distribution of words in a candidate summary.
          By comparing these distributions, the algorithm can assess the informativeness of a sentence and its potential to represent the main ideas accurately.
        </p>
        <p style={{ textAlign: "center", fontSize: "2rem" }}>
          For this word frequencies are collected:
        </p>
        <BarGraph data={props.data.wordFreq}></BarGraph>
        <p style={{ textAlign: "left", fontSize: "2rem", padding: "4vw" }}>
          Term Frequency-Inverse Document Frequency (TF-IDF) are calculated to determine the importance of each word in the context of the entire document.
        </p>
        <KLBarGraph data={props.data.tfIdf}></KLBarGraph>
        <div style={paragraphStyle}>
          1. Term Frequency (TF): Measures the frequency of a word's occurrence in a particular document. A higher TF score indicates that a word appears more frequently within that document.
        </div>
        <div style={paragraphStyle}>
          2. Inverse Document Frequency (IDF): Measures the rarity of a word across all the documents in a collection. Words that appear in many documents within the collection are considered less informative, so they receive a lower IDF score. Conversely, words that appear in only a few documents or are rare in the collection receive a higher IDF score, indicating that they carry more unique information.
        </div>
        <div style={paragraphStyle}>
          The TF-IDF score is calculated by multiplying the TF score and the IDF score for each word in the document. The result is that words that appear frequently in the document (high TF) and are relatively rare across the entire document (high IDF) will have the highest TF-IDF scores. These words are deemed more important and distinctive for understanding the content of the specific document.
        </div>
        <p style={{ textAlign: "center", fontSize: "2.8rem", paddingLeft: "1.8vw", paddingRight: "2vw", paddingTop: "4vh" }}>Ranking the sentences using iterative summary building</p>
        <p style={{ textAlign: "left", fontSize: "2rem", padding: "4vw" }}>
          As we are looking for divergence between the summary and original document. We maintain a list of the current summary, a list of sentences that have been chosen (first list), A list of all the sentences (the whole document), and a list of sentences with the all the chosen sentences removed (third list).
          <br></br>
          <br></br>
          The summary list initially starts empty and gradually grows in each iteration by adding a sentence and removing it from the third list. Here are the steps performed in each iteration:
          <br></br>
          <br></br>
          1. Calculate KL divergence: We calculate the KL divergence for each sentence. This is done by comparing each sentence to the entire document. However, for the next iteration, we compare the current sentence to the whole document, excluding all the sentences already present in the summary. This way, we ensure that the chosen sentence best represents the remaining content of the document.
          <br></br>
          <br></br>
          2. Identify the best representation: We determine the sentence with the lowest KL divergence value, as it indicates the sentence that represents the document's content most effectively. The lower the divergence, the better the sentence represents the content. Once we find the best sentence, we add it to the summary list and remove it from the third list.
          <br></br>
          <br></br>
          3. Assign ratings: Sentences picked earlier in the process receive higher ratings, starting from zero and counting downwards. This rating system reflects their importance in the summary.
          <br></br>
          <br></br>
        </p>
        <CollapseContainer content={<SentenceRatingComponent data={props.data.kls}></SentenceRatingComponent>}></CollapseContainer>
        <p style={{ textAlign: "center", fontSize: "2.8rem", paddingLeft: "1.8vw", paddingRight: "2vw", paddingTop: "4vh" }}>Choosing the best rated sentences</p>
        <CollapseContainer content={<SentenceRatings data={props.data.ratings} name={"Sentence ratings:"}></SentenceRatings>}></CollapseContainer>
        <div style={{ textAlign: "center" }}>
          <OutputExp sentences={Object.keys(props.data.ratings)} output={props.output}></OutputExp>
        </div>
      </div>
    </>
  )
}

export default KLMainComponent