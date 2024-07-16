/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { ChatSearchFill } from "../ChatSearchFill";

export const Transaction = ({
  stateProp,
  className,
  chatSearchFill = "/img/chat-search-fill-1.svg",
  chatSearchFillEllipseClassName,
  chatSearchFillSubtractClassName,
  chatSearchFillVectorClassName,
  chatSearchFillSubtract = "/img/subtract-23.svg",
  chatSearchFillVector = "/img/vector-231-4.svg",
  chatSearchFillOverlapGroupClassName,
  chatSearchFillChatSearchFillClassName,
  chatSearchFillClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "hovering",
  });

  return (
    <div
      className={`relative ${state.state === "selected" ? "w-[168px]" : "w-[207px]"} ${
        state.state === "default" ? "opacity-70" : ""
      } ${
        state.state === "hovering"
          ? "shadow-[0px_4.17px_2.61px_#00000040]"
          : state.state === "default"
          ? "shadow-[0px_3.38px_2.12px_#00000040]"
          : ""
      } ${state.state === "hovering" ? "h-[37px]" : "h-[30px]"} ${className}`}
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
      {["default", "hovering"].includes(state.state) && (
        <div
          className={`[font-family:'Inter',Helvetica] left-[47px] tracking-[0] text-background font-medium leading-[normal] whitespace-nowrap absolute ${
            state.state === "hovering" ? "w-[159px]" : "w-[200px]"
          } ${state.state === "hovering" ? "text-[23.2px]" : "text-[18.8px]"} ${
            state.state === "hovering" ? "top-1" : "top-[3px]"
          }`}
        >
          Quản lý sổ
        </div>
      )}

      {["hovering", "selected"].includes(state.state) && (
        <ChatSearchFill
          className={
            state.state === "selected"
              ? chatSearchFillChatSearchFillClassName
              : "!h-[37px] !absolute !left-0 !w-[37px] !top-0"
          }
          ellipseClassName={
            state.state === "selected"
              ? chatSearchFillEllipseClassName
              : "!border-background !h-[11px] !rounded-[5.41px] !border-[1.85px] !border-solid !left-[18px] !w-[11px] !top-[15px]"
          }
          overlapGroupClassName={
            state.state === "selected" ? chatSearchFillOverlapGroupClassName : "!h-7 !left-[3px] !w-[31px] !top-[5px]"
          }
          subtract={state.state === "selected" ? chatSearchFillSubtract : "/img/subtract-22.svg"}
          subtractClassName={state.state === "selected" ? chatSearchFillSubtractClassName : "!h-7 !w-[31px]"}
          vector={state.state === "selected" ? chatSearchFillVector : "/img/vector-231-3.svg"}
          vectorClassName={
            state.state === "selected" ? chatSearchFillVectorClassName : "!h-[5px] !left-[25px] !w-[5px] !top-[22px]"
          }
        />
      )}

      {state.state === "default" && (
        <img
          className={`absolute w-8 h-[30px] top-0 left-0 ${chatSearchFillClassName}`}
          alt="Chat search fill"
          src={chatSearchFill}
        />
      )}

      {state.state === "selected" && (
        <div
          className={`absolute w-[129px] top-[3px] left-[38px] [font-family:'Inter',Helvetica] font-medium text-accent text-[18.8px] tracking-[0] leading-[normal] whitespace-nowrap ${chatSearchFillClassName}`}
        >
          Quản lý sổ
        </div>
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

Transaction.propTypes = {
  stateProp: PropTypes.oneOf(["selected", "hovering", "default"]),
  chatSearchFill: PropTypes.string,
  chatSearchFillSubtract: PropTypes.string,
  chatSearchFillVector: PropTypes.string,
};
