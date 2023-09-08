import React from 'react';
import OuputExp from "./OutputExp.js"

const TopRatedSentences = ({ data, weights, output }) => {
  const TotalRatings = {};
  const methods = Object.keys(data);

  methods.forEach((method, index) => {
    const sentences = Object.keys(data[method]);
    sentences.forEach((sentence) => {
      const rating = data[method][sentence] * weights[index];
      if (method === 'cueMethod') {
        TotalRatings[sentence] = rating;
      } else {
        TotalRatings[sentence] += rating;
      }
    });
  });

  const sortedSentences = Object.keys(TotalRatings).sort(
    (a, b) => TotalRatings[b] - TotalRatings[a]
  );
  const top5Sentences = sortedSentences.slice(0, 10);
  return (
    <div style={{
      padding: '10px',
      margin: '5px',
      borderRadius: '5px',
      fontSize: '16px',
      textAlign: 'center'
    }}>
      <h2>Top Rated Sentences</h2>
      <ol>
        {top5Sentences.map((sentence) => (
          <li key={sentence} style={{
            border: '1px solid gray',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: "1vh",
          }}>
            {sentence} <strong>rating: {TotalRatings[sentence]}</strong>
          </li>
        ))}
      </ol>
      <OuputExp sentences={top5Sentences} output={output}></OuputExp>
    </div>
  );
};

export default TopRatedSentences;
