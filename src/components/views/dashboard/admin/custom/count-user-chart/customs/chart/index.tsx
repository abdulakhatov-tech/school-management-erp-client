import React from "react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

import maleFemale from "@/assets/images/male-female.png";
import useChartFeatures from "./features";

interface PropsI {
  boys: number;
  girls: number;
}

const Chart: React.FC<PropsI> = ({ boys, girls }) => {
  const { data } = useChartFeatures();

  return (
    <div className='relative w-full h-[75%]'>
      <ResponsiveContainer>
        <RadialBarChart
          cx='50%'
          cy='50%'
          innerRadius='40%'
          outerRadius='100%'
          barSize={32}
          data={data({ boys, girls })}
        >
          <RadialBar background dataKey='count' />
        </RadialBarChart>
      </ResponsiveContainer>
      <img
        src={maleFemale}
        alt='male-female'
        width={50}
        height={50}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  );
};

export default Chart;
