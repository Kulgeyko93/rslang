import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import yesImg from '../../assets/icons/yes.svg';
import noImg from '../../assets/icons/no.svg';
import { pushWrongAnswers, pushCorrectAnswers } from '../../features/game/gameSlice';
import { sound } from '../../utils/sound';
import { Word } from '../../types';
import { GAME_ANSWERS_CODES } from '../../constants/games';
import styles from './possibleAnswer.module.css';

const correctSound = 'assets/sounds/correct.mp3';
const wrongSound = 'assets/sounds/wrong.mp3';

type PropsType = {
  currentWord: Word | null;
  word: Word;
  index: number;
  isShowAnswer: boolean;
  setIsShowAnswer: (isShowAnswer: boolean) => void;
  isNewGroupWords: boolean;
  setIsNewGroupWords: (isNewGroupWords: boolean) => void;
  isFirstClick: boolean;
  setIsFirstClick: (isFirstClick: boolean) => void;
  soundVolume: number;
  pressedKeyboardKey: string;
  gameCheck?: string;
};

const PossibleAnswer = ({
  currentWord,
  word,
  index,
  isShowAnswer,
  setIsShowAnswer,
  isNewGroupWords,
  setIsNewGroupWords,
  isFirstClick,
  setIsFirstClick,
  soundVolume,
  pressedKeyboardKey,
  gameCheck,
}: PropsType): JSX.Element => {
  const dispatch = useDispatch();
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = React.useState(false);

  React.useEffect(() => {
    if (isNewGroupWords) {
      setIsCorrectAnswer(false);
      setIsWrongAnswer(false);
    }
  }, [isNewGroupWords]);

  const onSomeWordClick = () => {
    if (currentWord && isFirstClick) {
      setIsNewGroupWords(false);
      setIsShowAnswer(true);
      setIsFirstClick(false);
      if (word.word === currentWord.word) {
        setIsCorrectAnswer(true);
        sound.playSound(correctSound, soundVolume);
        dispatch(pushCorrectAnswers(currentWord));
      } else {
        setIsWrongAnswer(true);
        sound.playSound(wrongSound, soundVolume);
        dispatch(pushWrongAnswers(currentWord));
      }
    }
  };

  React.useEffect(() => {
    if (!isShowAnswer && GAME_ANSWERS_CODES.includes(pressedKeyboardKey) && +pressedKeyboardKey === index + 1) {
      onSomeWordClick();
    }
  }, [pressedKeyboardKey]);

  return (
    <div className={styles.word}>
      <span
        className={`${styles.button} ${
          currentWord && isShowAnswer && word.word === currentWord.word ? styles.text : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={onSomeWordClick}
      >
        {!isNewGroupWords && isShowAnswer && isWrongAnswer && <Image width="10" height="auto" src={noImg} />}
        {!isNewGroupWords && isShowAnswer && isCorrectAnswer && <Image width="20" height="auto" src={yesImg} />}
        {gameCheck === 'ourGame' ? (
          <>
            <span className={styles.color}>{index + 1}</span> {word.word}
          </>
        ) : (
          <>
            <span className={styles.color}>{index + 1}</span> {word.wordTranslate}
          </>
        )}
        {/* <span className={styles.color}>{index + 1}</span> {word.wordTranslate} */}
      </span>
    </div>
  );
};

export default PossibleAnswer;

PossibleAnswer.defaultProps = {
  gameCheck: '',
};
