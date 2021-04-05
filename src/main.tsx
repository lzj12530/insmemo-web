import React from "react";
import ReactDOM from "react-dom";
import { Editor } from "./components/Editor";
import { MemoList } from "./components/MemoList";
import { Sidebar } from "./components/Sidebar";
import StateManager from "./helpers/StateManager";
import "./less/global.less";
import "./less/index.less";

function App() {
  StateManager.init();

  return (
    <div id="page-container">
      <Sidebar />
      <div className="content-wrapper">
        <Editor />
        <MemoList />
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
