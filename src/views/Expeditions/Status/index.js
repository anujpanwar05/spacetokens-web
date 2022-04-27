import "./style.css"
import React, { useEffect, useState } from 'react'
import { useDispatch, connect } from "react-redux"
import { Header } from "../../../components"
import { Container, Row, Col } from "reactstrap"
import BGImage from "../../../assets/img/large-background.png"
import { getSpacePermit } from "../../../redux/spacepermit/actions"
import { useInterval } from "../../../hooks/useInterval"
import { useLocation, Redirect } from "react-router-dom"
import Lottie from "lottie-react"
import { MINUTE_BUFFER, timeLeft } from '../../../util'
import { Link } from "react-router-dom"

import status1 from "../../../assets/animations/ready.json"
import status2 from "../../../assets/animations/fueling_up.json"
import status3 from "../../../assets/animations/launching.json"
import status4 from "../../../assets/animations/exploring.json"
import status5 from "../../../assets/animations/returning_home.json"
import ExpeditionStatusBar from "../../../components/ExpeditionStatusBar"

const STATUSES = ['WAITING', 'STARTED', 'FUELING', 'LAUNCH', 'EXPLORING', 'RETURNING', 'COMPLETED']

function Status({ expeditions }) {
  const delayInSeconds = 10
  const dispatch = useDispatch()
  const { search } = useLocation()
  const expeditionAddress = new URLSearchParams(search).get('addr')

  useEffect(() => {
    dispatch(getSpacePermit())
  }, [])

  useInterval(() => {
    dispatch(getSpacePermit())
  }, delayInSeconds * 1000)

  const getStatusAnimation = (currentStep) => {
    if (currentStep === 0) { return status1 }
    if (currentStep === 1) { return status1 }
    if (currentStep === 2) { return status2 }
    if (currentStep === 3) { return status3 }
    if (currentStep === 4) { return status4 }
    if (currentStep === 5) { return status5 }
  }

  // default logic
  let status = 'WAITING'
  let currentStep = 0
  let timeLeftText = ''
  
  const expedition = expeditions.find(exp => exp.space_tokens_address === expeditionAddress)
  status = expedition?.expedition?.expedition_status
  currentStep = STATUSES.indexOf(status)
  if(currentStep === -1) { currentStep = 0 }

  // redirect to completed view if expedition status is COMPLETED
  if(currentStep === 6) {
    return (<Redirect to={{pathname: '/expedition/complete', search: `?addr=${expeditionAddress}`}}/>)
  }

  let expedition_duration_minutes = expedition?.expedition?.expedition_duration_minutes + MINUTE_BUFFER
  const started_at = expedition?.expedition?.started_at
  const minDiff = timeLeft(started_at, expedition_duration_minutes)
  if(minDiff === 1) {
    timeLeftText = '1 min'
  } else if(minDiff <= 1) {
    timeLeftText = '< 1 min'
  } else {
    timeLeftText = minDiff.toString() + ' mins'
  }

  return (
    <div style={{backgroundColor: 'black'}}>
      <Header />
      <div
        className="progress"
        style={{ backgroundImage: `url(${BGImage}` }}
      >
        <Container fluid>
          <div className="progress-header">
            <h3>Exploring the Galaxy!</h3>
            <h4 style={{ marginBottom: 20 }}>
              Your expedition is underway. Searching for valuable NFTs... 
            </h4>
            <div style={{marginBottom: 20}}>Time Left : <b>Approx. {timeLeftText}</b></div>
            <Row style={{margin: 30}}>
              <Link to="/expedition/start" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary">Start Another Expedition</button>
              </Link>
              <Link to="/expeditions" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary">View My Expeditions</button>
              </Link>
            </Row>
            <ExpeditionStatusBar currentStep={currentStep}/>
            <Lottie animationData={getStatusAnimation(currentStep)}/>
          </div>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { spacepermit, application } = state
  return {
    spacePermitID: spacepermit.spacePermitID,
    expeditions: spacepermit.expeditions,
    loading: spacepermit.loading,
    adaAmount: application.adaLaunchAmount
  }
}

export default connect(mapStateToProps, null)(Status)
