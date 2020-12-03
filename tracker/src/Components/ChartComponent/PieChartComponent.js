import React, { useState, ComponentProps } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useStateValue } from "../../store/StateProvider";
import {
  chartData,
  GlobalCasesKey,
  getBackgroundColor,
} from "../../utils/utils";

//TODO: will uncomment the code and add hover on PIE segment
export default function PieChartComponent() {
  // const [selected, setSelected] = useState(0);
  // const [focused, setFocused] = useState(undefined);
  const [{ globalCases }] = useStateValue();

  const data = chartData.map((entry, i) => {
    let result = entry;
    // if (focused === i) {
    //   result = {
    //     ...result,
    //     color: getBackgroundColor(GlobalCasesKey[i]),
    //   };
    // }

    return { ...result, value: globalCases[[GlobalCasesKey[i]]] };
  });

  //const segmentsStyle = { transition: "stroke .3s", cursor: "pointer" };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderWidth: 0,
        marginBottom: "5%",
      }}
    >
      <PieChart
        data={data}
        radius={40}
        lineWidth={75}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: "5",
          padding: "2",
          textAlign: "centre",
          color: "white",
        }}
        // viewBoxSize={[110, 110]}
        // onFocus={(_, index) => {
        //   setFocused(index !== 2 ? index : undefined);
        // }}
        // onBlur={() => setFocused(undefined)}
        // segmentsTabIndex={3}
      />
    </div>
  );
}
