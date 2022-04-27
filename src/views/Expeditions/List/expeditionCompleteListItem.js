import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ListGroupItem } from 'reactstrap';
import { Container, Row, Col } from "reactstrap"
import checkmark from "../../../assets/img/checkmark.png"
import { cardanoScanUrl } from "../../../util";

function ExpeditionCompleteListItem({ expedition, style }) {

  const formatDate = (date) => {
    let d = new Date(date)
    return d.toDateString()
  }

  const address = expedition.space_tokens_address
  const search = `?addr=${address}`
  let pathname = '/expedition/complete'
  
  const { started_at,
    transaction_hash
  } = expedition.expedition

  let expedition_duration_minutes = expedition.expedition.expedition_duration_minutes

  let expedition_no = expedition.expedition.expedition_no
  if(expedition_no < 10) {
    expedition_no = '00' + expedition_no
  } else if (expedition_no < 100) {
    expedition_no = '0' + expedition_no
  }

  const { image_url, discovery_attributes, transaction_viewer_url, minted_transaction_hash } = expedition.expedition.discoveries[0]
  
  return (
    <Link 
      to={{pathname: pathname, search: search}}
      style={{ textDecoration: 'none' }}
    >
      <ListGroupItem>
          <Container style={{padding: 10}}>
            <Row>
              <Col md="9">
                <Row className="header-row">
                  <Col md="4">
                    <div className="start-border">Started :  
                      <span> {formatDate(started_at)}</span>
                    </div>
                  </Col>
                  <Col md="4"></Col>
                  <Col md="4">
                    <div className="title">Expedition #{expedition_no}</div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <img src={image_url} className="planet-img" alt="Planet" />
                  </Col>
                  <Col md="4" className="stats-col">
                    <div>Class {discovery_attributes.planet_class} Planet Discovered!</div>
                    <div className="stats-text"><b>Planet Name</b> : <span style={{color: '#fff7d0'}}>{discovery_attributes.name}</span></div>
                    <div className="stats-text"><b>Planet Type</b> : <span style={{color: '#fff7d0'}}>{discovery_attributes.planet_type}</span></div>
                  </Col>
                  <Col md="4" className="stats-col">
                    <div className="complete-text">Status : <b> COMPLETED</b></div>
                    <div className="divider"/>
                    <div className="expedition-label">Expedition Time : <b>{expedition_duration_minutes} minutes</b></div>
                    <div className="divider"></div>
                    <div className="address-text"><b>Transaction</b> : 
                      <div className="address-link" style={{color: '#dddddd'}} 
                        href={transaction_viewer_url} target="_blank" rel="noopener noreferrer"> {minted_transaction_hash ? minted_transaction_hash.slice(0, 30) : ''}...</div>
                    </div>
                    <div className="divider"></div>
                  </Col>
                </Row>
              </Col>
              <Col className="verticalAlign" md="3">
                <img src={checkmark} alt="checkmark" style={{maxWidth: 90}}/>
              </Col>
            </Row>
          </Container>
      </ListGroupItem>
    </Link>
  );
}

export default ExpeditionCompleteListItem;
