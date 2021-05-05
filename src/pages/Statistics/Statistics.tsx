import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import statisticsImg from '../../assets/statistics.png';
import styles from './statistics.module.css';
import StatisticsBarChart from '../../components/StatisticsBarChart/StatisticsBarChart';
import StatisticsLineChart from '../../components/StatisticsLineChart/StatisticsLineChart';
import { getDayAndMonth } from '../../utils/getDayAndMonth';
import {
  learnedWords,
  setStatistics,
  correctAnswers,
  seriesAnswers,
  isLoading,
  fetchStatistics,
  wordsPerDayArr,
  increaseWordsPerDayArr,
} from '../../features/statistics/statisticsSlice';
import { Status, StorageKey } from '../../types';
import { selectAuthData, selectAuthStatus } from '../../features/auth/authSlice';
import InlineSpinner from '../../components/InlineSpinner';

const Statistics = (): JSX.Element => {
  const authData = useSelector(selectAuthData);
  const authStatus = useSelector(selectAuthStatus);
  const learnedWordsData = useSelector(learnedWords);
  const correctAnswersData = useSelector(correctAnswers);
  const seriesCorrectAnswersData = useSelector(seriesAnswers);
  const isDataLoading = useSelector(isLoading);
  const allLearnedWords = useSelector(wordsPerDayArr);
  const increaseLearnedWords = useSelector(increaseWordsPerDayArr);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const today = getDayAndMonth();
    const serializedStatistics = localStorage.getItem(StorageKey.Statistics);
    if (serializedStatistics) {
      try {
        const statistics = JSON.parse(serializedStatistics);
        if (statistics.date === today) {
          dispatch(setStatistics(statistics));
        } else {
          localStorage.removeItem(StorageKey.Statistics);
        }
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
      }
    }
  }, []);

  React.useEffect(() => {
    if (authStatus === Status.Authorized && authData) {
      const { userId } = authData;
      dispatch(fetchStatistics(userId));
    }
  }, [authStatus]);

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
          <>
            <h5 className={styles.margin}>Пока не сыграешь в игру, статистика не отобразится :). </h5>
            <h5>PS: Статистика ведётся, только если игра была открыта из учебника. </h5>
            <h5>PSS: Долгосрочную статистику могут видеть только зарегистрированные пользователи. </h5>
          </>
        )}
        {!isDataLoading && (
          <>
            {allLearnedWords.length > 0 && (
              <>
                <hr className={styles.color} />
                <h5 className={styles.margin}>Количество изученных слов за весь период обучения по дням</h5>
                <div className={styles.container}>
                  <StatisticsLineChart chartData={allLearnedWords} />
                </div>
              </>
            )}
            {increaseLearnedWords.length > 0 && (
              <>
                <h5 className={styles.margin}>
                  Увеличение общего количества изученных слов за весь период обучения по дням
                </h5>
                <div className={styles.container}>
                  <StatisticsLineChart chartData={increaseLearnedWords} />
                </div>
              </>
            )}
          </>
        )}
        {isDataLoading && <InlineSpinner size=".8rem" />}
      </Container>
    </div>
  );
};

export default Statistics;
