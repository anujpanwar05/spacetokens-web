import "./style.css"
import React from "react"
// import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap"
import twitter from "../../assets/icons/twitter.png"
import instagram from "../../assets/icons/instagram.png"
import telegram from "../../assets/icons/telegram.png"
import reddit from "../../assets/icons/reddit.png"
import discord from "../../assets/icons/discord.png"
import { connect } from "react-redux";
import CardanoLogo from "../../assets/img/cardano-white-logo.png"

function Footer() {
  return (
    <div className="footer">
      <Container fluid>
        <Row>
          <Col sm={12} md={3} className="footer-col">
            <a href="https://twitter.com/space_tokens" target="_blank" rel="noopener noreferrer"><img className="social-img" src={twitter} alt="twitter" /></a>
            <a href="https://www.instagram.com/space_tokens/" target="_blank" rel="noopener noreferrer"><img className="social-img" src={instagram} alt="instagram" /></a>
            <a href="https://t.me/space_tokens_chat" target="_blank" rel="noopener noreferrer"><img className="social-img" src={telegram} alt="telegram" /></a>
            <a href="https://reddit.com/r/SpaceTokens" target="_blank" rel="noopener noreferrer"><img className="social-img" src={reddit} alt="reddit" /></a>
            <a href="https://discord.gg/bt5VbzK5s3" target="_blank" rel="noopener noreferrer"><img className="social-img" style={{ height: 40 }} src={discord} alt="discord" /></a>
          </Col>
          <Col sm={12} md={3} className="footer-col">
            <a href={'/SpaceTokens-PressKit.pdf'} target="_blank" rel="noopener noreferrer"><span className="footer-text">Media</span></a>
            <a href='mailto:info@spacetokens.io?subject=SpaceTokens' target="_blank" rel="noopener noreferrer"><span className="footer-text">Contact</span></a>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"><span className="footer-text">Privacy</span></a>
          </Col>
          <Col sm={12} md={3} className="footer-col" style={{marginLeft: -20}}>
              <a href={'https://cardano.org'} target="_blank" rel="noopener noreferrer">
                <img
                  src={CardanoLogo}
                  style={{width: 300}}
                  alt="Cardano"
                />
              </a>
              <span style={{marginLeft: -52, color: 'white'}}>
                &trade;
              </span>
          </Col>
          <Col sm={12} md={3} className="footer-col">
            <p>&copy; 2021 Space Tokens. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default connect()(Footer);
