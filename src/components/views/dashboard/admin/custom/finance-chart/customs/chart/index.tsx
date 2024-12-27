import React from "react";
import { useTranslation } from "react-i18next";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FinanceChart: React.FC<any> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <ResponsiveContainer width='100%' height='90%'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke='#ddd' />
        <XAxis
          dataKey='name'
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
          tickMargin={20}
        />
        <Tooltip />
        <Legend
          align='center'
          verticalAlign='top'
          wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
        />
        <Line
          type='monotone'
          dataKey='income'
          name={t("admin_dashboard.income")}
          stroke='#C3EBFA'
          strokeWidth={5}
        />
        <Line
          type='monotone'
          dataKey='expense'
          name={t("admin_dashboard.expense")}
          stroke='#CFCEFF'
          strokeWidth={5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FinanceChart;
