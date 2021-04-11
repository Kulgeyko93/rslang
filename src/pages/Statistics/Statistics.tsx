import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import statisticsImg from '../../assets/statistics.png';
import styles from './statistics.module.css';
import StatisticsBarChart from '../../components/StatisticsBarChart/StatisticsBarChart';
import StatisticsLineChart from '../../components/StatisticsLineChart/StatisticsLineChart';
import { getDayAndMonth } from '../../utils/getDayAndMonth';
import { learnedWords, setStatistics, correctAnswers, seriesAnswers } from '../../features/statistics/statisticsSlice';
import { STORAGE_KEYS } from '../../constants';

export interface LineChartDataItem {
  date: string;
  value: number;
}

const allLearnedWords: Array<LineChartDataItem> = [
  { date: '1 апреля', value: 20 },
  { date: '2 апреля', value: 10 },
  { date: '3 апреля', value: 0 },
  { date: '5 апреля', value: 10 },
  { date: '6 апреля', value: 10 },
  { date: '7 апреля', value: 10 },
  { date: '9 апреля', value: 10 },
];
let sum = 0;
const increaseLearnedWords = allLearnedWords.map((item) => {
  sum += item.value;
  return { date: item.date, value: sum };
});

const Statistics = (): JSX.Element => {
  const learnedWordsData = useSelector(learnedWords);
  const correctAnswersData = useSelector(correctAnswers);
  const seriesCorrectAnswersData = useSelector(seriesAnswers);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const today = getDayAndMonth();
    const serializedStatistics = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    if (serializedStatistics) {
      try {
        const statistics = JSON.parse(serializedStatistics);
        if (statistics.date === today) {
          dispatch(setStatistics(statistics));
        } else {
          localStorage.removeItem(STORAGE_KEYS.STATISTICS);
        }
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
      }
    }
  }, []);
  return (
    <div>
      <Container fluid>
        <h4>Статистика</h4>
        <img className={styles.statisticsImg} src={statisticsImg} alt="Ученики и графики" />
        <hr className={styles.color} />
        {learnedWordsData.length > 0 && (
          <>
            <h5 className={styles.margin}>Количество слов, изученных сегодня </h5>
            <div className={styles.container}>
              <StatisticsBarChart chartData={learnedWordsData} />
            </div>

            <hr className={styles.first} />
            <h5 className={styles.margin}>Процент правильных ответов в играх</h5>
            <div className={styles.container}>
              <StatisticsBarChart chartData={correctAnswersData} />
            </div>

            <hr className={styles.color} />
            <h5 className={styles.margin}>Самая длинная серия правильных ответов в каждой игре</h5>
            <div className={styles.container}>
              <StatisticsBarChart chartData={seriesCorrectAnswersData} />
            </div>
          </>
        )}
        {learnedWordsData.length === 0 && (
          <h5 className={styles.margin}>Пока не сыграешь в игру, статистика не отобразится :)</h5>
        )}
        <hr className={styles.color} />
        <h5 className={styles.margin}>Количество изученных слов за весь период обучения по дням</h5>
        <div className={styles.container}>
          <StatisticsLineChart chartData={allLearnedWords} />
        </div>
        <h5 className={styles.margin}>Увеличение общего количества изученных слов за весь период обучения по дням</h5>
        <div className={styles.container}>
          <StatisticsLineChart chartData={increaseLearnedWords} />
        </div>
      </Container>
    </div>
  );
};

export default Statistics;
