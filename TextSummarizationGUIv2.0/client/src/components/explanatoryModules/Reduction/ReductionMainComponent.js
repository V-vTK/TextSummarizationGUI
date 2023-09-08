import CollapseContainer from "../Shared/CollapseContainer.js";
import SentenceRatings from "../Shared/SentenceRatings.js";
import ReductionFlowChart from "./ReductionFlowChart.js";
import WordLists from "./WordLists.js";
import PythonCodeDisplay from "../Shared/PythonCodeSnippet.js";
import OutputExp from "../Shared/OutputExp.js";
import TermComponent from "../Shared/TermComponent.js";

const ReductionMainComponent = (props) => {
  const pCode = `def _rate_sentences_edge(self, words1, words2):
    rank = 0
    for w1 in words1:
        for w2 in words2:
            rank += int(w1 == w2)

    if rank == 0:
        return 0.0

    assert len(words1) > 0 and len(words2) > 0
    norm = math.log(len(words1)) + math.log(len(words2))
    return 0.0 if norm == 0.0 else rank / norm `;


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: "3vh",
      paddingLeft: "4vw",
      paddingRight: "4vw"
    }}>

      <h1 style={{ marginTop: "6vh", textAlign: "center" }}>Reduction summarization </h1>

      <p style={{ textAlign: "center", fontSize: "1.4vw" }}>
        Reduction summarization is a technique used to condense a document's content by identifying and selecting the most relevant sentences for summarization.
        It works by comparing sentences in a document based on the similarity of their word sets.
        The script assigns ratings to sentences based on the overlap of words between sentence pairs and then selects the top-rated sentences to create a concise summary.
        The process involves generating a score for each sentence pair, with higher scores indicating greater relevance.
        The ultimate goal is to provide a more compact representation of the original document while retaining its key information.
      </p>
      <div style={{ marginTop: "6vh" }}>
        <ReductionFlowChart></ReductionFlowChart>
      </div>
      <h2 style={{ marginTop: "8vh", textAlign: "center" }}>Preprocessing</h2>
      <p style={{ textAlign: "center", fontSize: "1.6vw", marginBottom: "0vh" }}>
        Sentences are made into lists of <TermComponent word={"stemmed"} hoverText={"Stemming is the process of removing a part of a word, or reducing a word to its stem or root. For example: waiting --> wait"}></TermComponent>  words
      </p>
      <div style={{ marginTop: "1vh" }}>
        <CollapseContainer content={<WordLists wordLists={props.data.sentenceWords}></WordLists>}></CollapseContainer>
      </div>
      <h2 style={{ marginTop: "6vh" }}>Similarity calculations</h2>
      <p style={{ textAlign: "center", fontSize: "1.6vw" }}>
        In essence, similarty calculations exhaustively explore all possible combinations of sentences and their words to determine how similar they are.
        It uses this approach to create a measure of similarity between sentences, which helps in understanding the relationships and connections between different pieces of text.
      </p>
      <div style={{ textAlign: "left", paddingLeft: "4vw", paddingRight: "4wv" }}>
        <PythonCodeDisplay code={pCode}></PythonCodeDisplay>
      </div>
      <div style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
        <p>1. For all words in the first sentence compare to all words in the second sentence,
          if the words match add a +1 to the rating, otherwise set the rating to zero. </p>
        <p>2. Calculate the norm by taking the logarithm of the ammount of words in first sentence and add the logarithm of the ammount of words in the second sentence. </p>
        <p>3. The rating for that sentence is calculated by dividing the total matches (rank) with the norm</p>
        <p><strong>This algorithm is run on all combinations of sentences</strong></p>
      </div>
      <h2 style={{ marginTop: "6vh" }}>Ratings for each sentence</h2>
      <CollapseContainer content={<SentenceRatings data={props.data.ratings}></SentenceRatings>}></CollapseContainer>
      <div style={{ textAlign: "left" }}>
        <OutputExp sentences={Object.keys(props.data.ratings)} output={props.output}></OutputExp>
      </div>
    </div>
  )
}

export default ReductionMainComponent

