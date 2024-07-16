/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { SettingFill } from "../SettingFill";

export const Setting = ({
  stateProp,
  className,
  settingFill = "/img/setting-fill-1.svg",
  divClassName,
  settingFillSettingFillClassName,
  settingFillSubtract = "/img/subtract-14.svg",
  settingFillSubtractClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "hovering",
  });

  return (
    <div
      className={`relative ${state.state === "hovering" ? "w-52" : "w-[169px]"} ${
        state.state === "default" ? "opacity-70" : ""
      } ${
        state.state === "hovering"
          ? "shadow-[0px_4.1px_2.56px_#00000040]"
          : state.state === "default"
          ? "shadow-[0px_3.38px_2.12px_#00000040]"
          : ""
      } ${state.state === "hovering" ? "h-10" : "h-8"} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onClick={() => {
        dispatch("click");
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
      {["hovering", "selected"].includes(state.state) && (
        <SettingFill
          className={settingFillSettingFillClassName}
          subtract={settingFillSubtract}
          subtractClassName={settingFillSubtractClassName}
        />
      )}

      {state.state === "default" && (
        <img className="absolute w-[31px] h-[31px] top-0 -left-0.5" alt="Setting fill" src={settingFill} />
      )}
    </div>
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
};
