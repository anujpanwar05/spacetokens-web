import React, { useEffect } from "react"
import "./style.css"
import { useDispatch, connect } from "react-redux"
import { Header } from "../../../components"
import { Container, Row, Col } from "reactstrap"
import BGImage from "../../../assets/img/large-background.png"
import { useLocation } from "react-router-dom"
import Lottie from "lottie-react"
import DiscoveryCard from "../../../components/DiscoveryCard"
import LogoAnimation from "../../../assets/animations/spt_logo.json"
import { getSpacePermit } from "../../../redux/spacepermit/actions"

function Complete({ expeditions }) {
  const { search } = useLocation()
  const dispatch = useDispatch()
  const depositAddress = new URLSearchParams(search).get('addr')
  const expedition = expeditions?.find(e => e.space_tokens_address === depositAddress)
  const discovery = expedition?.expedition?.discoveries[0]

  useEffect(() => {
    dispatch(getSpacePermit())
  }, [])

  if(discovery == null) {
    return (
      <div>
      <Header />
      <div
        className="fund complete"
        style={{ backgroundImage: `url(${BGImage}` }}
      >
        <Container>
          <Row>
            <Col className="logo text-center">
              <h2 className="title">This Expedition is not yet Complete !</h2>
            </Col>
          </Row>
          <Row>
            <Col className="logo">
              {/* <img
                src={LogoCharacter}
                className="logo-character"
                alt={"Space Token"}
              /> */}
              <Lottie animationData={LogoAnimation} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    )
  }

  return (
    <div>
      <Header />
      <div
        className="fund complete"
        style={{ backgroundImage: `url(${BGImage}` }}
      >
        <Container>
          <Row>
            <Col md={5}>
              <h2 className="title">Expedition Complete!</h2>
              <p className="tagline">
                Your brand new NFT has been sent to your Cardano wallet.
              </p>
              <h3>Discoveries Made</h3>
            </Col>
            <Col sm={7} />
          </Row>
          <Row>
            <Col md={6}>
              <DiscoveryCard
                discovery={discovery}
                style={{ marginBottom: 25 }}
                discoveredAt={expedition?.expedition?.last_checkin_at}
              />
            </Col>
            <Col md={6} sm={2} className="logo">
              {/* <img
                src={LogoCharacter}
                className="logo-character"
                alt={"Space Token"}
              /> */}
              <h3 style={{color: 'white', fontWeight: 'bold', marginTop: 0}}>Discovery made in <br/> Galaxy #1</h3>
              <Lottie 
                animationData={LogoAnimation} 
                className="logo-img"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { spacepermit } = state
  return {
    expeditions: spacepermit.expeditions
  }
}

export default connect(mapStateToProps, null)(Complete)