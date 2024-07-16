/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { SettingFill } from "../SettingFill";

export const Setting = ({
  stateProp,
  className,
  divClassName,
  settingFillClassName,
  settingFill = "/img/setting-fill-1.svg",
  settingFillSubtract = "/img/subtract-14.svg",
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
        Cài đặt
      </div>
      {["default", "hovering"].includes(state.state) && (
        <SettingFill
          className={
            state.state === "default"
              ? "!h-[31px] !absolute !-left-0.5 !w-[31px] !top-0"
              : "!h-[39px] !absolute !left-0 !w-[38px] !top-0"
          }
          subtract={settingFillSubtract}
          subtractClassName={
            state.state === "default"
              ? "!h-[26px] !left-[3px] !w-[26px] !top-[3px]"
              : "!h-[33px] !left-[3px] !w-8 !top-[3px]"
          }
        />
      )}

      {state.state === "selected" && (
        <img
          className={`absolute w-[31px] h-[31px] top-0 -left-0.5 ${settingFillClassName}`}
          alt="Setting fill"
          src={settingFill}
        />
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

Setting.propTypes = {
  stateProp: PropTypes.oneOf(["selected", "hovering", "default"]),
  settingFill: PropTypes.string,
  settingFillSubtract: PropTypes.string,
  to: PropTypes.string,
};
