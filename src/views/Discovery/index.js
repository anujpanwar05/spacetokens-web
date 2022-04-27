import React, { useEffect, useState } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Header } from "../../components";
import { Container, Row, Col } from "reactstrap";
import BGImage from "../../assets/img/large-background.png";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import DiscoveryCard from "../../components/DiscoveryCard";
import LogoAnimation from "../../assets/animations/spt_logo.json"
import callApi from "../../services/ApiService";

function Discovery() {
  const { id } = useParams()
  const [discovery, setDiscovery] = useState(null);
  const [titleMessage, setTitleMessage] = useState('Loading Discovery...');
  useEffect(() => {
    if(discovery == null) {
      callApi('/discovery/' + id, null, 'GET')
      .then(res => setDiscovery(res))
      .catch(e => {
        setTitleMessage('No discovery found with that ID!')
      })
    }
  })

  if(discovery == null) {
    return (
      <div>
      <Header />
      <div
        className="discovery"
        style={{ backgroundImage: `url(${BGImage}` }}
      >
        <h2 className="title">{titleMessage}</h2>
        {titleMessage === 'No discovery found with that ID!' && 
          <Lottie
            animationData={LogoAnimation} 
            className="logo-img"
          />
        }
      </div>
    </div>
    )
  }

  return (
    <div>
      <Header />
      <div
        className="discovery"
        style={{ backgroundImage: `url(${BGImage}` }}
      >
        <Container>
          <h2 className="title">Planet Discovery</h2>
          <Row>
            <Col md={6}>
              <DiscoveryCard
                discovery={discovery?.discoveries[0]}
                style={{ marginBottom: 25 }}
                discoveredAt={discovery.last_checkin_at}
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
  );
}

export default connect()(Discovery)