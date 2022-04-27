import React from "react";
import "./style.css";

function PlanetClass({ planetClass, selected, soldout }) {
  return (
      <div className={`planet-class ${selected ? "selected-class" : ""}`}>
        <h5><b>Class {planetClass.class} Planets</b></h5>
        <div><b>{planetClass.subline}</b></div>
        <img src={planetClass.image} alt="PlanetClass" style={{width:200, marginTop: 3}}  />
        {!soldout && 
          <>
            <h5>{planetClass.range}</h5>
            <h5>ADA</h5>
            <br/>
            <div className="center-text"><b>Planet Types:</b></div>
            {planetClass.types.map((item, idx) => (
              <div key={`pc-${idx}`} className="center-text"><b>{item}</b></div>
            ))}
            
          </>
        }
        {soldout &&
          <div className="sold-out-text">
            Sold Out
          </div>
        }
        {soldout &&
          <div style={{marginTop: 90}}>
          </div>
        }
        <h5 style={{marginTop: 20}}>Planets:</h5>
        <h5>{planetClass.rarity}</h5>
        
      </div>
  );
}

export default PlanetClass;
