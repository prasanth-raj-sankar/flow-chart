import React from "react";
import "./Sidebar.css";

const shapes = [
  { type: "rectangle", label: "Rectangle" },
  { type: "diamond", label: "Diamond" },
  { type: "circle", label: "Circle" },
  { type: "arrow-right", label: "→ Arrow Right" },
  { type: "arrow-left", label: "← Arrow Left" },
];

export default function Sidebar() {
  const onDragStart = (event, type) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Basic Shapes</h4>
      <div className="shape-list">
        {shapes.map((shape) => (
          <div
            key={shape.type}
            className={`shape shape-${shape.type}`}
            draggable
            onDragStart={(e) => onDragStart(e, shape.type)}
            title={shape.label}
          />
        ))}
      </div>
    </div>
  );
}






