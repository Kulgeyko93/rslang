import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { LineChartDataItem } from '../../pages/Statistics/Statistics';

type PropsType = {
  chartData: Array<LineChartDataItem>;
  month: string;
};
const margin = { top: 20, right: 35, left: 10, bottom: 10 };
const wrapper = {
  border: '1px solid #ccc',
  background: '#fff',
  padding: '0.5rem 0.5rem 0',
};

const CustomTooltip = ({ active, payload, label, month }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} ${month}`}</p>
        <p className="label">{`слов: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const StatisticsLineChart = ({ chartData, month }: PropsType): JSX.Element => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={chartData} margin={margin}>
      <Line type="monotone" dataKey="value" stroke="#e06460" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" interval={0} hide />
      <YAxis hide />
      <Tooltip content={<CustomTooltip month={month} />} wrapperStyle={wrapper} />
    </LineChart>
  </ResponsiveContainer>
);

export default StatisticsLineChart;
