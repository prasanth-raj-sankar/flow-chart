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








// App.jsx
// src/App.jsx
// import React from "react";
// import FlowCanvas from "./components/FlowCanvas";
// import Sidebar from "./components/Sidebar"; // If you're using a sidebar
// import "./App.css";

// export default function App() {
//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <FlowCanvas />
//     </div>
//   );
// }

















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
