// import React, { Component, ImageBackground } from "react";
// import "./style.css";
// import Footer from "../../components/Footer";
// import planetBG from "../../assets/img/planet_bg.png";
// import darkBG from "../../assets/img/bg-dark.png";
// import { Link } from "react-router-dom";
// // import Logo from "../../components/Logo"
// import { Container, Row, Col } from 'react-bootstrap';
// import logo from "../../assets/img/logo.png";
// import planetBlue from "../../assets/img/planet-blue.png";
// import planetOrange from "../../assets/img/planet-orange.png";
// import planetPurple from "../../assets/img/planet-purple.png";
// import planetJungle from "../../assets/img/planet-jungle.png";

// export default class SplashSite extends Component {
//   render() {
//     return (
//       <Container fluid>
//         <div className="">

//           <Row className="justify-content-sm-center">
//             <nav className="navbar-light bg-light navBg">
//               <Col>
//                 <div className="logoContainer">
//                   <img src={logo} className="logoImg" />
//                   SPACE TOKENS
//                 </div>
//               </Col>
//               {/* <Col>
//                 <button className="getApiBut">Coming Soon!</button>
//               </Col> */}
//             </nav>
//           </Row>

//           <div id="animate-area-right" style={{ position: "relative", backgroundImage: `url(${planetBG})`, backgroundSize: 'cover' }} >
//             <div className="worldwideBox">
//               <Row className="text-center">
//                 <Col>

//                   <img src={planetPurple} />

//                 </Col>
//                 <Col>
//                   <div className="centerSection">
//                     <h1 className="sptkzTitle">Space Tokens</h1>
//                     <h2 className="tagline">NFT Space Collectables</h2>
//                     <h3 className="descriptionText">Discover completely unique planet NFT's using your Cardano wallet and ADA.</h3>
//                     <br />
//                     <button className="getApiBut">Coming Soon!</button>
//                   </div>
//                 </Col>
//                 <Col>
//                   <img src={planetOrange} />
//                 </Col>
//               </Row>
//             </div>
//           </div>

//           <div className="serviceBox">
//             <div className="whatIsContainer">
//               <Row>
//                 <Col lg="2"/>
//                 <Col className="text-center">
//                   <img src={logo}  />
//                 </Col>
//                 <Col>
//                   <div className="descriptionContainer">
//                     <h1 className="sptkzSubTitle">What is Space Tokens?</h1>
//                     <p className="descriptionText">
//                       Space Tokens is an NFT collectables game that lets you fund space exploration missions
//                       using ADA to discover completely new and unique NFT planets!
//                       <br /><br />
//                       Expeditions are guaranteed to discover a NFT planet and the more ADA you fund your expedition with
//                       the greater the chance of finding a rare planet!
//                       <br /><br />
//                       There are over 20 different planet types, all with different properties and imagery.
//                       <br /><br />
//                       Space Exploration built for the Carano blockchain. Coming Soon!
//                     </p>
//                   </div>
//                 </Col>
//                 <Col lg="2"/>
//               </Row>
//             </div>
//           </div>

//           <div id="animate-area" className="discoveriesContainer" style={{ backgroundImage: `url(${darkBG})`, backgroundSize: 'cover' }}>
//             <h1 className="discoveriesSubTitle">Planets Soon To Be Discovered</h1>
//             <div className="planetBox">
//               <Row>
//                 <Col>

//                   <img src={planetBlue} />
//                 </Col>
//                 <Col>
//                   <img src={planetJungle} />
//                 </Col>
//                 <Col>
//                   <img src={planetOrange} />
//                 </Col>
//               </Row>
//             </div>
//           </div>

//           <div className="footBox">
//             <div className="footerBox">
//               <h5 className="footHead">Space Tokens</h5>
//               <p className="footOption">Get started</p>
//               <p className="footOption">Documentation</p>
//             </div>
//             <div className="footerBox">
//               <h5 className="footHead">Company</h5>
//               <p className="footOption">Privacy policy</p>
//               <p className="footOption">Terms of service</p>
//             </div>
//             <div className="footerBox2">
//               <h5 className="footHead">Support</h5>
//               <p className="footOption">Contact</p>
//               <p className="footOption">Twitter</p>
//             </div>
//           </div>

//         </div>
//       </Container>
//     );
//   }
// }
