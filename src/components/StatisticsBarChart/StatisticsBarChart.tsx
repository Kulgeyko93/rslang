import React from 'react';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { BarChartDataItem } from '../../pages/Statistics/Statistics';

const barColors = ['#fdff95', '#b5ffb4', '#a6fff5', '#ffb5d8', '#000000'];
const margin = { top: 40, right: 30, left: 20, bottom: 90 };

type PropsType = {
  chartData: Array<BarChartDataItem>;
};

const StatisticsBarChart = ({ chartData }: PropsType): JSX.Element => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={chartData} margin={margin}>
      <XAxis dataKey="name" stroke="#000000" interval={0} />
      <Bar dataKey="value" barSize={30} fill="#8884d8" stroke="#000000" strokeWidth={1}>
        <LabelList dataKey="label" position="top" fill="#000000" />
        {chartData.map((item, index) => (
          <Cell key={`cell-${item.name}`} fill={barColors[index]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default StatisticsBarChart;
