import React, { useEffect } from "react"
import { Container, Col, Row } from "reactstrap"
import planetBG from "../../../assets/img/header-background.png"

import Aurora from "../../../assets/img/sample-planets/aurora.png"
import Aurora2 from "../../../assets/img/sample-planets/aurora2.png"
import Terra from "../../../assets/img/sample-planets/terra.png"
import Terra2 from "../../../assets/img/sample-planets/terra2.png"
import Desert from "../../../assets/img/sample-planets/desert.png"
import Desert2 from "../../../assets/img/sample-planets/desert2.png"
import Stratus from "../../../assets/img/sample-planets/stratus.png"
import Stratus2 from "../../../assets/img/sample-planets/stratus2.png"
import Savannah from "../../../assets/img/sample-planets/savannah.png"
import Savannah2 from "../../../assets/img/sample-planets/savannah2.png"
import Diamond from "../../../assets/img/sample-planets/diamond.png"
import Diamond2 from "../../../assets/img/sample-planets/diamond2.png"
import Ocean from "../../../assets/img/sample-planets/ocean.png"
import Ocean2 from "../../../assets/img/sample-planets/ocean2.png"
// import CardanoLogo from "../../../assets/img/cardano-logo.png"
import AdaLogo from "../../../assets/img/ada-logo.png"
import {ReactComponent as CardanoLogo} from "../../../assets/img/cardano-logo.svg"
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'

import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./style.css"
import { getPolicyIds } from "../../../redux/application/actions"

const planets = [
  Terra,
  Aurora,
  Desert,
  Stratus,
  Savannah,
  Diamond,
  Ocean,
  Terra2,
  Aurora2,
  Desert2,
  Stratus2,
  Savannah2,
  Diamond2,
  Ocean2
]

function HeaderSection(props) {

  const { spacePermitID, getPolicyIds } = props

  useEffect(() => {
    getPolicyIds()
  }, [spacePermitID, getPolicyIds])

  const getRandomPlanets = () => {
    const idx = Math.floor(Math.random() * 13)
    return [planets[idx], planets[idx+1]]
  }
  const planetSet = getRandomPlanets()

  const recordStartExpedition = () => {
    const action = 'Click Start Expedition'
    const category = 'Home'
    ReactPixel.trackCustom(action, { category: category })
    ReactGA.event({ category: category, action: action })
  }

  return (
    <div
      id="animate-area-right" 
      style={{ backgroundImage: `url(${planetBG})` }}
      className="header-section"
    >
      <Container>
        <Row>
          <Col md={3} xs={12} className="image-container hidden-sm">
            <img src={planetSet[0]} width={"100%"} style={{width: 300}} alt="Planet 1" />
          </Col>
          <Col md={6} className="content">
            <h1>Space Tokens</h1>
            <div className="vertical-borders">
              <h6>NFT Space Collectables</h6>
            </div>
            <h3 className="description-text">
              <Row>
                Discover unique planetary NFT's using your Cardano wallet and ADA.
                {/* <img
                  src={AdaLogo}
                  style={{width: 9.34, height: 10.24}}
                  alt="ADA Logo"
                /> */}
              </Row>
            </h3>
            <Link to="/expedition/start" onClick={recordStartExpedition}>
              <button>Start NFT Expedition</button>
            </Link>
            <div className="image-container">
              <img
                src={planetSet[0]}
                width={"100%"}
                style={{width: 300}}
                alt="Planet 2"
                className="visible-sm"
              />
            </div>
            <div className="vertical-borders" style={{marginTop: 35, textAlign: 'center'}}>
              <h6 style={{marginBottom: 8}}>25,000 Planets to be discovered!</h6>
              The first 2,500 expeditions launched will receive a limited-edition Founder's NFT delivered later this fall. 
            </div>
              <Row>
                <CardanoLogo style={{width: 300, height: 300, marginTop: -130, marginBottom: -100}}/>
                <span style={{marginLeft: -55, color: 'blue'}}>
                  &trade;
                </span>
              </Row>
          </Col>
          <Col md={3} xs={12} className="image-container">
            <img src={planetSet[1]} width={"100%"} style={{width: 300}} alt="Planet 2" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  const { spacepermit } = state
  return {
    spacePermitID: spacepermit.permitCode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPolicyIds: () => dispatch(getPolicyIds())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSection)