import React, { useState } from "react";
import "./style.css";
import { Container, Col, Row } from "reactstrap";
import LogoAnimation from "../../../assets/animations/spt_logo.json"
import GlobeBlue from "../../../assets/img/globe-blue.png"
import GlobeOrange from "../../../assets/img/globe-orange.png"
import Lottie from "lottie-react";
import { connect } from "react-redux";
import planetBG from "../../../assets/img/header-background.png"
import { Link } from "react-router-dom";

function InformationSection(props) {
  const [animationActive, setAnimationActive] = useState(true);

  // Turn off space tokens animation after 1 minute
  const timer = () => setTimeout(() => {
    setAnimationActive(false)
  },60000)
  timer()

  return (
    <Container className="info-content" fluid>
      <Row className="bg-wrap" style={{ backgroundImage: `url(${planetBG})`}}>
        <Col xs={12} sm={12} md={12} lg={6} className="artwork-container">
          {/* <Row style={{justifyContent: 'space-between'}}>
            <img src={GlobeBlue} height={300} alt="globe-blue"/>
            <img src={GlobeOrange} height={300} alt="globe-orange"/>
          </Row> */}
          <Row style={{justifyContent: 'center'}}>
            <Lottie animationData={LogoAnimation} loop={animationActive} style={{height: 500}}/>
          </Row>
        </Col>
        <Col className="content">
          <div className="bg-wrapper">
            <h2 className="title">What are Space Tokens?</h2>
            <h5>Mission: Discover NFT Planets </h5>
            <p>
              Have you been dreaming of exploring the secrets of the universe? That's not an easy task if your last name isn't Armstrong, Bezos or Musk. Thankfully, you don't need billions in the bank to discover unique planetary NFTs. With the help of your Cardano wallet and a little bit of ADA, you can launch your expedition of the galaxy. 
            </p>
            <h5>Our Expedition Guarantee</h5>
            <p>
              Unlike real-world space exploration, you are guaranteed to return from your mission with a newly minted planet NFT. Similar to the real world, the more ADA you supply your expedition with, the further your explorative space cadets can travel and explore. The outcome? A more exotic and rare planet to add to your discoveries. 
            </p>
            <h5>Developing Unique NFT Art</h5>
            <p>
              Will your planet be gooey, volcanic, or terra? There are 24 different planets types to discover, all with their own unique characteristics. Go discover them all!
            </p>
            <h5>3, 2, 1, Lift Off!</h5>
            <p>
              Fuel up your Cardano wallet and launch yourself into an exciting new adventure. 
              While you're busy playing and discovering, your stake in the future of technology makes you part of sustainable change, one ADA at a time. 
              Have you always been on the cutting edge of technology? Being a keen explorer of crypto art pays off! The first 2,500 expeditions launched will receive a limited-edition Founder's NFT. 
            </p>
            <h5>Need More Mission Briefing?</h5>
            <p>
              Those geniuses at Space Tokens HQ think of everything. Please have a little look at our <Link to="/guide">FAQ</Link> for all you need to get started on your very first mission. Beep, beep, discovery process initiating. 
            </p>
            <h5>
            TL;DR
            </h5>
            <i>We get it; some space explorers have places to be, planets to discover, and missions to launch. We won't keep you much longer.</i>
            <br/>
            <br/>
            <b style={{color: '#0e2279'}}>Space Tokens is a game and an NFT platform built on Cardano focused on the joy of discovery. You send your expeditions into our galaxy and discover unique planetary NFT art.</b>
            <br/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default connect()(InformationSection);
