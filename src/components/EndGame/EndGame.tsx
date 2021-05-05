import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import closeImg from '../../assets/icons/close.svg';
import { endGame, games } from '../../constants/games';
import styles from './endGame.module.css';
import {
  correctAnswers,
  currentGame,
  gameLearnedWords,
  isGameOpenFromTextBook,
  setInitSettings,
  wrongAnswers,
  setInitSettingsFromBook,
} from '../../features/game/gameSlice';
import GameResults from '../GameResults/GameResults';
import { getDayAndMonth } from '../../utils/getDayAndMonth';
import { getUniqueArray } from '../../utils/getUniqueArray';
import { Data, DataItem } from '../../features/statistics/statisticsSlice';
import { Status, StorageKey } from '../../types';
import { selectAuthData, selectAuthStatus } from '../../features/auth/authSlice';

type PropsType = {
  color: string;
};

const EndGame = ({ color }: PropsType): JSX.Element => {
  const [isDataPutInLocalStorage, setIsDataPutInLocalStorage] = React.useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);
  const authStatus = useSelector(selectAuthStatus);
  const wrongAnswersArr = useSelector(wrongAnswers);
  const correctAnswersArr = useSelector(correctAnswers);
  const currentGameNameEng = useSelector(currentGame);
  const learnedWordsFromGame = useSelector(gameLearnedWords);
  // const learnedWordsFromGame = ['ahead', 'top', 'end', 'spring', 'hello', 'yes'];
  // const isGameOpenFromBook = true;
  const isGameOpenFromBook = useSelector(isGameOpenFromTextBook);
  const [isShowResult, setIsShowResult] = React.useState(false);

  React.useEffect(() => {
    if (isGameOpenFromBook) {
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
        words: learnedWordsFromGame,
        countCorrectAnswers: correctAnswersArr.length,
        longestSeriesCorrectAnswers: correctAnswersArr.length,
      };

      const serializedStatistics = localStorage.getItem(StorageKey.Statistics);

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
              const allThisGameLearnedWords = getUniqueArray([...game.words, ...learnedWordsFromGame]);
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
            localStorage.setItem(StorageKey.Statistics, JSON.stringify(statistics));
            setIsDataPutInLocalStorage(true);
          } else {
            // если прошедший день, то удаляем данные
            localStorage.removeItem(StorageKey.Statistics);
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
        localStorage.setItem(StorageKey.Statistics, JSON.stringify(data));
        setIsDataPutInLocalStorage(true);
      }
    }
  }, []);

  React.useEffect(() => {
    if (isGameOpenFromBook && authStatus === Status.Authorized && authData && isDataPutInLocalStorage) {
      const today = getDayAndMonth();
      const serializedStatistics = localStorage.getItem(StorageKey.Statistics);
      setIsDataPutInLocalStorage(false);
      if (serializedStatistics) {
        try {
          const statistics: Data = JSON.parse(serializedStatistics);
          if (statistics.date === today) {
            // надо отправить данные в базу данных
            // достаем из localStorage все выученные в играх слова
            const allLearnedWords = statistics.data.map((item) => item.words).flat();
            // получаем все уникальные выученные слова
            const learnedWords = getUniqueArray(allLearnedWords);
            // получаем id пользователя
            const { userId } = authData;

            axios
              .get(`/users/${userId}/statistics`)
              .then((response) => {
                if (response.status === 200) {
                  // если есть данные в optional, то используем их, иначе используем пустой объект
                  const oldData = response.data.optional ? response.data.optional.data : {};
                  oldData[today] = learnedWords.length;
                  const newData = {
                    learnedWords: learnedWords.length,
                    optional: {
                      data: oldData,
                    },
                  };
                  // //////////////обнулить данные
                  // const newData = {
                  //   learnedWords: learnedWords.length,
                  //   optional: {},
                  // };
                  // //////////////добавить старые данные
                  // const newData = {
                  //   learnedWords: learnedWords.length,
                  //   optional: {
                  //     data: { '10 апреля': 5, '11 апреля': 15 },
                  //   },
                  // };
                  // //////////////
                  axios
                    .put(`/users/${userId}/statistics`, newData)
                    // eslint-disable-next-line no-console
                    .then((response2) => console.log(response2.data))
                    // eslint-disable-next-line no-console
                    .catch((error) => console.log(error));
                }
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
                const newData = {
                  learnedWords: learnedWords.length,
                  optional: {
                    data: { [today]: learnedWords.length },
                  },
                };
                axios.put(`/users/${userId}/statistics`, newData);
              });
          }
        } catch (e) {
          /* eslint-disable-next-line no-console */
          console.error(e);
        }
      }
    }
  }, [isDataPutInLocalStorage]);

  const onResultBtnClick = () => {
    setIsShowResult(true);
  };

  const onCloseBtnClick = () => {
    if (isGameOpenFromBook) {
      dispatch(setInitSettingsFromBook());
    } else {
      dispatch(setInitSettings());
    }
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
                <p>{wrongAnswersArr.length === 0 ? endGame.messageIfNoErrors : endGame.messageIfErrors}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  правильно: {correctAnswersArr.length}, ошибок: {wrongAnswersArr.length}
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
      {isShowResult && <GameResults color={color} correctAnswers={correctAnswersArr} wrongAnswers={wrongAnswersArr} />}
    </>
  );
};

export default EndGame;
