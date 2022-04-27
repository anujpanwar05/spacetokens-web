import * as React from "react"
import { connect } from "react-redux";

const NotFound = () => {
  return (
    <div>Oh No, Much Missing!</div>
  )
}

export default connect()(NotFound);
