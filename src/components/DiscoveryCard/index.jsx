import moment from "moment";
import React from "react";
import ShareModal from "../ShareModal";
import "./style.css";
// import { cardanoScanUrl } from '../../util'

function DiscoveryCard({ discovery, style, discoveredAt }) {

  const formatDate = (date) => {
    let d = new Date(date)
    return d.toDateString()
  }
  const { transaction_viewer_url, minted_transaction_hash, discovery_no, image_url } = discovery
  const attributes = discovery.discovery_attributes
  const { http_image, name, planet_class, planet_size, planet_type } = attributes

  let urlBase = process.env.NODE_ENV == 'development' ? 'https://www-d.spacetokens.io' : 'https://' + window.location.hostname
  const shareUrl = urlBase + '/d/' + discovery_no
  // const shareUrl = image_url
  const shareText = 'Check out this ' + planet_type + ' type Planet NFT called \'' + name + '\' at SpaceTokens.io!'
  return (
    <div className="discovery-card" style={style}>
      <h2>{name}</h2>
      <img src={http_image} alt="Discovery" />
      <span className="discovery-label">Discovered: <span className="discovery-attribute">{formatDate(discoveredAt)}</span></span>
      <br/>
      <br/>
      <span className="discovery-label">Type: <span className="discovery-attribute">{planet_type}</span></span>
      <br/>
      <span className="discovery-label">Size: <span className="discovery-attribute">{planet_size}</span></span>
      <br/>
      <span className="discovery-label">Class: <span className="discovery-attribute">{planet_class}</span></span>
      <br/>
      <br/>

      <span style={{color:'white'}}><b>Transaction:</b></span>
      <br/>
      <a className="address-link" href={transaction_viewer_url} target="_blank" rel="noopener noreferrer">{minted_transaction_hash ? minted_transaction_hash.slice(0, 30) : 'Minting in progress'}...</a>
      <ShareModal shareUrl={shareUrl} shareText={shareText} shareImgUrl={image_url} />
    </div>
  );
}

export default DiscoveryCard;
