/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const ChatSearchFill = ({
  className,
  overlapGroupClassName,
  ellipseClassName,
  vectorClassName,
  vector = "/img/vector-231-5.svg",
  subtractClassName,
  subtract = "/img/subtract-24.svg",
}) => {
  return (
    <div className={`w-6 h-6 ${className}`}>
      <div className={`relative w-5 h-[18px] top-[3px] left-0.5 ${overlapGroupClassName}`}>
        <div
          className={`absolute w-[7px] h-[7px] top-2.5 left-3 rounded-[3.5px] border-2 border-solid border-fillicon ${ellipseClassName}`}
        />
        <img className={`absolute w-1 h-1 top-3.5 left-4 ${vectorClassName}`} alt="Vector" src={vector} />
        <img className={`absolute w-5 h-[18px] top-0 left-0 ${subtractClassName}`} alt="Subtract" src={subtract} />
      </div>
    </div>
  );
};

ChatSearchFill.propTypes = {
  vector: PropTypes.string,
  subtract: PropTypes.string,
};
