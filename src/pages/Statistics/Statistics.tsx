import React from 'react';
import Container from 'react-bootstrap/Container';
import statisticsImg from '../../assets/statistics.png';
import styles from './statistics.module.css';
import { games } from '../../const/games';
import StatisticsBarChart from '../../components/StatisticsBarChart/StatisticsBarChart';

export type ChartDataItem = {
  name: string;
  value: number;
  label: string;
};

const data: Array<ChartDataItem> = [
  { name: games[0].nameRU, value: 9, label: '9 слов' },
  { name: games[1].nameRU, value: 7, label: '7 слов' },
  { name: games[2].nameRU, value: 0, label: '0 слов' },
  { name: games[3].nameRU, value: 20, label: '20 слов' },
  { name: 'Всего', value: 20, label: '20 слов' },
];

const Statistics = (): JSX.Element => (
  <div>
    <Container fluid>
      <h4>Статистика</h4>
      <img className={styles.statisticsImg} src={statisticsImg} alt="Ученики и графики" />
      <hr className={styles.color} />
      <h5 className={styles.margin}>Количество слов, выученных сегодня </h5>
      <Container>
        <StatisticsBarChart chartData={data} />
      </Container>
    </Container>
  </div>
);

export default Statistics;
