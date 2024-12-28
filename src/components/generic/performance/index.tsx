import React from "react";
import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Card, CardTitle } from "@/components/ui/card";

// Define the data type for each segment of the chart
interface PerformanceData {
  name: string;
  value: number;
  fill: string;
}

// Props for the Performance component
interface PerformanceProps {
  title: string;
  chartData: PerformanceData[];
  centerLabelValue: string | number;
  centerLabelDescription: string;
  footerText: string;
}

const ChartCenterLabel: React.FC<{ value: string | number; description: string }> = ({
  value,
  description,
}) => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 className="text-3xl font-bold">{value}</h1>
    <p className="text-xs text-gray-300">{description}</p>
  </div>
);

const Performance: React.FC<PerformanceProps> = ({
  title,
  chartData,
  centerLabelValue,
  centerLabelDescription,
  footerText,
}) => {
  return (
    <Card className="relative p-4 flex flex-col gap-4 h-80">
      {/* Header */}
      <div className="flex justify-between items-center">
        <CardTitle className="mb-2 text-lg">{title}</CardTitle>
        <MoreHorizontal />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Chart Center Label */}
      <ChartCenterLabel value={centerLabelValue} description={centerLabelDescription} />

      {/* Footer */}
      <h2 className="font-medium absolute bottom-16 left-0 right-0 text-center">
        {footerText}
      </h2>
    </Card>
  );
};

export default Performance;
