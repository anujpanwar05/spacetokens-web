import "./style.css";
import React from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { Header, PlanetCard } from "../../components";
import { fetchDiscoveries } from "../../redux/discoveries/actions";
import BGImage from "../../assets/img/large-background.png";
import SearchIcon from "../../assets/icons/search-feather.png";
import { Link } from "react-router-dom"

class Discoveries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      discoveryList: props.discoveries
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
  this.props.reduxFetchDiscoveries()
 }

  handleQueryChange(e) {
    let text = e.target.value.toLowerCase()
    if(text.length > 0) {
      this.setState({
        filterText: text,
        discoveryList: this.props.discoveries?.filter(d => d.type.toLowerCase().includes(text))
      })
    } else {
      this.setState({
        filterText: text,
        discoveryList: this.props.discoveries
      })
    }
  }

  render() {
    const isMobile = window.innerWidth < 500
    return (
      <div>
        <Header component={'discoveries'}/>
        <div
          className="discoveries"
          style={{ backgroundImage: `url(${BGImage})` }}
        >
          <Container>
            <h4>See What Has Already Been Discovered</h4>
            
            <Row className="search-bar-container">
              <Col md={4}>
                <div className="search-bar">
                  <img src={SearchIcon} alt="Search" />
                  <input
                    placeholder="Search by Planet Type"
                    value={this.state.filterText}
                    onChange={(text) => {this.handleQueryChange(text)}}
                  />
                </div>
              </Col>
              <Col md={4}></Col>
              {isMobile && 
                <Col md={4} style={{textAlign: 'right'}}>
                  <Link to="/expedition/start">
                    <button className={(isMobile ? "btn-launch" : "btn-secondary")}>{isMobile ? 'Start Expedition' : 'Start NFT Expedition'}</button>
                  </Link>
                </Col>
              }
            </Row>

            {this.props.discoveries.length && !this.state.discoveryList.length &&
              <div style={{textAlign: 'center'}}>
                <div>No Discovery Results.</div>
              </div>
            }

            <Row>
              {(this.state.filterText !== '' ? this.state.discoveryList : this.props.discoveries).slice(0,72).map((item, idx) => (
                <Col md={4} key={idx}>
                  <PlanetCard
                    planet={item}
                    style={{ marginBottom: 25 }}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { discoveries } = state;
  return {
    discoveries: discoveries.discoveries,
    planetTypes: [...new Set(discoveries.discoveries.map((d) => d.type))],
    loading: discoveries.loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxFetchDiscoveries: () => dispatch(fetchDiscoveries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discoveries);
