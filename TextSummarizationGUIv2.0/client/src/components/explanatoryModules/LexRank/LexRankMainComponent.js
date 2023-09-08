import LexRankGraphMap from './LexRankGraphMap'
import PythonCodeDisplay from "../Shared/PythonCodeSnippet.js"
import CollapseContainer from "../Shared/CollapseContainer.js"
import TermComponent from "../Shared/TermComponent.js"
import SentenceRatings from "./SentenceRanking.js"
import LexRankFlowChart from "./LexRankFlowChart.js"
import WordLists from "../Shared/WordLists"
import MatrixVis from "../Shared/MatrixVis"
import OutputExp from "./OutputExp.js"



const LexRankMainComponent = (props) => {

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

      <h1 style={{ marginTop: "2vh", textAlign: "center" }}>LexRank summarization </h1>

      <p style={{ textAlign: "center", fontSize: "1.4vw" }}>
        LexRank is an
        {' '}<TermComponent word={"unsupervided"} hoverText={"unsupervised refers to a machine learning approach where the model learns patterns and structures in text data without the use of labeled or annotated training examples. In unsupervised NLP tasks, the algorithm explores and clusters text data based on various statistical and linguistic properties, such as word co-occurrence, similarity, or distributional semantics, without explicit guidance or supervision from human-generated labels."}></TermComponent> {' '}
        graph-based method for text summarization.
        It creates a graph with sentences as nodes and edges based on their similarity.
        The importance of sentences is determined iteratively, considering their similarity to other sentences.
        The most important sentences form the summary, ensuring coherence and relevance.
        LexRank differs from Textrank by incorporating a notion of centrality based on cosine similarity between sentence vectors.
      </p>

      <h2 style={{ marginTop: '8vh' }}>Network graph</h2>
      <p style={{ textAlign: "center", fontSize: "1.0vw" }}>Edges with the weight of zero are removed</p>
      <div style={{ width: "60vw", height: "60vh", border: '1.8px solid #ccc', borderRadius: "5px" }}>
        <LexRankGraphMap matrix={props.data.matrix} sentences={props.data.ratings}></LexRankGraphMap>
        <p style={{ textAlign: "center", fontSize: "1.1vw" }}>Loading for large datasets takes time</p>
      </div>
      <p style={{ textAlign: "left", fontSize: "2rem", padding: "4vw" }}>
        The network graph is meant to show the connections between the different nodes, a higher score means more similarity or likeness between nodes.
        The actual algorithm works by only using matrix calculations but a network graph is more human readable.
      </p>
      <LexRankFlowChart></LexRankFlowChart>
      <h2 style={{ marginTop: "8vh" }}>Preprocessing</h2>
      <p style={{ textAlign: "left", fontSize: "2rem", paddingLeft: "4vw", paddingRight: "4vw" }}>
        Before calculating similarity we have to preprocess the text. The sentences are divided into words and the words are {' '}
        <TermComponent word={"stemmed"} hoverText={"Stemming is the process of removing a part of a word, or reducing a word to its stem or root. For example: waiting --> wait"}></TermComponent>
        .
      </p>
      <CollapseContainer content={<WordLists wordLists={props.data.sentencesAsWordsSets}></WordLists>}></CollapseContainer>

      <h2 style={{ marginTop: "8vh" }}>Sentence similarity matrix (Stochastic)</h2>
      <div style={{ marginTop: "3vh", textAlign: "left" }}>
        <MatrixVis matrix={props.data.matrix}></MatrixVis>
      </div>
      <div style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv", marginTop: "4vh" }}>
        The demonstration network graph is derived from a Stochastic matrix where each row of the matrix corresponds to a sentence,
        and each column represents the similarity score of that sentence with respect to others.
        The similarity is computed as the number of common words between them, divided by their sum of logarithm of their lengths.
        The matrix is normalized by dividing each row by the sum of it's elements, ensuring that the columns sum to one.
        {props.data.matrix && props.data.matrix[0] && props.data.matrix[2] && (
          <p style={{ textAlign: "left", fontSize: "1.1vw" }}>
            For example the similarity score of the first sentence ({props.data.matrix[0][0].toFixed(4)}) in respect to the second sentence is {props.data.matrix[0][1].toFixed(4)} and the similarity of the third sentence ({props.data.matrix[2][2].toFixed(4)}) in respect to the first sentence is {props.data.matrix[2][0].toFixed(4)}.
          </p>
        )}
        Both TextRank and LexRank employ damping effects in their stochastic matrices. However, LexRank distinguishes itself by introducing an additional step: a threshold filter. Only the most important similarity scores, above a certain threshold, are kept, while the rest are set to zero.
        This approach addresses sparsity and yields more effective and relevant summaries.
        <br /><br />
        During the matrix creation LexRank first calculates TF-IDF metrix (Term Frequency-Inverse Document Frequency) for each sentence.
        TF-IDF is a numerical representation of the importance of a word in a sentence relative to the entire document.
        <br /><br />
        After calculating the TF-IDF metrics, LexRank uses cosine similarity to measure the similarity between sentences.
        Cosine similarity is a metric that determines the cosine of the angle between two vectors, which represents the similarity of the sentences.
        In this case, the sentences are represented as vectors based on their TF-IDF metrics.
      </div>

      <h2>Recap: LexRank vs TextRank</h2>
      <div style={{ border: '1.8px solid #ccc', borderRadius: "5px", width: "60vw" }}>
        <h3 style={{ textAlign: "center" }}>Sentence similarity & Matrix Creation:</h3>
        <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
          LexRank: LexRank computes sentence similarity based on the cosine similarity of TF*IDF weighted word vectors of sentences. It takes into account the term frequency and inverse document frequency (IDF) of words to determine the similarity between sentences.
        </p>
        <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
          TextRank: TextRank also computes sentence similarity, but it uses a different approach. It calculates the similarity between sentences based on the number of common words they share divided by the sum of the logarithm of their lengths.
        </p>
      </div>
      <div style={{ marginTop: "2vw" }}></div>
      <div style={{ border: '1.8px solid #ccc', borderRadius: "5px", width: "60vw" }}>
        <h3 style={{ textAlign: "center" }}>Damping Factor (in this case):</h3>
        <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
          LexRank: The LexRank algorithm uses a damping factor of 0.1 for the power method.
        </p>
        <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
          TextRank: The TextRank algorithm uses a damping factor of 0.85 for the power method.
        </p>
      </div>

      <h2>The power method</h2>
      <p style={{ textAlign: "left", fontSize: "1.3vw", paddingLeft: "4vw", paddingRight: "4wv" }}>
        The power method is an iterative numerical algorithm used to find the dominant eigenvector (eigenvector corresponding to the largest eigenvalue) of a square matrix, particularly large and sparse matrices.
        The eigen vector is achieved by iterating through the matrix until in converges. The dominant eigenvector is important because it corresponds to the importance or ranking of each sentence in the document.
        The Power method is the same in both TextRank and LexRank; the difference comes from the differently calculated input matrices.
      </p>
      <div style={{ textAlign: "left", paddingLeft: "4vw", paddingRight: "4wv" }}>
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

export default LexRankMainComponent