import React from "react";
import "./style.css";

function ProgressBar({ value = 0, labels = [] }) {
  return (
    <div className="progress-bar-container">
      {labels.length > 0 && (
        <div className="labels">
          {labels.map((item, idx) => (
            <div key={idx}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
      <div className="progress-container">
        <div style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
