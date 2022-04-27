import "./style.css"
import React, { useEffect, useState } from 'react'
import { useDispatch, connect } from "react-redux"
import { Header } from "../../../components"
import { Container, Col, Spinner } from "reactstrap"
import BGImage from "../../../assets/img/large-background.png"
import { fetchNewSpacePermitDetails, getSpacePermit, setPaymentDetailsAddressAsSeen } from "../../../redux/spacepermit/actions"
import { useInterval } from "../../../hooks/useInterval"
import QRCode from '../qrCode'
import { Redirect } from "react-router-dom"
import Lottie from "lottie-react"
import { getDepositAddress } from "../../../redux/spacepermit/selectors"
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'

import WaitingAnimation from "../../../assets/animations/waiting.json"
import ExpeditionStatusBar from "../../../components/ExpeditionStatusBar"

function Payment({ adaAmount, expeditions, fetchingAddress }) {
  const delayInSeconds = 10
  const dispatch = useDispatch()
  const unusedDepositAddress = getDepositAddress()

  const [depositAddress, setDepositAddress] = useState(null)
  if(depositAddress == null && unusedDepositAddress != null) {
    setDepositAddress(unusedDepositAddress)
    dispatch(setPaymentDetailsAddressAsSeen(unusedDepositAddress))
  }

  if(depositAddress == null && unusedDepositAddress == null) {
    if(!fetchingAddress) {
      // We don't have an available address so go get one
      dispatch(fetchNewSpacePermitDetails())
    }
  }

  const [btnClicked, setBtnClicked] = useState(false)
  const copyClick = () => {
    const action = 'Click Copy Address'
    const category = 'Expedition-Launch'
    ReactGA.event({ category: category, action: action })
    ReactPixel.trackCustom(action, { category: category })
    setBtnClicked(true)
    setTimeout(() => {
      setBtnClicked(false)
    }, 10000)
  }
  
  useEffect(() => {
    dispatch(getSpacePermit())
  }, [])

  useInterval(() => {
    dispatch(getSpacePermit())
  }, delayInSeconds * 1000)

  // If an expedition exists we can jump over to the status screen
  const expedition = expeditions.find(exp => exp.space_tokens_address === depositAddress)
  if(expedition?.expedition) {
    const action = 'Payment Received - Redirecting'
    const category = 'Expedition-Launch'
    ReactGA.event({ category: category, action: action })
    ReactPixel.trackCustom(action, { category: category })
    return (<Redirect to={{pathname: '/expedition/status', search: `?addr=${depositAddress}`}}/>)
  }

  return (
    <div>
      <Header />
      <div
        className="launch"
        style={{ backgroundImage: `url(${BGImage}` }}
      >
        <Container fluid>
          <div className="launch-header">
              <>
                <h3>Launch Your Expedition!</h3>
                {!depositAddress &&
                  <div className="loading" style={{minHeight: 300}}>
                    <h5>One moment please, <br/> We're generating your payment address...</h5>
                    <Spinner style={{margin: 30, width: 99}}/>
                  </div>
                }
                {depositAddress &&
                  <>
                    <h5 style={{marginTop: 20}}>To receive your NFT, <br/>Send {adaAmount} ADA to the following address:</h5>
                    <QRCode address={depositAddress}/>
                    <Col md="6" sm="6" xs="8">
                      <div onClick={() => {
                        navigator.clipboard.writeText(depositAddress)
                        copyClick()
                      }}
                        style={{
                          backgroundColor: 'rgba(41, 52, 100, 0.45)', 
                          padding: 12, 
                          borderRadius: 12,
                          border: '1px solid',
                          marginBottom: 4
                        }}
                      >
                        <a href="#!" style={{textDecoration:'none'}}>
                          <h5 className="amount-value">{depositAddress}</h5>
                        </a>
                      </div>
                      {!btnClicked &&
                        <h5>click to copy</h5>
                      }
                      {btnClicked &&
                        <h5>copied to clipboard! &#10004;</h5>
                      }
                    </Col>
                    <Col style={{marginTop: 20}}>
                      <h5>Some things to remember:</h5>
                      <h6>
                        <div className="reminders">&#8226; Don't send ADA from an Exchange!<br/></div>
                        <div className="reminders">&#8226; Only send one transaction to this address.<br/></div>
                        <div className="reminders">&#8226; Shortly after the network confirms your transaction the expedition will update here.<br/></div>
                      </h6>
                    </Col>
                    <Col md="3" sm="3" xs="2"></Col>
                  </>
                }
              </>

            <ExpeditionStatusBar currentStep={0}/>
            <Lottie animationData={WaitingAnimation} style={{marginTop: 40}}/>
          </div>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { spacepermit, application } = state
  const ada = application.adaLaunchAmount
  return {
    fetchingAddress: spacepermit.fetchingNewSpacePermitDetails,
    expeditions: spacepermit.expeditions,
    loading: spacepermit.loading,
    adaAmount: ada === 65 ? 75 : ada // caching hack fix for wrong inital cache value
  }
}

export default connect(mapStateToProps, null)(Payment)
