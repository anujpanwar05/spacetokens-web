import React from "react";
import Draggable from 'react-draggable';
import "./style.css";
import { connect } from "react-redux"
import { setAdaLaunchAmount } from '../../redux/application/actions'

function remap (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
const handleWidth = 60;

class AdaSlider extends React.Component {

  constructor(props) {
    super(props);
    this.nodeRef = React.createRef(null);
    this.state = {
      position: this.props.ada,
      value: this.props.ada
    };
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDrag(e, data) {
    const ada = remap(data.x, 0, data.node.parentNode.clientWidth - handleWidth, this.props.min, this.props.max)
    this.props.setAdaLaunchAmount(Math.round(ada))
    this.setState({
      position: data.x,
      value: ada
    });
  }
  render() {
    return <div className="ada-slider-container">

      <div className={'amount-text'}>{Math.round(this.props.ada)}</div>

      {this.props.labels.length > 0 && (
        <div className="labels">
          {this.props.labels.map((item, idx) => (
            <div key={idx}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
      <div className="ada-container">
        <div className="dragger-box">
          <div className="dragger-fill" style={{width: this.props.ada + "px"}}>
          </div>
          <Draggable
            axis="x"
            bounds=".dragger-box"
            allowAnyClick={true}
            position={null}
            onDrag={this.handleDrag}
            defaultPosition={{x: 250, y: 0}}
            nodeRef={this.nodeRef}
            remap={1}>
              <div id="adaSliderHandle" ref={this.nodeRef} style={{width: handleWidth + "px"}}/>
          </Draggable>
        </div>
      </div>
    </div>
  }
}


const mapStateToProps = (state) => {
  const { application } = state;
  return {
    ada: application.adaLaunchAmount
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    setAdaLaunchAmount: (ada) => dispatch(setAdaLaunchAmount(ada)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdaSlider);
