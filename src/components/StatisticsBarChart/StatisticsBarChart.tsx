import React from 'react';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { ChartDataItem } from '../../pages/Statistics/Statistics';

const barColors = ['#fdff95', '#b5ffb4', '#a6fff5', '#ffb5d8', '#000000'];

type PropsType = {
  chartData: Array<ChartDataItem>;
};

const StatisticsBarChart = ({ chartData }: PropsType): JSX.Element => (
  <ResponsiveContainer width="95%" height={250}>
    <BarChart data={chartData} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" stroke="#000000" />
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
