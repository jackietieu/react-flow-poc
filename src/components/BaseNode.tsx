import React, { memo } from "react";
import { TableIcon } from "@heroicons/react/outline";

import { Handle, Position, NodeProps } from "react-flow-renderer";

export default memo(({ data }: NodeProps) => {
  return (
    <div
      style={{
        width: 160,
        height: 80,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        // style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        // isConnectable={isConnectable}
      />
      <div style={{ display: "flex" }}>
        <TableIcon width="16" />
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        // style={{ top: "auto", background: "#555" }}
        // isConnectable={isConnectable}
      />
    </div>
  );
});
