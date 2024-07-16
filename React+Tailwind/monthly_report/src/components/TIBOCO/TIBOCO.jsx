/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Import } from "../../icons/Import";

export const TIBOCO = ({
  property1,
  className,
  overlapGroupClassName,
  divClassName,
  icon = <Import className="!absolute !w-[62px] !h-[62px] !top-0 !left-[17px]" />,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`${state.property1 === "variant-2" ? "w-[125px]" : "w-[97px]"} ${
        state.property1 === "variant-2" ? "h-[99px]" : "h-[77px]"
      } ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className={`relative ${state.property1 === "variant-2" ? "h-[98px]" : "h-[76px]"} ${overlapGroupClassName}`}>
        <div
          className={`text-transparent leading-[normal] [font-family:'Inter',Helvetica] absolute font-semibold whitespace-nowrap [-webkit-text-fill-color:transparent] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(136.46,86.13,201.88)_100%)] [text-fill-color:transparent] left-0 tracking-[0] [-webkit-background-clip:text] bg-clip-text ${
            state.property1 === "variant-2" ? "top-[75px]" : "top-[58px]"
          } ${state.property1 === "variant-2" ? "w-[125px]" : "w-[97px]"} ${
            state.property1 === "variant-2" ? "text-[22.6px]" : "text-[17.5px]"
          } ${state.property1 === "default" ? "opacity-[0.73]" : ""} ${divClassName}`}
        >
          Tải báo cáo
        </div>
        {icon}
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "variant-2",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

TIBOCO.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
