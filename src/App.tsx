import React from "react";
import ReactFlow from "react-flow-renderer";

import { useReactFlow } from "./hooks";

import BaseNode from "./components/BaseNode";

const nodeTypes = {
  customNode: BaseNode,
};

const App = () => {
  const {
    elements,
    setParentCount,
    setChildrenCount,
    setWidth,
    setHeight,
    parentCount,
    childrenCount,
    width,
    height,
    flowStyles,
    onMove,
  } = useReactFlow();

  return (
    <>
      <div>
        <label id="height">Canvas Height: </label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(e) => {
            setHeight(+e.currentTarget.value);
          }}
        />
      </div>
      <div>
        <label id="width">Canvas Width: </label>
        <input
          id="width"
          type="number"
          value={width}
          onChange={(e) => {
            setWidth(+e.currentTarget.value);
          }}
        />
      </div>
      <div>
        <label id="parent">Parent Count: </label>
        <input
          id="parent"
          type="number"
          value={parentCount}
          onChange={(e) => {
            setParentCount(+e.currentTarget.value);
          }}
        />
      </div>
      <div>
        <label id="children">Children Count: </label>
        <input
          id="children"
          type="number"
          value={childrenCount}
          onChange={(e) => {
            setChildrenCount(+e.currentTarget.value);
          }}
        />
      </div>
      <ReactFlow
        // className="nodrag"
        elements={elements}
        style={flowStyles}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        elementsSelectable={false}
        nodesConnectable={false}
        // onlyRenderVisibleElements={false}
        // onlyRenderVisibleNodes={false}
        // zoomOnScroll={false}
        // zoomOnDoubleClick={false}
        // selectNodesOnDrag={false}
        panOnScroll
        onMove={onMove}
      />
    </>
  );
};

export default App;
