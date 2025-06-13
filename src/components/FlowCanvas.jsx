import React, { useState, useCallback } from "react";
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
import "./FlowCanvas.css";
import "@xyflow/react/dist/style.css";

let id = 0;
const getId = () => `node_${id++}`;

function FlowContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { x, y, zoom } = useViewport(); // for projecting screen -> canvas coords
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

    // manually project screen coords to flow canvas coords
    const position = {
      x: (event.clientX - bounds.left - x) / zoom,
      y: (event.clientY - bounds.top - y) / zoom,
    };

    const newNode = {
      id: getId(),
      type: "default",
      position,
      data: {
        label: (
          <input
            defaultValue={type}
            style={{ border: "none", background: "transparent", width: "100%" }}
          />
        ),
      },
      style: getStyle(type),
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const getStyle = (type) => {
    switch (type) {
      case "rectangle":
        return { border: "2px solid #333", padding: 10 };
      case "diamond":
        return {
          width: 80,
          height: 80,
          border: "2px solid #333",
          transform: "rotate(45deg)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      case "circle":
        return {
          border: "2px solid #333",
          borderRadius: "50%",
          padding: 20,
        };
      case "arrow-right":
      case "arrow-left":
        return {
          width: 60,
          height: 2,
          backgroundColor: "#333",
        };
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
      >
        <MiniMap />
        <Controls />
        <Background gap={12} />
      </ReactFlow>

      <div className="flow-buttons">
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={handleDownloadImage}>📷 Download Image</button>
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





// import React, { useCallback, useState } from "react";
// import {
//   ReactFlow,
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Background,
//   Controls,
//   MiniMap,
//   MarkerType,
// } from "@xyflow/react";
// import { toPng } from "html-to-image";
// import "./FlowCanvas.css";
// import "@xyflow/react/dist/style.css";

// let id = 0;
// const getId = () => `node_${id++}`;

// export default function FlowCanvas() {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) =>
//         addEdge(
//           {
//             ...params,
//             markerEnd: {
//               type: MarkerType.ArrowClosed,
//             },
//           },
//           eds
//         )
//       ),
//     []
//   );

//   const onDragOver = (event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   };

//   const onDrop = (event) => {
//     event.preventDefault();
//     const type = event.dataTransfer.getData("application/reactflow");
//     if (!type || !reactFlowInstance) return;

//     const position = reactFlowInstance.project({
//       x: event.clientX - 150,
//       y: event.clientY - 60,
//     });

//     const newNode = {
//       id: getId(),
//       type: "default",
//       position,
//       data: {
//         label: (
//           <input
//             defaultValue={type}
//             style={{ border: "none", background: "transparent", width: "100%" }}
//           />
//         ),
//       },
//       style: getStyle(type),
//     };

//     setNodes((nds) => nds.concat(newNode));
//   };

//   const getStyle = (type) => {
//     switch (type) {
//       case "rectangle":
//         return { border: "2px solid #333", padding: 10 };
//       case "diamond":
//         return {
//           width: 80,
//           height: 80,
//           border: "2px solid #333",
//           transform: "rotate(45deg)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         };
//       case "circle":
//         return {
//           border: "2px solid #333",
//           borderRadius: "50%",
//           padding: 20,
//         };
//       case "arrow-right":
//         return {
//           width: 60,
//           height: 2,
//           backgroundColor: "#333",
//           position: "relative",
//         };
//       case "arrow-left":
//         return {
//           width: 60,
//           height: 2,
//           backgroundColor: "#333",
//           position: "relative",
//         };
//       default:
//         return {};
//     }
//   };

//   const handleSave = () => {
//     const flow = reactFlowInstance.toObject();
//     const blob = new Blob([JSON.stringify(flow)], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "flowchart.json";
//     a.click();
//   };

//   const handleDownloadImage = () => {
//     const wrapper = document.querySelector(".flow-wrapper");
//     toPng(wrapper).then((dataUrl) => {
//       const a = document.createElement("a");
//       a.href = dataUrl;
//       a.download = "flowchart.png";
//       a.click();
//     });
//   };

// //   const handleUpload = (e) => {
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const data = JSON.parse(reader.result);
// //       setNodes(data.nodes || []);
// //       setEdges(data.edges || []);
// //     };
// //     reader.readAsText(e.target.files[0]);
// //   };

//   return (
//     <div className="flow-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
//       <ReactFlowProvider>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onInit={setReactFlowInstance}
//           fitView
//         >
//           <MiniMap />
//           <Controls />
//           <Background gap={12} />
//         </ReactFlow>
//       </ReactFlowProvider>
//       <div className="flow-buttons">
//         <button onClick={handleSave}>💾 Save</button>
//         <button onClick={handleDownloadImage}>📷 Download Image</button>
//         {/* <input type="file" accept="application/json" onChange={handleUpload} /> */}
//       </div>
//     </div>
//   );
// }


// // Step 1: Update FlowCanvas.jsx with new features

// import React, { useState, useCallback } from "react";
// import {
//   ReactFlow,
//   ReactFlowProvider,
//   addEdge,
//   Background,
//   Controls,
//   MiniMap,
//   useNodesState,
//   useEdgesState,
//   MarkerType
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import "./FlowCanvas.css";
// import { toPng } from "html-to-image";

// let id = 0;
// const getId = () => `node_${id++}`;

// export default function FlowCanvas() {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) =>
//         addEdge(
//           {
//             ...params,
//             markerEnd: {
//               type: MarkerType.ArrowClosed,
//             },
//           },
//           eds
//         )
//       ),
//     []
//   );

//   const onDragOver = (event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   };

//   const onDrop = (event) => {
//     event.preventDefault();

//     const type = event.dataTransfer.getData("application/reactflow");
//     if (!type || !reactFlowInstance) return;

//     const position = reactFlowInstance.project({
//       x: event.clientX - 250,
//       y: event.clientY - 40,
//     });

//     const newNode = {
//       id: getId(),
//       type: "default",
//       position,
//       data: {
//         label: (
//           <input
//             defaultValue={getLabel(type)}
//             onBlur={(e) => updateNodeLabel(newNode.id, e.target.value)}
//             style={{ border: "none", background: "transparent", width: "100%" }}
//           />
//         ),
//       },
//     };

//     setNodes((nds) => nds.concat(newNode));
//   };

//   const getLabel = (type) => {
//     switch (type) {
//       case "rectangle":
//         return "Rectangle";
//       case "diamond":
//         return "Diamond";
//       case "circle":
//         return "Circle";
//       case "arrow-right":
//         return "Right Arrow";
//       case "arrow-left":
//         return "Left Arrow";
//       default:
//         return type;
//     }
//   };

//   const updateNodeLabel = (id, newLabel) => {
//     setNodes((nds) =>
//       nds.map((node) =>
//         node.id === id
//           ? { ...node, data: { ...node.data, label: newLabel } }
//           : node
//       )
//     );
//   };

//   const handleSave = () => {
//     const flow = reactFlowInstance.toObject();
//     const blob = new Blob([JSON.stringify(flow)], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "flowchart.json";
//     a.click();
//   };

//   const handleDownloadImage = () => {
//     const flowWrapper = document.querySelector(".flow-wrapper");
//     toPng(flowWrapper).then((dataUrl) => {
//       const a = document.createElement("a");
//       a.href = dataUrl;
//       a.download = "flowchart.png";
//       a.click();
//     });
//   };

//   const handleUpload = (e) => {
//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       const flow = JSON.parse(fileReader.result);
//       setNodes(flow.nodes || []);
//       setEdges(flow.edges || []);
//     };
//     fileReader.readAsText(e.target.files[0]);
//   };

//   return (
//     <div className="flow-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
//       <ReactFlowProvider>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onInit={setReactFlowInstance}
//           fitView
//         >
//           <MiniMap />
//           <Controls />
//           <Background gap={12} />
//         </ReactFlow>
//       </ReactFlowProvider>

//       <div className="flow-buttons">
//         <button onClick={handleSave}>Save (JSON)</button>
//         <button onClick={handleDownloadImage}>Download (Image)</button>
//         <input type="file" accept="application/json" onChange={handleUpload} />
//       </div>
//     </div>
//   );
// }










// FlowCanvas.jsx
// import React from "react";
// import "./FlowCanvas.css";

// export default function FlowCanvas() {
//   return (
//     <div className="flow-canvas">
//       <h2>flow-chart</h2>
//       {/* <p className="drag-label">← Drag & Drop</p> */}
//       <div className="button-group">
//         <button>Save</button>
//         <button>Download</button>
//       </div>
//     </div>
//   );
// }



// import React, { useCallback, useState } from "react";
// import {
//   ReactFlow,
//   ReactFlowProvider,
//   addEdge,
//   MiniMap,
//   Controls,
//   Background,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import "./FlowCanvas.css";

// const initialNodes = [];
// const initialEdges = [];

// export default function FlowCanvas() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const onDragOver = (event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   };

//   const onDrop = (event) => {
//     event.preventDefault();

//     const type = event.dataTransfer.getData("application/reactflow");

//     if (!type) return;

//     const position = reactFlowInstance.project({
//       x: event.clientX - 250,
//       y: event.clientY,
//     });

//     const newNode = {
//       id: `${+new Date()}`,
//       type: "default",
//       position,
//       data: { label: `${type}` },
//     };

//     setNodes((nds) => nds.concat(newNode));
//   };

//   return (
//     <div className="flow-canvas" onDrop={onDrop} onDragOver={onDragOver}>
//       <ReactFlowProvider>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={setNodes}
//           onEdgesChange={setEdges}
//           onConnect={onConnect}
//           onInit={setReactFlowInstance}
//           fitView
//         >
//           <MiniMap />
//           <Controls />
//           <Background color="#aaa" gap={16} />
//         </ReactFlow>
//       </ReactFlowProvider>
//     </div>
//   );
// }






// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   MiniMap,
//   Controls,
//   Background,
// } from "react-flow-renderer";
// import "./FlowCanvas.css";

// const initialNodes = [];
// const initialEdges = [];

// export default function FlowCanvas() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const onDragOver = (event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   };

//   const onDrop = (event) => {
//     event.preventDefault();

//     const type = event.dataTransfer.getData("application/reactflow");

//     if (!type) return;

//     const position = reactFlowInstance.project({
//       x: event.clientX - 250,
//       y: event.clientY,
//     });

//     const newNode = {
//       id: `${+new Date()}`,
//       type: "default",
//       position,
//       data: { label: `${type}` },
//     };

//     setNodes((nds) => nds.concat(newNode));
//   };

//   return (
//     <div className="flow-canvas" onDrop={onDrop} onDragOver={onDragOver}>
//       <ReactFlowProvider>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={setNodes}
//           onEdgesChange={setEdges}
//           onConnect={onConnect}
//           onInit={setReactFlowInstance}
//           fitView
//         >
//           <MiniMap />
//           <Controls />
//           <Background color="#aaa" gap={16} />
//         </ReactFlow>
//       </ReactFlowProvider>
//     </div>
//   );
// }
