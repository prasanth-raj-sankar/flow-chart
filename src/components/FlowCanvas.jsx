import React, { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  useReactFlow,
  useViewport,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import ResizableNode from "./ResizableNode";
import "./FlowCanvas.css";
import "@xyflow/react/dist/style.css";

let id = 0;
const getId = () => `node_${id++}`;

function FlowContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { x, y, zoom } = useViewport();
  const { toObject } = useReactFlow();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      ),
    []
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const bounds = event.target.getBoundingClientRect();
    const position = {
      x: (event.clientX - bounds.left - x) / zoom,
      y: (event.clientY - bounds.top - y) / zoom,
    };

    const newNode = {
      id: getId(),
      type: "resizable",
      position,
      data: {
        label: type,
        style: getStyle(type),
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const getStyle = (type) => {
    switch (type) {
      case "rectangle":
        return {};
      case "circle":
        return { borderRadius: "50%" };
      case "diamond":
        return { transform: "rotate(45deg)" };
      case "arrow-right":
        return { height: "4px", backgroundColor: "#333" };
      case "arrow-left":
        return { height: "4px", backgroundColor: "#333" };
      default:
        return {};
    }
  };

  const handleSave = () => {
    const flow = toObject();
    const blob = new Blob([JSON.stringify(flow)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flowchart.json";
    a.click();
  };

  const handleDownloadImage = () => {
    const wrapper = document.querySelector(".flow-wrapper");
    toPng(wrapper).then((dataUrl) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "flowchart.png";
      a.click();
    });
  };

  return (
    <div className="flow-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={{ resizable: ResizableNode }}
      >
        <MiniMap />
        <Controls />
        <Background gap={12} />
      </ReactFlow>

      <div className="flow-buttons">
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={handleDownloadImage}>📷 Download</button>
      </div>
    </div>
  );
}

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
}



