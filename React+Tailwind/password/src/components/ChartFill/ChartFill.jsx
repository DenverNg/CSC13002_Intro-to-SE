/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const ChartFill = ({ className, subtractClassName, subtract = "/img/subtract-18.svg" }) => {
  return (
    <div className={`relative w-[42px] h-[42px] ${className}`}>
      <img className={`absolute w-[35px] h-8 top-[5px] left-1 ${subtractClassName}`} alt="Subtract" src={subtract} />
    </div>
  );
};

ChartFill.propTypes = {
  subtract: PropTypes.string,
};
