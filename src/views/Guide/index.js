import "./style.css";
import React, { Component } from "react";
// import arrow from "../../assets/img/arrow.PNG";
import Header from "../../components/Header";
import faqData from './faqData'
import planetBG from "../../assets/img/bg-clear-large.png";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { firstPolicy } from '../../redux/application/selectors'

function Guide() {
  const faq = faqData(firstPolicy() + '.')

  return (
    <div>
      <Header component={"guide"} />
      <div
        className="guide"
        style={{ backgroundImage: `url(${planetBG})` }}
      >
        <Container>
          <Row style={{textAlign: 'center'}}>
            <Col md="11">
            <div className="guide-title">Welcome to Space Tokens!</div>
            </Col>
            <Col md="11">
              <h3 className="guide-description">Space Tokens is a discovery based NFT platform built on Cardano that lets you send expeditions into the galaxy to discover new and unique planetary NFT's.</h3>
            </Col>
          </Row>
          
          <Row style={{textAlign: 'left'}}>
            <Col md="11" style={{marginBottom: 20}}>
              <div className="guide-sub-header">How to Get Started</div>
              <h5 style={{marginBottom: 20}}><u>You'll need a Cardano Wallet with some ADA in it.</u></h5>
              <p>The current wallets that support native tokens on Cardano are <a href="https://daedaluswallet.io" target="_blank" rel="noopener noreferrer">Daedalus</a>, <a href="https://yoroi-wallet.com/#/" target="_blank" rel="noopener noreferrer">Yoroi</a>, and <a href="https://adalite.io/" target="_blank" rel="noopener noreferrer">Adalite</a> (hardware wallet recommended). 
                    Download your wallet of choice and get some ADA to get started. 
                    </p>
                    <p>NOTE: Do not send ADA from an exchange to a Space Tokens address. The exchange will end up owning your NFT! Only send ADA to Space Tokens from a wallet you holds the keys to.</p>
            </Col>
          </Row>
          
          <Row className="how-to-bg" style={{textAlign: 'left'}}>
            <Col md="8">
              <div className="how-to-title">How to launch your first expedition.</div>
              <ul className="how-to-body">
                <li style={{marginBottom: 5}}>Click start NFT expedition to begin the discovery process.</li>
                <li style={{marginBottom: 5}}>Decide what planet types you’d like a chance to discover.</li>
                {/* <li style={{marginBottom: 5}}>Move the ADA slider to an amount that falls within the ADA range of the planet class you’re interested in.</li> */}
                <li style={{marginBottom: 5}}>Launch Expedition! </li>
                <li style={{marginBottom: 5}}>Send the required amount of ADA to the payment address provided.</li>
                <li style={{marginBottom: 5}}>Wait for your expedition to complete and then inspect your discovery.</li>
                <li style={{marginBottom: 5}}>Your new NFT will be sent to the wallet address you paid with.</li>
              </ul>
            </Col>
          </Row>

          <Row style={{marginBottom: 40}}>
            <Col>
              <div className="faq-header">Frequently Asked Questions (FAQ)</div>
              {faq.rows.map((item, idx) => (
                <Row key={idx} className="faq-row-wrapper">
                  <h5 style={{color: '#0E2279'}}><b>{item.title}</b></h5>
                  <div style={{ textAlign: 'left', paddingLeft: 16, fontSize: 18 }}>{item.content}</div>
                </Row>
              ))}
            </Col>
          </Row>

        </Container>
      </div>
    </div>
  )
}

const styles = {
  bgColor: 'white',
  titleTextColor: "#0E2279",
  rowTitleColor: "#0E2279",
  // rowContentColor: 'grey',
  // arrowColor: "red",
  padding: 30
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

export default connect()(Guide);
