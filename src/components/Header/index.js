import "./style.css";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import LogoWithText from "../../assets/img/logo-with-text.png";
import settingsImg from "../../assets/img/settings.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const toggle = () => setIsOpen(!isOpen);
  const recordStartExpedition = () => {
    const action = 'Click Start Expedition'
    const category = 'Header'
    ReactGA.event({ category: category, action: action })
    ReactPixel.trackCustom(action, { category: category })
  }

  useEffect(() => {
    console.log(props.component)
    switch (props.component) {
      case "home":
        setSelected(0);
        break;
      case "discoveries":
        setSelected(1);
        break;
      case "expeditions":
        setSelected(2);
        break;
      case "guide":
        setSelected(3);
        break;
      case "blog":
        setSelected(4);
        break;
      default:
        setSelected(10);
    }
  }, [props]);
  return (
    <Navbar color="light" light expand="md">
      <Container>
        <NavbarBrand href="/">
          <img src={LogoWithText} alt={"Logo"} height={40} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="nav-right">
          <Nav className="btns-right" navbar>
              <NavItem>
                <NavLink active={selected === 0} href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={selected === 1} href="/discoveries">Discoveries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={selected === 2} href="/expeditions">My Expeditions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={selected === 4} href="/blog">Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={selected === 3} href="/guide">Guide/FAQ</NavLink>
              </NavItem>
            <Link to="/expedition/start" onClick={recordStartExpedition}>
              <NavItem className="ml-30" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary">Start NFT Expedition</button>
              </NavItem>
            </Link>
            <NavItem className="ml-30" style={{ textDecoration: 'none' }}>
              <NavLink href="/settings"><img style={{width:28}} src={settingsImg} alt="settings"/></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default connect()(Header);
