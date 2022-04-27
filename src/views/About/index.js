import "./style.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import Header from "../../components/Header";

export default class Login extends Component {
  render() {
    return (
      <div className="">
        <Header component={"about"} />
        <h1>About</h1>
        
      </div>
    );
  }
}
