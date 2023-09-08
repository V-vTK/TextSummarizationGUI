import React from 'react';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import pythonStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light';

const PythonCodeDisplay = ({ code }) => {
  return (
    <SyntaxHighlighter language="python" style={pythonStyle}>
      {code}
    </SyntaxHighlighter>
  );
};

export default PythonCodeDisplay;