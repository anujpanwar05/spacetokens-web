import React, { Component } from "react";
import "./style.css";
import { Header } from "../../../components";
import { Container, Row, Col } from "reactstrap";
import BGImage from "../../../assets/img/large-background.png";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { planetClasses, planetClassRanges } from './planetClasses'
import PlanetClass from './PlanetClass'
import { getAvailableQuantities, setAdaLaunchAmount } from '../../../redux/application/actions'
import sampleDiamond from "../../../assets/img/sample-planets/diamond.png";
import sampleSavannah from "../../../assets/img/sample-planets/savannah.png";
import sampleStratus from "../../../assets/img/sample-planets/stratus.png";
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClassIndex: -1,
      defaultAdaValues: [20, 75, 150, 250]
    }
  }

  componentDidMount() {
    this.props.getAvailableQuantities()
    const lastAvailableClassIndex = this.lastAvailablePlanetClass()
    if(lastAvailableClassIndex !== -1) {
      this.props.setAdaLaunchAmount(this.state.defaultAdaValues[lastAvailableClassIndex])
    }
  }

  onClickPlanetClass = (e, idx) => {
    // if sold out make this planetclass not selectable
    if(this.checkIfSoldOut(idx)) {
      return
    }
    this.setState({ selectedClassIndex: idx })
    const adaValue = this.state.defaultAdaValues[idx]
    this.props.setAdaLaunchAmount(adaValue)

    const action = 'Click Planet Class'
    const category = 'Expedition-Start'
    ReactPixel.trackCustom(action, { category: category, label: ('class: ' + (idx + 1).toString()) })
    ReactGA.event({ category: category, action: action, label: ('class: ' + (idx + 1).toString()) })
  }

  checkIfSoldOut = (idx) => {
    if(idx === -1) {
      return true
    }
    const classes = this.props.availableQuantities?.planet_classes_available
    const planetClass = classes?.find( c => c.planet_class === idx + 1)
    return planetClass?.available_count == 0
  }

  lastAvailablePlanetClass = () => {
    const classes = this.props.availableQuantities?.planet_classes_available
    if(classes == null) { return null }

    let availableClassIndex = -1
    for (var i = classes.length - 1; i >= 0; i--) {
      if(classes[i].available_count > 0) {
        availableClassIndex = i
        break
      }
    }
    return availableClassIndex // can be null, -1 or n
  }

  recordStartExpedition = () => {
    const action = 'Click Launch Button'
    const category = 'Expedition-Start'
    ReactPixel.trackCustom(action, { category: category })
    ReactGA.event({ category: category, action: action })

    // Sanity check that we aren't defaulting to a sold out price
    let soldOut = this.checkIfSoldOut(this.state.selectedClassIndex)
    if(soldOut) {
      const availableClassIndex = this.lastAvailablePlanetClass()
      if(availableClassIndex !== -1){
        this.props.setAdaLaunchAmount(this.state.defaultAdaValues[availableClassIndex])
      }
    }
  }

  render() {
    const availablePlanetClass = this.lastAvailablePlanetClass()
    return (
      <div>
        <Header />
        <div className="fund" style={{ backgroundImage: `url(${BGImage}` }}>
          <Container>
            <div className="fund-header">
              <h3>Start Your Expedition</h3>
              <h5 style={{ marginBottom: 30 }}>
                Select a planet class you would like to discover,<br/> and then launch!
              </h5>
              <Row>
                {planetClasses.map((item, idx) => (
                  <Col key={idx} onClick={(e) => this.onClickPlanetClass(e, idx)}>
                    <PlanetClass planetClass={item} selected={idx === this.state.selectedClassIndex} soldout={this.checkIfSoldOut(idx)}/>
                  </Col>
                ))}
              </Row>
              {/* <img src={FundBanner} alt="Fund banner" className="banner" /> */}
              <div className="amount-container">
              <h6  style={{marginBottom: 40, lineHeight: 1.45}}>
                The first 2500 expeditions will receive a limited edition Founder's NFT delivered later this fall.<br/>
                {/* More info on distribution will be given after Alonzo smart contracts hit mainnet later this fall. */}
              </h6>

              {availablePlanetClass !== -1 &&
                <>
                  <Link
                    to={'/expedition/launch'}
                    style={{ textDecoration: 'none' }}
                    onClick={this.recordStartExpedition}
                  >
                    <button className="btn-launch"><b>Launch{window.innerWidth > 600 ? ' Expedition' : ''}!</b></button>
                  </Link>
                </>
              }
              {availablePlanetClass === -1 &&
                <h5 style={{ marginBottom: 20 }}>
                  <b>We are all sold out!</b> <br/><br/>
                  There are new galaxies and discoveries on the way <br/>so stay tuned to our socials for more information!
                </h5>
              }
              <Row style={{marginTop: 40, marginBottom: 40}}>
                <Col md="4">
                  <img className="planet-img" src={sampleSavannah} width={"100%"} alt="savannah" />
                </Col>
                <Col md="4">
                  <img className="planet-img" src={sampleDiamond} width={"100%"} alt="diamond" />
                </Col>
                <Col md="4">
                  <img className="planet-img" src={sampleStratus} width={"100%"} alt="stratus" />
                </Col>
              </Row>
              </div>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { application } = state
  return {
    availableQuantities: application.availableQuantities,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setAdaLaunchAmount: (ada) => dispatch(setAdaLaunchAmount(ada)),
    getAvailableQuantities: () => dispatch(getAvailableQuantities())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start)
