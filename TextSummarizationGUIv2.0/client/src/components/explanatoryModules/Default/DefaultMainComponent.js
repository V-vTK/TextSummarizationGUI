import React from 'react';
import CollapseContainer from "../Shared/CollapseContainer.js";
import SentenceRatings from "../Shared/SentenceRatings.js";
import TermComponent from "../Shared/TermComponent.js";
import OutputExp from "../Shared/OutputExp.js";
import LSAMatrix from './LSAMatrix';
import LSADictionary from './LSADictionary';
import BasicMatrix from './BaseMatrix';
import SigmaVector from './SigmaVector';


const DefaultComponent = (props) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: "3vh",
      paddingLeft: "4vw",
      paddingRight: "4vw"
    }}>

      <h1 style={{ marginTop: "6vh", textAlign: "center" }}>LSA - (Latent Semantic Analysis) </h1>

      <p style={{ textAlign: "center", fontSize: "1.4vw" }}>
        Latent Semantic Analysis (LSA) is an {' '}
        <TermComponent word={"unsupervided"} hoverText={"unsupervised refers to a machine learning approach where the model learns patterns and structures in text data without the use of labeled or annotated training examples. In unsupervised NLP tasks, the algorithm explores and clusters text data based on various statistical and linguistic properties, such as word co-occurrence, similarity, or distributional semantics, without explicit guidance or supervision from human-generated labels."}></TermComponent> {' '}
        technique for text summarization.
        By revealing underlying semantic connections in a body of text, LSA constructs a matrix that represents relationships between terms and documents.
        Through dimension reduction, it uncovers essential semantic factors and patterns, enabling a deeper comprehension of word and sentence interrelations. Unlike simplistic word matching,
        LSA's emphasis on context and semantics guarantees a coherent and pertinent approach to generating summaries.
      </p>
      <h2 style={{ marginTop: '8vh' }}>LSA matrix</h2>
      <LSAMatrix matrix={props.data.lsaMatrix}></LSAMatrix>
      <p style={{ textAlign: "left", fontSize: "1.4vw", paddingLeft: "4vw", paddingRight: "4vw" }}>
        The LSA method creates a matrix, where each row corresponds to a unique word and each column corresponds to a sentence.
        The matrix is filled with word occurrence counts which are normalized between 0 and 1.
      </p>
      <CollapseContainer content={<LSADictionary dictionary={props.data.lsaDictionary}></LSADictionary>}></CollapseContainer>
      <p style={{ textAlign: "left", fontSize: "1.4vw", paddingLeft: "4vw", paddingRight: "4vw" }}>
        Here is the LSA dictionary that maps each unique word to a unique row index.
        This means that if a word appears multiple times in the document, it is still mapped to the same row index in the matrix. This mapping ensures consistency and proper alignment of words in the matrix.
      </p>
      <p style={{ textAlign: "left", fontSize: "1.4vw", paddingLeft: "4vw", paddingRight: "4vw" }}>
        The LSA matrix is then made to represent normalized term frequency metric. The term frequency metric indicates the importance of a word in a particular sentence relative to the other words in the same sentence.
        For that Matrix SVD (Singular Value Decomposition) is calculated. SVD decomposes the original matrix into three different pieces (u, sigma and v). U, sigma and v can be multiplied to create an approximation of the original matrix. In LSA only the (sigma) vector and (v) matrix are used
      </p>
      <h3>Sigma vector</h3>
      <CollapseContainer content={<SigmaVector vector={props.data.sigma}></SigmaVector>}></CollapseContainer>
      <p style={{ textAlign: "left", fontSize: "1.4vw", paddingLeft: "4vw", paddingRight: "4vw" }}>
        The sigma vector tells you the importance of each latent semantic concept.
      </p>
      <h3>V (rightSingularVecotrs) matrix</h3>
      <BasicMatrix matrix={props.data.rightSingularVecotrsV}></BasicMatrix>
      <p style={{ textAlign: "left", fontSize: "1.4vw", paddingLeft: "4vw", paddingRight: "4vw" }}>

      </p>
      <p style={{ textAlign: "left", fontSize: "1.4vw", paddingLeft: "4vw", paddingRight: "4vw" }}>
        Larger singular values indicate more important concepts. The V matrix tells you how much each sentence aligns with these important concepts.
      </p>
      <p style={{ textAlign: "left", fontSize: "1.4vw", paddingLeft: "4vw", paddingRight: "4vw" }}>
        By combining the sigma vector with the V matrix, you can rank sentences based on their relevance to the important latent concepts.
        Sentences that have high alignment with important concepts are considered more relevant to the overall content of the document.
      </p>
      <CollapseContainer content={<SentenceRatings data={props.data.sentenceRatings} name={"Sentence ratings:"}></SentenceRatings>}></CollapseContainer>
      <div style={{ textAlign: "center" }}>
        <CollapseContainer content={<OutputExp sentences={Object.keys(props.data.sentenceRatings)} output={props.output}></OutputExp>}></CollapseContainer>
      </div>
    </div>
  )
}

export default DefaultComponent