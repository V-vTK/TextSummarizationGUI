import React, { useRef, useEffect } from 'react';
import JsonShow from './saved/JsonShow.js';

import LuhnComponent from './explanatoryModules/Luhn/LuhnMainComponent.js'
import LuhnCode from './explanatoryModules/Luhn/LuhnCode.js';

import EdmundsonComponent from './explanatoryModules/Edmundson/EdmundsonMainComponent.js'
import EdmundsonCode from './explanatoryModules/Edmundson/EdmundsonCode.js';

import KLComponent from './explanatoryModules/KL/KLMainComponent.js'
import KLCode from './explanatoryModules/KL/KLCode.js';

import TextRankComponent from './explanatoryModules/TextRank/TextRankMainComponent.js'
import TextRankCode from './explanatoryModules/TextRank/TextRankCode.js';

import LexRankComponent from './explanatoryModules/LexRank/LexRankMainComponent.js';
import LexRankCode from './explanatoryModules/LexRank/LexRankCode.js';

import ReductionComponent from './explanatoryModules/Reduction/ReductionMainComponent.js';
import ReductionCode from './explanatoryModules/Reduction/ReductionCode.js';

import AbstractiveComponent from './explanatoryModules/Abstractive/AbstractiveMainComponent.js';

import DefaultComponent from './explanatoryModules/Default/DefaultMainComponent.js';
import DefaultCode from './explanatoryModules/Default/DefaultCode.js';

import SumBasicComponent from './explanatoryModules/SumBasic/SumBasicMainComponent.js';

import RandomComponent from './explanatoryModules/Random/RandomMainComponent.js';

import "../styles/Exp.css"
import RougeComponent from './explanatoryModules/Shared/RougeComponent.js';
import CollapseContainer from './explanatoryModules/Shared/CollapseContainer.js';


const ExplanatoryContainer = (props) => {

  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    const buttonElement = buttonRef.current;

    const handleScroll = () => {
      const { scrollTop } = containerElement;
      buttonElement.style.top = `${20 + scrollTop}px`;
    };

    containerElement.addEventListener('scroll', handleScroll);

    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const RenderModelComponent = () => {
    const { model } = props;

    if (model === 'luhn') {
      return <LuhnComponent data={props.explanationData} output={props.output} />;
    } else if (model === 'edmundson') {
      return <EdmundsonComponent data={props.explanationData} output={props.output} />;
    } else if (model === 'kl') {
      return <KLComponent data={props.explanationData} output={props.output}></KLComponent>;
    } else if (model === 'text-rank') {
      return <TextRankComponent data={props.explanationData} output={props.output}></TextRankComponent>;
    } else if (model === 'lex-rank') {
      return <LexRankComponent data={props.explanationData} output={props.output}></LexRankComponent>
    } else if (model === 'reduction') {
      return <ReductionComponent data={props.explanationData} output={props.output}></ReductionComponent>
    } else if (model === 'abstractive') {
      return <AbstractiveComponent data={props.explanationData} output={props.output}></AbstractiveComponent>
    } else if (model === 'default') {
      return <DefaultComponent data={props.explanationData} output={props.output}></DefaultComponent>
    } else if (model === 'sumbasic') {
      return <SumBasicComponent data={props.explanationData} output={props.output}></SumBasicComponent>
    } else if (model === 'random') {
      return <RandomComponent data={props.explanationData} output={props.output}></RandomComponent>
    } else {
      return null; // Render nothing if the model is not recognized
    }
  };

  const RenderSourceCode = () => {
    const { model } = props;

    if (model === 'luhn') {
      return <LuhnCode></LuhnCode>
    } else if (model === 'edmundson') {
      return <EdmundsonCode></EdmundsonCode>
    } else if (model === 'kl') {
      return <KLCode></KLCode>
    } else if (model === 'text-rank') {
      return <TextRankCode></TextRankCode>
    } else if (model === 'lex-rank') {
      return <LexRankCode></LexRankCode>
    } else if (model === 'reduction') {
      return <ReductionCode></ReductionCode>
    } else if (model === 'default') {
      return <DefaultCode></DefaultCode>
    } else {
      return null; // Render nothing if the model is not recognized
    }
  };

  return (
    <div
      className="normal-scrollbar"
      ref={containerRef}
      style={{
        position: 'fixed',
        top: '48%',
        left: 'calc(50% + 132.5px)',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        zIndex: '9999',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        width: 'calc(78vw - 132.5px)',
        height: '75vh',
        color: 'black',
        overflow: 'auto',
      }}
    > <div>
        <RenderModelComponent></RenderModelComponent>
      </div>
      <RougeComponent handleGoldenSummary={props.handleGoldenSummary} goldenData={props.goldenData}></RougeComponent>
      <div style={{ marginTop: '300px' }}>
        <div style={{ textAlign: "left", fontSize: "0.9vw" }}>
          <h2 style={{ paddingLeft: "2vw" }}>Source Code:</h2>
          {props.model === "abstractive" ? (
            <a href='https://github.com/huggingface/transformers/blob/main/src/transformers/pipelines/text2text_generation.py' style={{ paddingLeft: "2vw" }}>
              https://github.com/huggingface/transformers/blob/main/src/transformers/pipelines/text2text_generation.py
            </a>
          ) : (
            <a href='https://github.com/miso-belica/sumy/tree/main' style={{ paddingLeft: "2vw" }}>
              https://github.com/miso-belica/sumy/tree/main
            </a>
          )}
          <CollapseContainer content={<RenderSourceCode></RenderSourceCode>}></CollapseContainer>
        </div>
        <h4 style={{ paddingLeft: "1vw", textAlign: "left" }}>Data:</h4>
        <JsonShow data={props.explanationData}></JsonShow>
      </div>


      <button
        ref={buttonRef}
        onClick={props.closeContainer}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: '1',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
    </div>
  );

};

export default ExplanatoryContainer;