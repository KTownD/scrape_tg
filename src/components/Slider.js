import { useState } from "react";
import ReactSlider from "react-slider";

const Slider = ({currentValue, setCurrentValue}) => {

  return (
    <ReactSlider
      className="customSlider"
      thumbClassName="customSlider-thumb"
      trackClassName="customSlider-track"
      markClassName="customSlider-mark"
      //marks={20}
      min={70}
      max={300}
      defaultValue={150}
      value={currentValue}
      onChange={(value) => setCurrentValue(value)}
    //   renderMark={(props) => {
    //      if (props.key < currentValue) {
    //        props.className = "customSlider-mark customSlider-mark-before";
    //      } else if (props.key === currentValue) {
    //        props.className = "customSlider-mark customSlider-mark-active";
    //      }
    //      return <span {...props} />;
    //   }}
    />
  );
};

export default Slider;