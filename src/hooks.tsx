import { useEffect, useMemo, useState } from "react";
import { Position, ArrowHeadType, useZoomPanHelper } from "react-flow-renderer";

const defaultNodeOptions = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  type: "customNode",
  style: { border: "2px solid black", fontSize: 32, padding: 10 },
};

const defaultEdgeOptions = {
  arrowHeadType: ArrowHeadType.Arrow,
};

const CURRENT_ID = "current";

const HORIZONTAL_MARGIN = 400;
const VERTICAL_MARGIN = 0;

const NODE_HEIGHT = 160;
const NODE_WIDTH = 80;

export const useReactFlow = () => {
  const [parentCount, setParentCount] = useState(4);
  const [childrenCount, setChildrenCount] = useState(50);

  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(900);
  const { project } = useZoomPanHelper();
  const { x, y } = project({ x: width / 2, y: height / 2 });

  const [centerX] = useState(x);
  const [centerY, setCenterY] = useState(y);
  const [currentNode, setCurrentNode] = useState({
    id: CURRENT_ID,
    data: { label: "Current" },
    // current node scrolls up/down as users pan up/down
    position: { x: centerX, y: centerY },
    ...defaultNodeOptions,
  });
  const [initialCenterX] = useState(x - NODE_WIDTH / 2);
  const [initialCenterY] = useState(y - NODE_HEIGHT / 2);
  const [updateFlag, setUpdateFlag] = useState(true);

  const onMove = () => {
    setUpdateFlag((prev) => !prev);
  };

  useEffect(() => {
    const { y: projectY } = project({ x: width / 2, y: height / 2 });
    setCenterY(projectY);
    setCurrentNode({
      id: CURRENT_ID,
      data: { label: "Current" },
      // current node scrolls up/down as users pan up/down
      position: { x: centerX, y: projectY },
      ...defaultNodeOptions,
    });
  }, [centerX, project, updateFlag]);

  const createChildren = (count: number) => {
    return [...Array(count).fill(0)].map((_, index) => ({
      id: `c${index}`,
      data: { label: `Child ${index}` },
      position: {
        x: initialCenterX + HORIZONTAL_MARGIN + NODE_WIDTH,
        y:
          initialCenterY +
          NODE_HEIGHT * index +
          VERTICAL_MARGIN * index -
          (NODE_HEIGHT * childrenCount +
            VERTICAL_MARGIN * childrenCount -
            NODE_HEIGHT -
            VERTICAL_MARGIN) /
            2,
      },
      ...defaultNodeOptions,
    }));
  };

  const children = createChildren(childrenCount);

  const createParents = (count: number) => {
    return [...Array(count).fill(0)].map((_, index) => ({
      id: `p${index}`,
      data: { label: `Parent ${index}` },
      position: {
        x: initialCenterX - HORIZONTAL_MARGIN - NODE_WIDTH,
        y:
          initialCenterY +
          NODE_HEIGHT * index +
          VERTICAL_MARGIN * index -
          (NODE_HEIGHT * parentCount +
            VERTICAL_MARGIN * parentCount -
            NODE_HEIGHT) /
            2,
      },
      ...defaultNodeOptions,
    }));
  };

  const parents = createParents(parentCount);

  const edges: any[] = [];

  parents.forEach((node) => {
    edges.push({
      id: `${node.id}-${CURRENT_ID}`,
      source: node.id,
      target: CURRENT_ID,
      ...defaultEdgeOptions,
    });
  });

  children.forEach((node) => {
    edges.push({
      id: `${CURRENT_ID}-${node.id}`,
      source: CURRENT_ID,
      target: node.id,
      ...defaultEdgeOptions,
    });
  });

  const flowStyles = {
    height,
    width,
    // maxHeight: "100%",
    // overflow: "scroll",
    border: "2px solid black",
  };

  // console.log(currentNode?.position?.y);
  // console.log(project({ x: width / 2, y: height / 2 }));

  return useMemo(
    () => ({
      elements: [...parents, currentNode, ...children, ...edges],
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
    }),
    [childrenCount, parentCount, width, height, centerX, centerY]
  );
};
