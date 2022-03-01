import ReactFlow, {
  Position,
  EdgeProps,
  ArrowHeadType,
} from "react-flow-renderer";

const defaultNodeOptions = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  type: "customNode",
  style: { border: "1px solid #777", fontSize: 32, padding: 10 },
};

const defaultEdgeOptions = {
  // sourceHandle: () => {},
  // targetHandle: () => {},
  // type: "floating",
  arrowHeadType: ArrowHeadType.Arrow,
};

export const createChildren = (
  count: number,
  centerX: number,
  centerY: number
) => {
  return new Array({ length: count }).map((_, index) => ({
    id: `c${index}`,
    data: { label: index },
    position: { x: 600, y: 50 },
    ...defaultNodeOptions,
  }));
};

export const createParents = (
  count: number,
  centerX: number,
  centerY: number
) => {
  return new Array({ length: count }).map((_, index) => ({
    id: "p2",
    data: { label: `Parent ${index}` },
    position: { x: 0, y: 150 },
    ...defaultNodeOptions,
  }));
};

export const createCurrentNode = (
  count: number,
  centerX: number,
  centerY: number
) => ({
  id: "current",
  data: { label: "CURRENT" },
  position: { x: 300, y: 50 },
  ...defaultNodeOptions,
});
