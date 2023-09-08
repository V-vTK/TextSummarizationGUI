const HomeScreen = () => {
  const mainContainer = {
    minHeight: "120vh"
  }

  const styles = {
    container: {
      marginTop: "6vh",
      paddingLeft: "6vw",
      paddingRight: "6vw",
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px',
    },
    title: {
      marginBottom: '10px',
      fontSize: '1.26vw',
      fontWeight: 'bold',
      textAlign: 'center',
      borderBottom: '2px solid #abaeba',
      paddingBottom: '12px',
    },
    explanation: {
      marginTop: "4px",
      paddingLeft: "1vw",
      marginBottom: "0px",
      fontSize: '0.76vw',
      textAlign: 'left',
      justifyContent: 'flex-end',
    },
  };

  return (
    <>
      <div style={mainContainer}>
        <h1 style={{ textAlign: "center", marginBottom: "0vh", padding: "0px" }}>TextSummarizationGUI</h1>
        <div style={styles.container}>
          <div style={styles.grid}>
            <div style={styles.column}>
              <div style={styles.title}>
                LSA (Latent Semantic Analysis)
              </div>
              <div style={styles.explanation}>
                 LSA, or Latent Semantic Analysis, is a technique that delves into the hidden patterns and relationships among words in a collection of text.
                 It accomplishes this by transforming the text into a simplified form that captures the underlying meanings.
                 LSA is particularly useful in summarization tasks, as it identifies significant themes and trims down the complexity of the text while retaining its essence.
                <div style={{ marginTop: "0.2vh" }}>This is marked as default in the menu</div>
              </div>
            </div>
            <div style={styles.column}>
              <div style={styles.title}>
                Reduction
              </div>
              <div style={styles.explanation}>
                 Reduction summarization employs a straightforward method of exhaustively comparing sentences and their constituent words with all other sentences.
                 Through this process, a rating and a norm are computed. By leveraging these calculated ratings,
                 the sentences can then be assessed to generate a well-structured and cohesive summary.
              </div>
            </div>
            <div style={styles.column}>
              <div style={styles.title}>
                Luhn's Method
              </div>
              <div style={styles.explanation}>
                Luhn's method, is a simple content-based summarization technique.
                It involves ranking sentences based on their keyword frequency and selecting the most significant sentences to form a coherent summary.
              </div>
            </div>

            <div style={styles.column}>
              <div style={styles.title}>
                Edmundson's Method
              </div>
              <div style={styles.explanation}>
                Edmundson's method combines several factors, including cue words, title words, and sentence location, to assess the importance of sentences. 
                It assigns scores to sentences based on these factors and selects the highest-scoring sentences for the summary.
              </div>
            </div>
            <div style={styles.column}>
              <div style={styles.title}>
                TextRank
              </div>
              <div style={styles.explanation}>
                TextRank is a graph-based algorithm inspired by PageRank, used for extractive summarization. 
                It constructs a graph where sentences are nodes, and edges represent the similarity between sentences. 
                Sentences with higher scores, computed iteratively based on graph connectivity, are selected for the summary.
              </div>
            </div>
            <div style={styles.column}>
              <div style={styles.title}>
                KL (Kullback-Leibler) Divergence
              </div>
              <div style={styles.explanation}>
                KL Divergence is a measure of the difference between two probability distributions. 
                In summarization, it can be used to compare the content of sentences against a reference summary. 
                Sentences are ranked based on their similarity to the reference summary using KL Divergence.
              </div>
            </div>

            <div style={styles.column}>
              <div style={styles.title}>
                Random
              </div>
              <div style={styles.explanation}>
                This approach involves selecting sentences randomly from the source document to create a summary. 
                While it's not a sophisticated method, it can be used as a baseline for evaluating the performance of more advanced summarization techniques.
              </div>
            </div>
            <div style={styles.column}>
              <div style={styles.title}>
                LexRank
              </div>
              <div style={styles.explanation}>
                LexRank is a graph-based summarization approach that uses the concept of eigenvector centrality to identify important sentences in a document. 
                It builds a similarity graph between sentences based on the content overlap and computes the importance of each sentence within the graph. 
                Sentences with higher LexRank scores are considered more relevant for summary generation.
              </div>
            </div>
            <div style={styles.column}>
              <div style={styles.title}>
                Abstractive
              </div>
              <div style={styles.explanation}>
                Abstractive summarization is a natural language processing technique used to generate concise and coherent summaries of longer pieces of text. 
                Unlike extractive summarization methods that select existing sentences from the original text, 
                abstractive summarization involves creating new sentences that capture the main ideas of the source text while potentially using different wording. 
                This application uses the huggingface transformers library and the Facebook BART-base model - the initialization will take some time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default HomeScreen;

