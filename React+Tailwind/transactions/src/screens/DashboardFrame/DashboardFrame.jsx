import React from "react";
import { Component } from "../../components/Component";
import { MenuAsset } from "../../components/MenuAsset";
import { Coin } from "../../icons/Coin";

export const DashboardFrame = () => {
  return (
    <div className="bg-[#edecff] flex flex-row justify-center w-full">
      <div className="bg-[#edecff] w-[1920px] h-[1080px] relative">
        <MenuAsset
          className="!absolute bg-[url(/static/img/menu-4.svg)] !left-0 !top-0"
          logo="/img/logo-3.png"
          reportSubtract="/img/subtract-25.png"
          settingSettingFill="/img/setting-fill-2.svg"
          state="dashboard"
          transactionChatSearchFill="/img/chat-search-fill-2.svg"
        />
        <div className="absolute top-[51px] left-[365px] [font-family:'Inter',Helvetica] font-black text-text text-[55.5px] tracking-[0] leading-[normal]">
          Trang chủ
        </div>
        <div className="absolute w-[300px] h-[168px] top-[185px] left-[381px] bg-white rounded-[25.07px] shadow-[0px_3.86px_35.78px_-18px_#7065d2]">
          <p className="absolute top-[21px] left-[23px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            SỐ SỔ MỚI HÔM NAY
          </p>
          <div className="w-[213px] h-0.5 top-[46px] left-[23px] rounded-[2.61px] absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)]" />
          <div className="absolute top-[50px] left-[38px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-extrabold text-transparent text-[71.7px] tracking-[0] leading-[86.8px] whitespace-nowrap">
            45
          </div>
        </div>
        <div className="absolute w-[639px] h-[168px] top-[185px] left-[697px] bg-white rounded-[25.07px] shadow-[0px_3.86px_35.78px_-18px_#7065d2]">
          <Coin className="!absolute !w-[41px] !h-[41px] !top-2.5 !left-[569px]" />
          <div className="absolute w-[445px] h-[87px] top-[50px] left-[41px]">
            <div className="w-[416px] top-0 left-0 font-extrabold text-[71.7px] leading-[86.8px] absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] text-transparent tracking-[0]">
              2,000,000
            </div>
            <div className="absolute top-[51px] left-[401px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              VND
            </div>
          </div>
          <div className="absolute top-[21px] left-[41px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            DOANH THU HÔM NAY
          </div>
          <div className="w-[223px] h-0.5 top-[46px] left-[41px] rounded-[2.61px] absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)]" />
        </div>
        <div className="absolute w-[465px] h-[818px] top-[185px] left-[1361px] bg-white rounded-[25.07px] shadow-[0px_3.86px_35.78px_-18px_#7065d2]">
          <p className="absolute top-[29px] left-[29px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
            THỐNG KÊ LOẠI TIẾT KIỆM
          </p>
          <div className="absolute w-[367px] h-[367px] top-[113px] left-[51px]">
            <img className="absolute w-[325px] h-[178px] top-0 left-10" alt="Ellipse" src="/img/ellipse-129.svg" />
            <img className="absolute w-[152px] h-[270px] top-[85px] left-0" alt="Ellipse" src="/img/ellipse-131.svg" />
            <img
              className="absolute w-[231px] h-[187px] top-[180px] left-[136px]"
              alt="Ellipse"
              src="/img/ellipse-130.svg"
            />
            <div className="absolute w-[84px] top-8 left-[182px] [font-family:'Inter',Helvetica] font-black text-white text-[33.4px] tracking-[0] leading-[normal]">
              40%
            </div>
            <div className="top-[201px] left-[17px] absolute w-[66px] [font-family:'Inter',Helvetica] font-black text-white text-[26.3px] tracking-[0] leading-[normal]">
              30%
            </div>
            <div className="top-[280px] left-56 absolute w-[66px] [font-family:'Inter',Helvetica] font-black text-white text-[26.3px] tracking-[0] leading-[normal]">
              30%
            </div>
          </div>
          <div className="w-[332px] h-1 top-[63px] left-[29px] rounded-[5px] absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)]" />
          <p className="absolute top-[71px] left-[29px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Tính tất cả sổ đã mở
          </p>
          <div className="absolute w-[380px] h-[300px] top-[498px] left-[45px] rounded-[20px] overflow-hidden overflow-y-scroll">
            <div className="absolute w-[30px] h-[30px] top-[289px] left-1 bg-[#c4455f] rounded-[15px] shadow-[inset_0px_4.36px_43.56px_-10.89px_#4e40c3]" />
            <div className="absolute w-[30px] h-[30px] top-[353px] left-1 bg-[#8c253b] rounded-[15px] shadow-[inset_0px_4.36px_43.56px_-10.89px_#4e40c3]" />
            <div className="absolute top-[286px] left-[45px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-2xl tracking-[0] leading-[normal]">
              Kỳ hạn thêm vào
            </div>
            <div className="top-[286px] left-[294px] font-medium text-2xl absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] text-transparent tracking-[0] leading-[normal]">
              0
            </div>
            <div className="absolute top-[349px] left-[45px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-2xl tracking-[0] leading-[normal]">
              Kỳ hạn thêm vào
            </div>
            <div className="top-[349px] left-[294px] font-medium text-2xl absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] text-transparent tracking-[0] leading-[normal]">
              0
            </div>
            <div className="absolute top-[88px] left-[45px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-2xl tracking-[0] leading-[normal]">
              Không kỳ hạn
            </div>
            <div className="top-[88px] left-[285px] font-medium text-2xl absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] text-transparent tracking-[0] leading-[normal]">
              80
            </div>
            <div className="absolute top-[154px] left-[45px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-2xl tracking-[0] leading-[normal]">
              Kỳ hạn 3 tháng
            </div>
            <div className="top-[154px] left-[285px] font-medium text-2xl absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] text-transparent tracking-[0] leading-[normal]">
              60
            </div>
            <div className="absolute top-[220px] left-[45px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-2xl tracking-[0] leading-[normal]">
              Kỳ hạn 6 tháng
            </div>
            <div className="top-[220px] left-[285px] font-medium text-2xl absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] text-transparent tracking-[0] leading-[normal]">
              60
            </div>
            <div className="absolute top-[27px] left-[86px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-black text-transparent text-[28.9px] tracking-[0] leading-[normal]">
              Tổng
            </div>
            <div className="top-[25px] left-[229px] font-black text-[28.9px] absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] text-transparent tracking-[0] leading-[normal]">
              200
            </div>
            <div className="absolute w-[30px] h-[30px] top-[92px] left-1 bg-[#5e58c3] rounded-[15px] shadow-[inset_0px_4.36px_43.56px_-10.89px_#3a3375]" />
            <div className="absolute w-[30px] h-[30px] top-[157px] left-1 bg-[#9e72d7] rounded-[15px] shadow-[inset_0px_4.36px_43.56px_-10.89px_#794cb3]" />
            <div className="absolute w-[30px] h-[30px] top-56 left-1 bg-[#8c83e1] rounded-[15px] shadow-[inset_0px_4.36px_43.56px_-10.89px_#4e40c3]" />
          </div>
        </div>
        <p className="absolute w-[420px] top-[127px] left-[368px] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[23.3px] tracking-[0] leading-[28.2px] whitespace-nowrap">
          Thứ năm, ngày 13 tháng 6 năm 2024
        </p>
        <div className="absolute w-[991px] h-[646px] top-[373px] left-[356px]">
          <div className="relative w-[955px] h-[607px] top-3.5 left-[25px] bg-white rounded-[25.07px] shadow-[0px_3.86px_35.78px_-18px_#7065d2]">
            <p className="absolute top-[17px] left-[444px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
              THỐNG KÊ TIỀN GỬI / RÚT THEO TUẦN
            </p>
            <div className="w-[492px] h-1 top-12 left-[426px] rounded-[5px] absolute [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)]" />
            <Component
              className="!h-[500px] !absolute !left-[66px] !w-[835px] !top-[63px]"
              divClassName="!top-[19px]"
              divClassName1="!top-[19px]"
              divClassName10="!top-[163px]"
              divClassName11="!top-[232px]"
              divClassName12="!top-[94px]"
              divClassName13="!top-[25px]"
              divClassName2="!top-[19px]"
              divClassName3="!top-[19px]"
              divClassName4="!top-[19px]"
              divClassName5="!top-[19px]"
              divClassName6="!left-[667px]"
              divClassName7="!left-[772px]"
              divClassName8="!top-[370px]"
              divClassName9="!top-[301px]"
              divClassNameOverride="!top-[19px]"
              ellipseClassName="!h-4 !rounded-[8.81px/7.98px] !top-[167px]"
              ellipseClassName1="!h-4 !rounded-[8.81px/7.98px] !left-[241px] !top-[159px]"
              ellipseClassName10="!h-4 !rounded-[8.81px/7.98px] !left-[630px] !top-[83px]"
              ellipseClassName11="!h-4 !rounded-[8.81px/7.98px] !left-[762px] !top-[278px]"
              ellipseClassName12="!h-4 !rounded-[8.81px/7.98px] !left-[241px]"
              ellipseClassName2="!h-4 !rounded-[8.81px/7.98px] !left-96 !top-[46px]"
              ellipseClassName3="!h-4 !rounded-[8.81px/7.98px] !left-[507px] !top-[92px]"
              ellipseClassName4="!h-4 !rounded-[8.81px/7.98px] !left-[632px]"
              ellipseClassName5="!h-4 !rounded-[8.81px/7.98px] !left-[757px] !top-[90px]"
              ellipseClassName6="!h-4 !rounded-[8.81px/7.98px] !top-[227px]"
              ellipseClassName7="!h-4 !rounded-[8.81px/7.98px] !left-96 !top-[131px]"
              ellipseClassName8="!h-4 !rounded-[8.81px/7.98px] !left-[118px] !top-[159px]"
              ellipseClassName9="!h-4 !rounded-[8.81px/7.98px] !left-[510px] !top-[280px]"
              ellipseClassNameOverride="!h-4 !rounded-[8.81px/7.98px] !left-[118px] !top-[98px]"
              groupClassName="!h-[183px] !w-[774px] !top-[168px]"
              groupClassNameOverride="!h-[296px] !w-[779px] !top-[39px]"
              img="/img/vector-239-2.svg"
              imgClassName="!w-[765px] !top-[232px]"
              imgClassNameOverride="!w-[765px] !top-[162px]"
              overlapClassName="!h-10 !left-7 !top-[461px]"
              overlapClassName1="!h-10 !left-[558px] !top-[462px]"
              overlapClassName2="!h-10 !left-[675px] !top-[461px]"
              overlapClassName3="!h-10 !left-[799px] !top-[461px]"
              overlapClassName4="!h-[455px] !left-[43px] !w-[786px]"
              overlapClassNameOverride="!h-10 !left-[162px] !top-[461px]"
              overlapGroupClassName="!h-10 !left-[289px] !top-[461px]"
              overlapGroupClassName1="!h-[443px] !w-[779px] !top-3"
              overlapGroupClassNameOverride="!h-10 !left-[423px] !top-[461px]"
              property1="default"
              vector="/img/vector-238-2.svg"
              vector1="/img/vector-240-2.svg"
              vector2="/img/vector-241-2.svg"
              vector3="/img/vector-242-2.svg"
              vector4="/img/vector-236-2.svg"
              vector5="/img/vector-235-2.svg"
              vector6="/img/vector-232-2.svg"
              vector7="/img/vector-233-2.svg"
              vector8="/img/vector-243-2.svg"
              vectorClassName="!w-[765px] !top-[370px]"
              vectorClassName1="!w-[765px] !top-[94px]"
              vectorClassName2="!h-[168px] !w-[765px] !top-[174px]"
              vectorClassName3="!h-[283px] !w-[765px] !top-[45px]"
              vectorClassName4="!h-[442px] !left-[5px]"
              vectorClassName5="!w-[765px] !top-[440px]"
              vectorClassName6="!w-[765px] !top-9"
              vectorClassNameOverride="!w-[765px] !top-[301px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
