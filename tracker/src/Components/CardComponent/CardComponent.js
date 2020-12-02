import React from "react";
import { getBackgroundColor, numberWithCommas } from "../../utils/utils";
import "./CardComponent.css";

//TODO: In card component handle number of cases with proper comma separated number
export default function CardComponent({
  title = "",
  cases = 0,
  casesKey = "",
}) {
  const BACKGROUND_COLOR = getBackgroundColor(casesKey);
  return (
    <div
      className={`card-container-${casesKey}`}
      style={{ borderRadius: 7, width: "10%" }}
    >
      <h4
        className="text-style"
        style={{ textAlign: "center", color: BACKGROUND_COLOR }}
      >
        {title.toUpperCase()}
      </h4>
      <h3
        className="text-style"
        style={{ textAlign: "center", color: BACKGROUND_COLOR }}
      >
        {numberWithCommas(cases)}
      </h3>
    </div>
  );
}
