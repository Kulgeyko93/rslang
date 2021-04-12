import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import closeImg from '../../assets/icons/close.svg';
import { endGame, games } from '../../const/games';
import styles from './endGame.module.css';
import { correctAnswers, currentGame, setInitSettings, wrongAnswers } from '../../features/game/gameSlice';
import GameResults from '../GameResults/GameResults';
import { getDayAndMonth } from '../../utils/getDayAndMonth';
import { STORAGE_KEYS } from '../../constants';
import { getUniqueArray } from '../../utils/getUniqueArray';
import { Data, DataItem } from '../../features/statistics/statisticsSlice';

type PropsType = {
  color: string;
};

const EndGame = ({ color }: PropsType): JSX.Element => {
  const dispatch = useDispatch();
  const wrongAnswersArray = useSelector(wrongAnswers);
  const correctAnswersArray = useSelector(correctAnswers);
  const currentGameNameEng = useSelector(currentGame);
  const learnedWords = ['ahead', 'top', 'end', 'spring', 'hello'];
  const isGameOpenFromTextBook = true;
  const [isShowResult, setIsShowResult] = React.useState(false);

  React.useEffect(() => {
    if (isGameOpenFromTextBook) {
      // переводим имя игры на русский
      const currentGameName = games.reduce((res, game) => {
        if (game.name === currentGameNameEng) {
          // eslint-disable-next-line no-param-reassign
          res = game.nameRU;
        }
        return res;
      }, '');
      const today = getDayAndMonth();
      // сначала надо сформировать массив данных для хранения в localStorage
      const gameData = {
        name: currentGameName,
        words: learnedWords,
        countCorrectAnswers: correctAnswersArray.length,
        longestSeriesCorrectAnswers: correctAnswersArray.length,
      };

      const serializedStatistics = localStorage.getItem(STORAGE_KEYS.STATISTICS);

      if (serializedStatistics) {
        try {
          const statistics: Data = JSON.parse(serializedStatistics);
          if (statistics.date === today) {
            // то надо добавить результаты игры
            // проверим, есть ли уже такая игра в localStorage
            const game = statistics.data.filter((item: DataItem) => item.name === currentGameName)[0];

            if (game) {
              // если такая игра есть
              // добавляем изученные слова, если они отличаются
              const allThisGameLearnedWords = getUniqueArray([...game.words, ...learnedWords]);
              // проверяем, какая серия правильных ответов длиннее
              // eslint-disable-next-line max-len
              const longest =
                game.longestSeriesCorrectAnswers > gameData.longestSeriesCorrectAnswers
                  ? game.longestSeriesCorrectAnswers
                  : gameData.longestSeriesCorrectAnswers;
              // складываем количество правильных ответов
              const countAllCorrectAnswers = game.countCorrectAnswers + gameData.countCorrectAnswers;
              // объект с текущими данными
              const newGameData = {
                name: currentGameName,
                words: allThisGameLearnedWords,
                countCorrectAnswers: countAllCorrectAnswers,
                longestSeriesCorrectAnswers: longest,
              };
              // заменим в статистике game на newGameData
              statistics.data = statistics.data.map((item: DataItem) => {
                if (item.name === game.name) {
                  return newGameData;
                }
                return item;
              });
            } else {
              // если такой игры нет, то добавляем ее в конец массива
              statistics.data.push(gameData);
            }
            // добавляем данные в localStorage
            localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
          } else {
            // если прошедший день, то удаляем данные
            localStorage.removeItem(STORAGE_KEYS.STATISTICS);
          }
        } catch (e) {
          /* eslint-disable-next-line no-console */
          console.error(e);
        }
      } else {
        // если STATISTICS нет, то добавляем данные в localStorage
        const data = {
          date: today,
          data: [gameData],
        };
        localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(data));
      }
    }
  }, []);

  const onResultBtnClick = () => {
    setIsShowResult(true);
  };

  const onCloseBtnClick = () => {
    dispatch(setInitSettings());
  };
  return (
    <>
      {!isShowResult && (
        <Container fluid className={styles[color]}>
          <Container className={styles.container}>
            <Row>
              <Col>
                <div className={styles.img} onClick={onCloseBtnClick} role="button" tabIndex={0}>
                  <Image width="10" height="auto" src={closeImg} fluid />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{wrongAnswersArray.length === 0 ? endGame.messageIfNoErrors : endGame.messageIfErrors}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  правильно: {correctAnswersArray.length}, ошибок: {wrongAnswersArray.length}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={onResultBtnClick} variant="outline-dark">
                  Результаты игры
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
      {isShowResult && <GameResults correctAnswersArray={correctAnswersArray} wrongAnswersArray={wrongAnswersArray} />}
    </>
  );
};

export default EndGame;
