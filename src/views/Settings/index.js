import "./style.css"
import React, { Component } from "react"
import { getSpacePermit, overwriteSpacePermitID, resetSpacePermitError } from "../../redux/spacepermit/actions"
import { connect } from "react-redux"
import { Container, Row, Col } from 'react-bootstrap'
import { Spinner } from "reactstrap";
import { Header } from "../../components"
import planetBG from "../../assets/img/bg-clear-large.png"

class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newSpacePermitID: "",
      submitError: "",
      btnClicked: false
    }
  }

  componentDidMount() {
    this.props.resetSpacePermitError()
    this.props.getSpacePermit()
  }

  copyClick = () => {
    this.setState({ btnClicked: true})
    setTimeout(() => {
      this.setState({ btnClicked: false})
    }, 10000)
  }

  handleInputChange = e => {
    let val = e.target.value
    val = val.split("-").join("")
    if (val.length > 0) {
      val = val.match(new RegExp('.{1,3}', 'g')).join("-");
    }
    if(val.length > 12) {
      return
    }
    this.setState({
      newSpacePermitID: val
    })
  }

  confirmSpacePermitOverwrite = () => {
    this.props.overwriteSpacePermitID(this.state.newSpacePermitID)
    this.setState({
      newSpacePermitID: ''
    })
  }

  render() {
    const { spacePermitID } = this.props

    return (
      <div>
        <Header component={"settings"} />
        <div
          className="settings"
          style={{ backgroundImage: `url(${planetBG})` }}
        >
          <Container>

            <Row style={{textAlign: 'center'}}>
              <Col md="11">
              <div className="settings-title">Settings</div>
              </Col>
              <Col md="11">
                <h3 className="settings-description">Here you can configure your Space Tokens DApp settings and download and/or load a backup of your Space Permit ID.</h3>
              </Col>
            </Row>

            <Row style={{textAlign: 'left'}}>
              <Col md="11" >
                <div className="settings-sub-header">Save Space Permit ID (Cloud Backup)</div>
                <h5>
                  <ul>
                    <li style={{marginBottom: 5}}>Below is your "Space Permit ID" which tracks your launched expeditions.</li>
                    <li style={{marginBottom: 5}}>You can use this code on different devices to load and view your existing expeditions and discoveries.</li>
                  </ul>
                </h5>
              </Col>
            </Row>

            <Row style={{display: 'flex', justifyContent: 'center'}}>
              <Col md="8">
                <div className="permit-code-block space-permit-bg" onClick={() => {
                  navigator.clipboard.writeText(spacePermitID)
                  this.copyClick()
                }}>
                  <div className="settings-body">This is your <b>Space Permit ID</b>:</div>
                  <button className="btn-space-permit" style={{ width: 200 }}>
                    {!spacePermitID &&
                      <Spinner color="dark" />
                    }
                    {spacePermitID &&
                      <h5 id="permitID" className="permit-text">
                        {spacePermitID}
                      </h5>
                    }
                  </button>
                  <div style={{margin: 4}}>
                    {!this.state.btnClicked &&
                      <p>Click to Copy</p>
                    }
                    {this.state.btnClicked &&
                      <p>Copied to clipboard! &#10004;</p>
                    }
                  </div>
                  <div className="settings-body"><b>Save this ID</b> to your computer so you can load your expeditions on other devices.</div>
                </div>
              </Col>
            </Row>

            <Row style={{textAlign: 'left', marginTop: 50, alignSelf: 'center' }}>
              <Col md="11">
                <div className="settings-sub-header">Load Existing Space Permit ID</div>
                <h5>
                  <ul>
                    <li style={{marginBottom: 5}}>You can load a pre-existing Space Permit ID here in order to view your already completed expeditions.</li>
                    <li style={{marginBottom: 5}}>Loading a different Space Permit ID will overwrite the existing one in your browser</li>
                    <li style={{marginBottom: 5}}>If you have any expeditions associated with the currently loaded Space Permit, 
                        make sure to save a backup of your ID so you can keep track of them.</li>
                  </ul>
                </h5>
              </Col>
            </Row>

            <Row style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <Col md="8">
                <div className="space-permit-bg">
                  <div>
                  <h5>

                  <b className="warning-text"> WARNING</b> this will overwrite the existing Space Permit ID saved in your browser so make sure you want to do this. 
                  
                  </h5>
                  <div style={{margin: 10}}>
                    <b>Enter your Space Permit ID here:</b>
                  </div>
                  </div>
                  <input
                    id="spacePermit"
                    title="spacePermit"
                    name="spacePermit"
                    data-validation="alphanumeric"
                    type="text"
                    required
                    className="space-permit-input"
                    placeholder="X1X-A2A-Y3Y"
                    value={this.state.newSpacePermitID}
                    onChange={this.handleInputChange}
                  />
                  <div>
                    <button onClick={this.confirmSpacePermitOverwrite}>Overwrite Space Permit ID</button>
                  </div>
                  {this.props.permitCodeError.length > 0 &&
                    <div style={{margin: 5}}>
                      {this.props.permitCodeError}
                    </div>
                  }
                </div>
              </Col>
            </Row>
            <Row style={{marginBottom: 100}}></Row>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { spacepermit } = state
  return {
    spacePermitID: spacepermit.permitCode,
    loading: spacepermit.loading,
    permitCodeError: spacepermit.permitCodeError
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    overwriteSpacePermitID: (id) => dispatch(overwriteSpacePermitID(id)),
    getSpacePermit: () => dispatch(getSpacePermit()),
    resetSpacePermitError: () => dispatch(resetSpacePermitError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)