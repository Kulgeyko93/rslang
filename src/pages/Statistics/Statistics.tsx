import React from 'react';
import Container from 'react-bootstrap/Container';
import statisticsImg from '../../assets/statistics.png';
import styles from './statistics.module.css';
import { games } from '../../const/games';
import StatisticsBarChart from '../../components/StatisticsBarChart/StatisticsBarChart';
import StatisticsLineChart from '../../components/StatisticsLineChart/StatisticsLineChart';

export type BarChartDataItem = {
  name: string;
  value: number;
  label: string;
};
export type LineChartDataItem = {
  name: string;
  value: number;
};

const learnedWords: Array<BarChartDataItem> = [
  { name: games[0].nameRU, value: 9, label: '9 слов' },
  { name: games[1].nameRU, value: 7, label: '7 слов' },
  { name: games[2].nameRU, value: 0, label: '0 слов' },
  { name: games[3].nameRU, value: 20, label: '21 слово' },
  { name: 'Общее кол-во', value: 20, label: '20 слов' },
];
const correctAnswers: Array<BarChartDataItem> = [
  { name: games[0].nameRU, value: 90, label: '90%' },
  { name: games[1].nameRU, value: 7, label: '7%' },
  { name: games[2].nameRU, value: 0, label: '0%' },
  { name: games[3].nameRU, value: 20, label: '21%' },
  { name: 'Общий %', value: 20, label: '20%' },
];
const seriesCorrectAnswers: Array<BarChartDataItem> = [
  { name: games[0].nameRU, value: 90, label: '90' },
  { name: games[1].nameRU, value: 7, label: '7' },
  { name: games[2].nameRU, value: 0, label: '0' },
  { name: games[3].nameRU, value: 20, label: '21' },
];
const allLearnedWords: Array<LineChartDataItem> = [
  { name: '1', value: 20 },
  { name: '2', value: 7 },
  { name: '3', value: 0 },
  { name: '4', value: 10 },
  { name: '5', value: 10 },
  { name: '6', value: 10 },
  { name: '7', value: 10 },
  { name: '8', value: 10 },
  { name: '9', value: 10 },
  { name: '10', value: 10 },
  { name: '11', value: 10 },
  { name: '12', value: 10 },
  { name: '1', value: 20 },
  { name: '2', value: 7 },
  { name: '3', value: 0 },
  { name: '4', value: 10 },
  { name: '5', value: 10 },
  { name: '6', value: 10 },
  { name: '7', value: 10 },
  { name: '8', value: 10 },
  { name: '9', value: 10 },
  { name: '10', value: 10 },
  { name: '11', value: 10 },
  { name: '12', value: 10 },
  { name: '8', value: 10 },
  { name: '9', value: 10 },
  { name: '10', value: 10 },
  { name: '11', value: 10 },
  { name: '12', value: 10 },
  { name: '12', value: 10 },
  { name: '8', value: 10 },
  { name: '9', value: 10 },
  { name: '10', value: 10 },
  { name: '11', value: 10 },
  { name: '12', value: 10 },
];
const month = 'апреля';

const Statistics = (): JSX.Element => (
  <div>
    <Container fluid>
      <h4>Статистика</h4>
      <img className={styles.statisticsImg} src={statisticsImg} alt="Ученики и графики" />
      <hr className={styles.color} />
      <h5 className={styles.margin}>Количество слов, выученных сегодня </h5>
      <div className={styles.container}>
        <StatisticsBarChart chartData={learnedWords} />
      </div>
      <hr className={styles.color} />
      <h5 className={styles.margin}>Процент правильных ответов в играх</h5>
      <div className={styles.container}>
        <StatisticsBarChart chartData={correctAnswers} />
      </div>
      <hr className={styles.color} />
      <h5 className={styles.margin}>Самая длинная серия правильных ответов в каждой игре</h5>
      <div className={styles.container}>
        <StatisticsBarChart chartData={seriesCorrectAnswers} />
      </div>
      <hr className={styles.color} />
      <h5 className={styles.margin}>Количество выученных слов за весь период обучения по дням</h5>
      <div className={styles.container}>
        <StatisticsLineChart chartData={allLearnedWords} month={month} />
      </div>
      <h5 className={styles.margin}>Увеличение общего количества выученных слов за весь период обучения по дням</h5>
      <div className={styles.container}>
        <StatisticsLineChart chartData={allLearnedWords} month={month} />
      </div>
    </Container>
  </div>
);

export default Statistics;
