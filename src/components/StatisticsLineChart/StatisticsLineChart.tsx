import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from 'recharts';
import { LineChartDataItem } from '../../features/statistics/statisticsSlice';

type PropsType = {
  chartData: Array<LineChartDataItem>;
};

const margin = { top: 5, right: 5, left: 5, bottom: 0 };
const wrapper = {
  border: '1px solid #ccc',
  background: '#fff',
  padding: '0.5rem 0.5rem 0',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="label">{`слов: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const StatisticsLineChart = ({ chartData }: PropsType): JSX.Element => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={chartData} margin={margin}>
      <Line type="monotone" dataKey="value" stroke="#e06460" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" minTickGap={30} interval="preserveStartEnd" />
      <YAxis hide />
      <Tooltip content={<CustomTooltip />} wrapperStyle={wrapper} />
      <Brush dataKey="date" height={25} />
    </LineChart>
  </ResponsiveContainer>
);

export default StatisticsLineChart;
