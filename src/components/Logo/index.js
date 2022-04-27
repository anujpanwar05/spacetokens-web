import "./style.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logoContainer">
          Space Tokens
          <span className="api"></span>
        </div>
      </Link>
    );
  }
}
