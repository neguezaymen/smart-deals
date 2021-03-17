import React from "react";
import GroupBanner from "./GroupBanner";
import "../styles/Banner.css";

const BannerTop = () => {
  return (
    <div style={{ backgroundColor: "#F6F7F9" }}>
      <div className="banner-title">
        <div style={{ userSelect: "none" }}>Parcourir les groupes </div>
      </div>
      <div className="group-banner">
        <GroupBanner />
      </div>
    </div>
  );
};

export default BannerTop;
