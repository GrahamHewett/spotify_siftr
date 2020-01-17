import React from "react";
import "./Buttons.css";

export default function Buttons({onGenerate}) {
  return (
    <div className="button-container">
      <div className="button-box">
        <button onClick={() => onGenerate()}>Generate</button>
      </div>
    </div>
  );
}