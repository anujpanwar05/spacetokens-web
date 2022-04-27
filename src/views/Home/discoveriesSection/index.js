import "./style.css";
import React, { useEffect } from 'react';
import { Container, Col, Row } from "reactstrap";
import planetBG from "../../../assets/img/planet_bg_dark.png";
import PlanetCard from "../../../components/PlanetCard";
import { fetchDiscoveries } from "../../../redux/discoveries/actions";
import { connect } from "react-redux";


function LatestDiscoveries(props) {
  
  const { reduxFetchDiscoveries, discoveries } = props

  useEffect(() => {
    reduxFetchDiscoveries()
  }, [reduxFetchDiscoveries])

  return (
    <div
      id="animate-area" 
      style={{ backgroundImage: `url(${planetBG})` }}
      className="latest-discoveries"
    >
      <Container>
        <h2>Latest Discoveries</h2>
        <Row className="card-container">
          {discoveries.slice(0,3).map((item, idx) => (
            <Col key={idx} className="card-container">
              <PlanetCard
                planet={item}
                style={{ marginBottom: 25 }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { discoveries } = state;
  return {
    discoveries: discoveries.discoveries,
    loading: discoveries.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxFetchDiscoveries: () => dispatch(fetchDiscoveries()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestDiscoveries);
