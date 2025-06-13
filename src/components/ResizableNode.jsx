import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
// import "./ResizableNode.css";

export default function ResizableNode({ data }) {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  return (
    <div style={{ padding: "5px", background: "#fff" }}>
      <ResizableBox
        width={width}
        height={height}
        onResizeStop={(e, data) => {
          setWidth(data.size.width);
          setHeight(data.size.height);
        }}
        minConstraints={[40, 40]}
        maxConstraints={[400, 400]}
        resizeHandles={["se", "s", "e"]}
        style={{
          border: "2px solid #333",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...data.style,
          position: "relative",
        }}
      >
        <input
          defaultValue={data.label}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            textAlign: "center",
            width: "100%",
            height: "100%",
            fontSize: "1rem",
          }}
        />
      </ResizableBox>
    </div>
  );
}
