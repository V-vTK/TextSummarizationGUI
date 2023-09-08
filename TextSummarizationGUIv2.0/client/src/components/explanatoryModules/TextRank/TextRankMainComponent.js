import CollapseContainer from "../Shared/CollapseContainer.js"
import TextRankGraphMap from "./TextRankGraphMap"
import WordLists from "../Shared/WordLists"
import MatrixVis from "../Shared/MatrixVis"
import PythonCodeDisplay from "../Shared/PythonCodeSnippet.js"
import SentenceRatings from "./SentenceRanking.js"
import OutputExp from "./OutputExp.js"
import TextRankFlowChart from "./TextRankFlowChart.js"
import TermComponent from "../Shared/TermComponent.js"

const TextRankMainComponent = (props) => {

  const pCode = `def power_method(matrix, epsilon):
    transposed_matrix = matrix.T
    sentences_count = len(matrix)
    p_vector = numpy.array([1.0 / sentences_count] * sentences_count)
    lambda_val = 1.0

    while lambda_val > epsilon:
        next_p = numpy.dot(transposed_matrix, p_vector)
        lambda_val = numpy.linalg.norm(numpy.subtract(next_p, p_vector))
        p_vector = next_p

    return p_vector`;


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: "3vh",
      paddingLeft: "4vw",
      paddingRight: "4vw"
    }}>
      <h1 style={{ marginTop: "2vh", textAlign: "center" }}>TextRank summarization</h1>
      <p style={{ textAlign: "center", fontSize: "1.4vw" }}>
        TextRank is a graph-based text summarization technique inspired by Google's PageRank algorithm.
        It converts a document into a graph, where sentences are nodes connected by edges based on
        {' '}
        <TermComponent word={"semantic"} hoverText={"refers to how closely sentences in a document are related in meaning or content. It measures the likeness of information between sentences based on the words and concepts they contain, helping the algorithm identify and connect sentences with similar meaning in the summarization process."}></TermComponent>
        {' '} similarity.
        Iteratively, it assigns importance scores to sentences considering both their connectivity and word frequency.
        The algorithm then selects the most important sentences to form a concise and coherent summary,
        making it a widely-used and language-independent method for automatic text summarization.
      </p>
      <h2 style={{ marginTop: '8vh' }}>Network graph</h2>
      <div style={{ width: "60vw", height: "60vh", border: '1.8px solid #ccc', borderRadius: "5px" }}>
        <TextRankGraphMap sentences={props.data.ratings} matrix={props.data.matrix}></TextRankGraphMap>
      </div>
      <p style={{ textAlign: "center", fontSize: "1.1vw" }}>Loading for large datasets takes time</p>
      <p style={{ textAlign: "left", fontSize: "2rem", padding: "4vw" }}>
        The network graph is meant to show the connections between the different nodes, a higher score means more similarity or likeness between nodes.
        The actual algorithm works by only using matrix calculations but a network graph is more human readable.
      </p>
      <TextRankFlowChart></TextRankFlowChart>
      <h2>Preprocessing</h2>
      <p style={{ textAlign: "left", fontSize: "2rem", paddingLeft: "4vw", paddingRight: "4vw" }}>
        Before calculating similarity we have to preprocess the text. The sentences are divided into words and the words are             {' '}
        <TermComponent word={"stemmed"} hoverText={"Stemming is the process of removing a part of a word, or reducing a word to its stem or root. For example: waiting --> wait"}></TermComponent>
        {' '} .
      </p>
      <CollapseContainer content={<WordLists wordLists={props.data.sentencesAsWordsSets}></WordLists>}></CollapseContainer>
      <h2 style={{ marginTop: "8vh" }}>Sentence similarity matrix (Stochastic)</h2>
      <div style={{ marginTop: "3vh", textAlign: "left" }}>
        <MatrixVis matrix={props.data.matrix}></MatrixVis>
      </div>
      <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
        The demonstration network graph is derived from a Stochastic matrix where each row of the matrix corresponds to a sentence,
        and each column represents the similarity score of that sentence with respect to others.
        The similarity is computed as the number of common words between them, divided by their sum of logarithm of their lengths.
        The matrix is normalized by dividing each row by the sum of it's elements, ensuring that the columns sum to one. The textrank method also applies a damping factor before the power method.
      </p>
      {props.data.matrix && props.data.matrix[0] && props.data.matrix[2] && (
        <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
          For example, the similarity score of the first sentence ({props.data.matrix[0][0]?.toFixed(4)}) in respect to the second sentence is {props.data.matrix[0][1]?.toFixed(4)} and the similarity of the third sentence ({props.data.matrix[2][2]?.toFixed(4)}) in respect to the first sentence is {props.data.matrix[2][0]?.toFixed(4)}.
        </p>
      )}

      <h2>The power method</h2>
      <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
        The power method is an iterative numerical algorithm used to find the dominant eigenvector (eigenvector corresponding to the largest eigenvalue) of a square matrix, particularly large and sparse matrices.
        The eigen vector is achieved by iterating through the matrix until in converges. The dominant eigenvector is important because it corresponds to the importance or ranking of each sentence in the document.
      </p>
      <div style={{ textAlign: "left" }}>
        <PythonCodeDisplay code={pCode}></PythonCodeDisplay>
      </div>
      <div style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
        <p>1. First, we transpose the stochastic matrix A^T.</p>
        <p>2. Next, we calculate the dimensions of the matrix (number of rows from the transposed matrix and number of columns from the original matrix).</p>
        <p>3. Then, we create a matrix called p_vector (Power vector) with each element having a value of 1 divided by the total number of sentences. The p_vector has as many columns as there are sentences.</p>
        <p>4. We assign an initial value for lambda.</p>
        <p>After that, we begin the iteration process:</p>
        <p>1. Calculate the next power vector (next_p) by performing the dot product between the transposed matrix and the current p_vector.</p>
        <p>2. Compute a new lambda value by finding the Euclidean norm of the difference between the current p_vector and next_p (square root of the sum of the squares of the vector's elements).</p>
        <p>3. Update the p_vector to have the same values as next_p</p>
        <p>This iteration continues until the lambda value becomes lower than a predefined epsilon value. Usually, epsilon is a small constant like 1e-4. Lower epsilon values lead to more iterations.</p>
        <p>Finally, the function returns the power_vector, which is also the dominant eigen vector for the original matrix.</p>
        <p>In this case, the power vector obtained was:</p>
        <CollapseContainer content={<div style={{ margin: '5px', padding: '5px', background: '#f5f5f5', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', }}>{props.data.powerVector}</div>}></CollapseContainer>
      </div>
      <h2>Sentence ranking</h2>
      <CollapseContainer content={<SentenceRatings data={props.data.ratings}></SentenceRatings>}></CollapseContainer>
      <div style={{ textAlign: "left" }}>
        <OutputExp sentences={Object.values(props.data.ratings).map(item => item.sentence)} output={props.output}></OutputExp>
      </div>
    </div>
  )
}


export default TextRankMainComponent