import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const data = [
//   { label: "January", income: 5000, expense: 3000 },
//   { label: "February", income: 5200, expense: 3200 },
//   { label: "March", income: 5500, expense: 3500 },
//   { label: "April", income: 4800, expense: 2900 },
//   { label: "May", income: 5100, expense: 3100 },
//   { label: "June", income: 5300, expense: 3300 },
//   { label: "July", income: 5400, expense: 3400 },
//   { label: "August", income: 5600, expense: 3600 },
//   { label: "September", income: 5700, expense: 3700 },
//   { label: "October", income: 5900, expense: 3900 },
//   { label: "November", income: 6000, expense: 4000 },
//   { label: "December", income: 6200, expense: 4200 },
// ];

interface DataItem{
    label:string
    income:string
    expense:string
  }
interface dataProps{
  data:DataItem[]
}
const Chart = ({data}:dataProps) => {
  return (
    <div className="w-full md:w-2/3">
      <h2 className="text-2xl 2xl:text-3xl font-semibold text-gray-600 dark:text-gray-500">
        Transaction Activity
      </h2>

      <ResponsiveContainer width={"100%"} height={500} className='mt-5'>
        <LineChart margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <YAxis />
          <XAxis />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name) => [
              `$${Number(value).toLocaleString()}`,
              name === 'income' ? 'Income' : 'Expense'
            ]}
            labelFormatter={(label) => `mois: ${label}`}
          />
          <Legend />
          <Line type='monotone' dataKey={"income"} stroke='#8884d8' />
          <Line type='monotone' dataKey={"expense"} stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
