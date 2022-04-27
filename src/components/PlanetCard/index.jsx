import React from "react";
import "./style.css";
// import { cardanoScanUrl } from '../../util'

function PlanetCard({ planet, style }) {

  const formatDate = (date) => {
    let d = new Date(date)
    return d.toDateString()
  }

  let urlBase = process.env.NODE_ENV == 'development' ? 'https://www-d.spacetokens.io' : 'https://' + window.location.hostname
  const shareUrl = urlBase + '/d/' + planet?.discoveryNo
  // console.log(planet)
  return (
    <div className="planet-card" style={style}>
      <a href={shareUrl} target="_blank" rel="noopener noreferrer">
        <img src={planet?.imgUrl} alt="Planet" />
        <h4>{planet?.name}</h4>
        <span className="planet-label">Discovered: <span className="planet-attribute">{formatDate(planet?.date)}</span></span>
        <br/>
        <span className="planet-label">ADA: <span className="planet-attribute">{planet?.price}</span></span>
        <br/>
        <br/>

        <span className="planet-label">Type: <span className="planet-attribute">{planet?.type}</span></span>
        <br/>
        <span className="planet-label">Size: <span className="planet-attribute">{planet?.size}</span></span>
        <br/>
        <span className="planet-label">Class: <span className="planet-attribute">{planet?.class}</span></span>
        <br/>
        <br/>
      </a>

      <span style={{fontWeight: 'bold'}}>Transaction:</span>
      <br/>

      <a className="address-link" href={planet?.transaction_viewer_url} target="_blank" rel="noopener noreferrer">{planet?.minted_transaction_hash ? planet?.minted_transaction_hash.slice(0, (window.innerWidth < 1000 ? 18 : 30)) : 'Minting in progress'}...</a>
    </div>
  );
}

export default PlanetCard;
