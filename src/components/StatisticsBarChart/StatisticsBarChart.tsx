import React from 'react';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { games } from '../../constants/games';
import { BarChartDataItem } from '../../features/statistics/statisticsSlice';

const barColors = {
  [games[0].nameRU]: '#fdff95',
  [games[1].nameRU]: '#b5ffb4',
  [games[2].nameRU]: '#a6fff5',
  [games[3].nameRU]: '#ffb5d8',
};
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
        {chartData.map((item) => (
          <Cell key={`cell-${item.name}`} fill={barColors[item.name]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default StatisticsBarChart;
