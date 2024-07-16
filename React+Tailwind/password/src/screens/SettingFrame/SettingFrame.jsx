import React from "react";
import { MenuAsset } from "../../components/MenuAsset";
import { ArrowRight1 } from "../../icons/ArrowRight1";

export const SettingFrame = () => {
  return (
    <div className="bg-[#edecff] flex flex-row justify-center w-full">
      <div className="bg-[#edecff] w-[1920px] h-[1080px] relative">
        <MenuAsset
          className="!absolute !left-0 !top-0"
          dashboardChartFill="/img/chart-fill-2.svg"
          logo="/img/logo-1.png"
          menu="/img/menu-4.svg"
          settingSettingFill="/img/setting-fill-2.svg"
          state="setting"
          transactionChatSearchFill="/img/chat-search-fill-2.svg"
        />
        <div className="absolute top-[51px] left-[365px] [font-family:'Inter',Helvetica] font-black text-text text-[55.5px] tracking-[0] leading-[normal]">
          Cài đặt
        </div>
        <div className="absolute w-[1287px] h-[136px] top-[418px] left-[463px] bg-white rounded-[37.97px] shadow-[0px_5.84px_54.18px_-27.26px_#7065d2]">
          <div className="absolute top-[47px] left-[47px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-[38.9px] tracking-[0] leading-[normal]">
            **************************************
          </div>
        </div>
        <p className="absolute top-[341px] left-[483px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-[38.9px] tracking-[0] leading-[normal]">
          Nhập mật khẩu để có thể chỉnh sửa
        </p>
        <p className="absolute w-[420px] top-[127px] left-[368px] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[23.3px] tracking-[0] leading-[28.2px] whitespace-nowrap">
          Thứ năm, ngày 13 tháng 6 năm 2024
        </p>
        <div className="absolute w-[324px] h-[68px] top-[634px] left-[1409px] rounded-xl">
          <div className="absolute w-[324px] h-[68px] top-0 left-0 rounded-xl [background:linear-gradient(180deg,rgb(81.13,176.37,113.51)_0%,rgb(5.44,148.32,54.02)_100%)]" />
          <div className="absolute top-[15px] left-24 [font-family:'Inter',Helvetica] font-black text-[#fcfcfc] text-[28.9px] tracking-[0] leading-[normal]">
            Tiếp tục
          </div>
          <ArrowRight1 className="!absolute !w-[38px] !h-[38px] !top-[15px] !left-56" />
        </div>
      </div>
    </div>
  );
};
