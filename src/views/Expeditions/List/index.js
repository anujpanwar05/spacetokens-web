import React from "react"
import { connect } from "react-redux"
import "./style.css"
import { Header } from "../../../components"
import { Container, Row, Col } from "reactstrap"
import BGImage from "../../../assets/img/large-background.png"
import SearchIcon from "../../../assets/icons/search-feather.png"
import { Link } from "react-router-dom"
import { getSpacePermit } from "../../../redux/spacepermit/actions"
import { ListGroup } from 'reactstrap'
import ExpeditionCompleteListItem from "./expeditionCompleteListItem"
import ExpeditionActiveListItem from "./expeditionActiveListItem"
import PaginationList from 'react-pagination-list';

class Expeditions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      expeditionList: props.expeditions
    }
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() { 
    window.removeEventListener('load', this.handleLoad)  
  }

  handleLoad() {
    if (this.props.spacePermitID != null) {
      this.props.getSpacePermit()
    }
  }

  handleQueryChange(e) {
    let text = e.target.value.toLowerCase()
    this.setState({ filterText: text })
  }

  handleQueryChange(e) {
    let text = e.target.value.toLowerCase()
    if(text.length > 0) {
      this.setState({
        filterText: text,
        expeditionList: this.props.expeditions?.filter(d => d.expedition?.expedition_status.toLowerCase().includes(text))
      })
    } else {
      this.setState({
        filterText: text,
        expeditionList: this.props.expeditions
      })
    }
  }

  expeditionsExist() {
    return this.props.expeditions?.length > 0
  }

  render() {
    const isMobile = window.innerWidth < 500
    return (
      <div>
      <Header component={"expeditions"} />
      <div
        className="expeditions"
        style={{ backgroundImage: `url(${BGImage})` }}
      >
        <Container>
          <h4>My Expeditions</h4>
          <Row>
            <Col md={4}>
              <div className="search-bar">
                <img src={SearchIcon} alt="Search" />
                <input
                  placeholder="Search Expedition Status"
                  value={this.state.filterText}
                  onChange={(text) => this.handleQueryChange(text)}
                />
              </div>
            </Col>
            <Col md={4}/> 
            {isMobile && 
              <Col md={4} style={{ textAlign: 'right' }}>
                {this.expeditionsExist() &&
                  <Link to="/expedition/start">
                    <button className={(isMobile ? "btn-launch" : "btn-secondary")}>{isMobile ? 'Start Expedition' : 'Start NFT Expedition'}</button>
                  </Link>
                }
              </Col>
            }
          </Row>
          {this.expeditionsExist() &&
              <ListGroup>
                {this.props.expeditions.length && !this.state.expeditionList.length &&
                  <div style={{textAlign: 'center'}}>
                    <div>No Expedition Results.</div>
                  </div>
                }
                <PaginationList 
                  data={(this.state.filterText !== '' ? this.state.expeditionList : this.props.expeditions)}
                  pageSize={5}
                  renderItem={(item, key) => {
                    const status = item.expedition?.expedition_status
                    if(status === 'COMPLETED') {
                      return (<ExpeditionCompleteListItem
                          key={`expCompletedListItem-${key}`}
                          expedition={item}
                          style={{ margin: 25 }}
                        />)
                    } else {
                      return (<ExpeditionActiveListItem
                          key={`expActiveListItem-${key}`}
                          expedition={item}
                          style={{ margin: 25 }}
                        />)
                    }
                  }}
                />
              </ListGroup>
          }
          {!this.expeditionsExist() &&
            <div style={{textAlign: 'center'}}>
              <div>Start your first space NFT journey by sending an expedition.</div>
              <br/>
              <Link to="/expedition/start" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary">Start NFT Expedition</button>
              </Link>
            </div>
          } 
        </Container>
      </div>
    </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { spacepermit } = state
  let expds = spacepermit.expeditions?.filter(e => e.expedition != null)
  expds = expds.sort((a, b) => new Date(b.expedition.started_at) - new Date(a.expedition.started_at))
  return {
    expeditions: expds,
    spacePermitID: spacepermit.spacePermitID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSpacePermit: () => dispatch(getSpacePermit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expeditions)

