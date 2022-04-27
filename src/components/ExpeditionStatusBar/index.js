import React from "react";
import "./style.css";

function ExpeditionStatusBar({ currentStep }) {

  return (
    <div className="steps">
      {[
        "Waiting",
        "Prepping",
        "Fueling",
        "Launch",
        "Exploring",
        "Returning",
      ].map((item, idx) => (
        <div key={idx}>
          <p className="dot-text">{item}</p>
          <div className="dot">
            {idx < currentStep && <div />}
            {idx === currentStep && <div className="animate-step" />}
          </div>
        </div>
      ))}
      <div className="line" />
    </div>
  );
}

export default ExpeditionStatusBar;
