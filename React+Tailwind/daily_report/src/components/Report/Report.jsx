/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";

export const Report = ({
  stateProp,
  className,
  reportClassName,
  subtractClassName,
  subtract = "/img/subtract-21.svg",
  img = "/img/subtract-20.svg",
  to,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "hovering",
  });

  return (
    <Link
      className={`relative block ${state.state === "hovering" ? "w-[204px]" : "w-[162px]"} ${
        state.state === "default" ? "opacity-70" : ""
      } ${
        state.state === "hovering"
          ? "shadow-[0px_4.25px_2.66px_#00000040]"
          : state.state === "default"
          ? "shadow-[0px_3.38px_2.12px_#00000040]"
          : ""
      } ${state.state === "hovering" ? "h-[34px]" : "h-[27px]"} ${className}`}
      to={to}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div
        className={`[font-family:'Inter',Helvetica] tracking-[0] top-1 absolute font-medium whitespace-nowrap leading-[normal] ${
          state.state === "hovering" ? "w-[163px]" : "w-[129px]"
        } ${state.state === "hovering" ? "left-[42px]" : "left-[33px]"} ${
          state.state === "hovering" ? "text-[23.6px]" : "text-[18.8px]"
        } ${state.state === "selected" ? "text-accent" : "text-background"} ${reportClassName}`}
      >
        Báo cáo
      </div>
      <img
        className={`left-0 top-0 absolute ${state.state === "hovering" ? "w-[27px]" : "w-[22px]"} ${
          state.state === "hovering" ? "h-[34px]" : "h-[27px]"
        } ${subtractClassName}`}
        alt="Subtract"
        src={state.state === "default" ? img : state.state === "selected" ? subtract : "/img/subtract-19.svg"}
      />
    </Link>
  );
};

function reducer(state, action) {
  if (state.state === "hovering") {
    switch (action) {
      case "mouse_leave":
        return {
          state: "default",
        };
    }
  }

  if (state.state === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          state: "hovering",
        };
    }
  }

  switch (action) {
    case "click":
      return {
        ...state,
        state: "selected",
      };
  }

  return state;
}

Report.propTypes = {
  stateProp: PropTypes.oneOf(["selected", "hovering", "default"]),
  subtract: PropTypes.string,
  img: PropTypes.string,
  to: PropTypes.string,
};
