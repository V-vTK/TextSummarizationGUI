import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';

const NetworkGraph = (props) => {
  const [loading, setLoading] = useState(true);
  const [graph, setGraphData] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    if (props.matrix.length < 40) {
      const nodes = Object.keys(props.sentences).map((nodeId) => ({
        id: nodeId,
        label: props.sentences[nodeId].sentence,
      }));

      const edges = props.matrix.flatMap((row, rowIndex) =>
        row.flatMap((weight, colIndex) => {
          if (weight !== 0) {
            return {
              from: rowIndex,
              to: colIndex,
              label: weight.toFixed(4),
            };
          } else {
            return [];
          }
        })
      );

      const graph = {
        nodes: nodes,
        edges: edges
      };
      setGraphData(graph);

    } else {
      const nodes = {}
      const edges = {}
      const graph = {
        nodes: nodes,
        edges: edges
      };
      setGraphData(graph);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [props.matrix, props.sentences]);



  const options = {
    layout: {
      improvedLayout: true,
      hierarchical: false,
      clusterThreshold: 1,
    },
    physics: {
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        nodeDistance: 200,
        springConstant: 0.05,
      },
      barnesHut: {
        gravitationalConstant: -30000,
        centralGravity: 0.6,
        springLength: 200,
        springConstant: 0.04,
        damping: 0.95,
        avoidOverlap: 0.2,
      },
      enabled: true,
      maxVelocity: 1,
      minVelocity: 0.1,
      solver: "barnesHut",
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
      },
    },
    edges: {
      color: "#4f4f59",
      smooth: true,
    },
    nodes: {
      borderWidth: 2,
      size: 60,
      font: {
        size: 12,
        color: "#fff",
      },
      color: {
        border: "#21438d",
        background: "#1875ff",
      },
    },
  };

  if (props.matrix.length > 40) {
    return <div style={{ textAlign: 'center' }}>Node network is too big to render. </div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  return <Graph graph={graph} options={options} style={{ height: '100%', width: '100%' }} />

};

export default NetworkGraph;
