import React from "react";
import "./IconComponent.css";
export default function IconComponent({
  iconName = "",
  iconColor = "",
  onPageNumberChange,
}) {
  return (
    <div
      className="icon-container"
      onClick={onPageNumberChange}
      style={{ borderRadius: 10 }}
    >
      <i className="material-icons" style={{ color: iconColor }}>
        {iconName}
      </i>
    </div>
  );
}
