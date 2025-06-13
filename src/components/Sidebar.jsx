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





// import React from "react";
// import "./Sidebar.css";

// const elements = [
//   { type: "rectangle", label: "⬛" },
//   { type: "diamond", label: "🔷" },
//   { type: "circle", label: "⚪" },
//   { type: "arrow-right", label: "➡️" },
//   { type: "arrow-left", label: "⬅️" },
// ];

// export default function Sidebar() {
//   const onDragStart = (event, type) => {
//     event.dataTransfer.setData("application/reactflow", type);
//     event.dataTransfer.effectAllowed = "move";
//   };

//   return (
//     <div className="sidebar">
//       {elements.map((el) => (
//         <div
//           key={el.type}
//           className="sidebar-item"
//           draggable
//           onDragStart={(e) => onDragStart(e, el.type)}
//         >
//           {el.label}
//         </div>
//       ))}
//     </div>
//   );
// }








// Sidebar.jsx
// import React from "react";
// import "./Sidebar.css";

// const elements = [
//   { type: "rectangle", label: "⬛" },
//   { type: "diamond", label: "🔷" },
//   { type: "circle", label: "⚪" },
//   { type: "arrow-right", label: "➡️" },
//   { type: "arrow-left", label: "⬅️" },
// ];

// export default function Sidebar() {
//   const onDragStart = (event, type) => {
//     event.dataTransfer.setData("application/reactflow", type);
//     event.dataTransfer.effectAllowed = "move";
//   };

//   return (
//     <div className="sidebar">
//       {elements.map((el) => (
//         <div
//           key={el.type}
//           className="sidebar-item"
//           draggable
//           onDragStart={(e) => onDragStart(e, el.type)}
//         >
//           {el.label}
//         </div>
//       ))}
//     </div>
//   );
// }
