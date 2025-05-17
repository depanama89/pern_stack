import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// import Title from "./title";

const data = [
  { name: "Income", value: 150020 },
  { name: "Expense", value: 50010 },
  { name: "Epargne", value: 4010 },
];

const COLORS = ["#002afe", "#ff2845", "#FF8042", "#00C49F"];

const DoughnutChart = () => {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center bg-gray-50 dark:bg-transparent mb-4">
      {/* <Title title='Summary' /> */}
      <p className="text-2xl 2xl:text-3xl font-semibold text-gray-600 dark:text-gray-500">
        Symmary
      </p>
      {/* <ResponsiveContainer width={"100%"} height={400}>
        <PieChart width={500} height={400}>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            innerRadius={110}
            outerRadius={180}
            fill="#8884d8"
            paddingAngle={5}
            dataKey={"value"}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer> */}

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            innerRadius={110}
            outerRadius={180}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
