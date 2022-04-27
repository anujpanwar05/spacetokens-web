import React from "react"
import { Link } from "react-router-dom"
import { ListGroupItem } from 'reactstrap'
import "./style.css"
import { Container, Row, Col } from "reactstrap"
import { cardanoScanUrl, MINUTE_BUFFER } from "../../../util"
import ProgressBar from "../../../components/ProgressBar"
import status1 from "../../../assets/img/statuses/1.svg"
import status2 from "../../../assets/img/statuses/2.svg"
import status3 from "../../../assets/img/statuses/3.svg"
import status4 from "../../../assets/img/statuses/4.svg"
import status5 from "../../../assets/img/statuses/5.svg"
import { timeLeft } from '../../../util'

function ExpeditionActiveListItem({ expedition, style }) {

  const statusImages = {
    'STARTED': status1, 
    'FUELING': status2,
    'LAUNCH': status3, 
    'EXPLORING': status4, 
    'RETURNING': status5,
    'COMPLETED': status5
  }

  const formatDate = (date) => {
    let d = new Date(date)
    return d.toDateString()
  }
  
  const status = expedition.expedition?.expedition_status
  const address = expedition.space_tokens_address
  const search = `?addr=${address}`
  let pathname = '/expedition/status'
  
  const { 
    started_at,
    transaction_hash
  } = expedition.expedition
  
  let expedition_duration_minutes = expedition.expedition.expedition_duration_minutes + MINUTE_BUFFER

  const minutesLeft = timeLeft(started_at, expedition_duration_minutes)
  const progress = (expedition_duration_minutes - minutesLeft) / expedition_duration_minutes * 100

  let expedition_no = expedition.expedition.expedition_no
  if(expedition_no < 10) {
    expedition_no = '00' + expedition_no
  } else if (expedition_no < 100) {
    expedition_no = '0' + expedition_no
  }

  let timeLeftText = ''
  if(minutesLeft === 1) {
    timeLeftText = '1 min'
  } else if(minutesLeft <= 1) {
    timeLeftText = '< 1 min'
  } else {
    timeLeftText = minutesLeft.toString() + ' mins'
  }

  return (
    <Link 
      to={{pathname: pathname, search: search}}
      style={{ textDecoration: 'none' }}
    >
      <ListGroupItem>
        <Container style={{padding: 10}}>
          <Row className="header-row" style={{marginBottom: 30}}>
            <Col md="3">
              <div className="start-border">Started :  
                <span> {formatDate(started_at)}</span>
              </div>
            </Col>
            <Col md="3"></Col>
            <Col md="6">
              <div className="title">Expedition #{expedition_no}</div>
            </Col>
            <div className="dot">
              <div className="animate-step" />
            </div>
          </Row>
          <Row>
            <Col md="3">
              <img src={statusImages[status]} className="planet-img" alt="Planet" />
            </Col>
            <Col md="3" className="verticalAlign" style={{marginBottom: 20}}>
              <div>Status : <b>{status}</b></div>
            </Col>
            <Col md="6" className="stats-col">
              <div style={{marginBottom: 10}}>Time Left : <b>Approx. {timeLeftText}</b></div>
              <ProgressBar value={progress} showLabels={true} />
              <div className="address-text"><b>Address</b> : 
                <a className="address-link" style={{color: '#dddddd'}} href={cardanoScanUrl(transaction_hash)} target="_blank" rel="noopener noreferrer"> {transaction_hash ? transaction_hash.slice(0, 30) : ''}...</a>
              </div>
            </Col>
          </Row>
        </Container>
      </ListGroupItem>
    </Link>
  )
}

export default ExpeditionActiveListItem
