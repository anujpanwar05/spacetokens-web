import React from "react";
import Header from "../../components/Header";
import InformationSection from "./informationSection";
import DiscoveriesSection from "./discoveriesSection";
import HeaderSection from "./headerSection";
import { connect } from "react-redux";
import Roadmap from "../../assets/img/roadmap.png"


function Home() {
  return (
    <>
      <Header component={"home"} />
      <HeaderSection />
      <DiscoveriesSection />
      <InformationSection />
      {window.innerWidth > 900 &&
        <img src={Roadmap} alt="Roadmap" style={{ width: '100%'}}/>
      }
    </>
  );
}

export default connect()(Home);
