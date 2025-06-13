import React from "react";
import Sidebar from "./components/Sidebar";
import FlowCanvas from "./components/FlowCanvas";

export default function App() {
  const handleAddNode = (type) => {
    console.log("Clicked shape:", type); // or call your flow logic
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onAddNode={handleAddNode} />
      <FlowCanvas />
    </div>
  );
}




















