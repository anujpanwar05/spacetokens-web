import "./style.css";
import React, { Component } from "react";
import QRCode from "qrcode.react";

class DepositAddressQRCode extends Component {
  render() {
    const {address} = this.props
    return (
      <div className="qr-border">
        <QRCode size={200} value={address} />
      </div>
    )
  }
}

export default DepositAddressQRCode