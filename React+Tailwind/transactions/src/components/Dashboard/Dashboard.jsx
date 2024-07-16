/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { ChartFill } from "../ChartFill";

export const Dashboard = ({
  stateProp,
  className,
  divClassName,
  chartFillClassName,
  chartFill = "/img/chart-fill-1.svg",
  chartFillSubtract = "/img/subtract-17.svg",
  to,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "hovering",
  });

  return (
    <Link
      className={`relative block ${state.state === "hovering" ? "w-52" : "w-[169px]"} ${
        state.state === "default" ? "opacity-70" : ""
      } ${
        state.state === "hovering"
          ? "shadow-[0px_4.1px_2.56px_#00000040]"
          : state.state === "default"
          ? "shadow-[0px_3.38px_2.12px_#00000040]"
          : ""
      } ${state.state === "hovering" ? "h-10" : "h-8"} ${className}`}
      to={to}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div
        className={`[font-family:'Inter',Helvetica] tracking-[0] font-medium leading-[normal] absolute ${
          state.state === "hovering" ? "w-[159px]" : "w-[129px]"
        } ${state.state === "hovering" ? "left-[49px]" : "left-10"} ${
          state.state === "hovering" ? "text-[22.8px]" : "text-[18.8px]"
        } ${state.state === "hovering" ? "top-[5px]" : "top-1"} ${
          state.state === "selected" ? "text-accent" : "text-background"
        } ${["default", "selected"].includes(state.state) ? "whitespace-nowrap" : ""} ${divClassName}`}
      >
        Trang chủ
      </div>
      {["default", "hovering"].includes(state.state) && (
        <ChartFill
          className={
            state.state === "default"
              ? "!h-8 !absolute !left-0 !w-8 !top-0"
              : "!h-10 !absolute !left-0 !w-[39px] !top-0"
          }
          subtract={chartFillSubtract}
          subtractClassName={
            state.state === "default" ? "!h-6 !left-[3px] !w-[26px] !top-1" : "!h-[30px] !left-[3px] !w-8"
          }
        />
      )}

      {state.state === "selected" && (
        <img className={`absolute w-8 h-8 top-0 left-0 ${chartFillClassName}`} alt="Chart fill" src={chartFill} />
      )}
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

Dashboard.propTypes = {
  stateProp: PropTypes.oneOf(["selected", "hovering", "default"]),
  chartFill: PropTypes.string,
  chartFillSubtract: PropTypes.string,
  to: PropTypes.string,
};
