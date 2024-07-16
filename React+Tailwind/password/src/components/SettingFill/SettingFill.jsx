/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const SettingFill = ({ className, subtractClassName, subtract = "/img/subtract-15.svg" }) => {
  return (
    <div className={`relative w-6 h-6 ${className}`}>
      <img className={`absolute w-5 h-5 top-0.5 left-0.5 ${subtractClassName}`} alt="Subtract" src={subtract} />
    </div>
  );
};

SettingFill.propTypes = {
  subtract: PropTypes.string,
};
