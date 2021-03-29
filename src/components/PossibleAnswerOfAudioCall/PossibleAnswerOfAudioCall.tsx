import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import yesImg from '../../assets/icons/yes.svg';
import noImg from '../../assets/icons/no.svg';
import styles from './PossibleAnswerOfAudioCall.module.css';
import { pushWrongAnswers, pushCorrectAnswers } from '../../features/audiocall/audiocallSlice';
import { sound } from '../../utils/sound';
import { Word } from '../../types';

const correctSound = 'assets/sounds/correct.mp3';
const wrongSound = 'assets/sounds/wrong.mp3';

type PropsType = {
  currentWord: Word | null;
  word: Word;
  index: number;
  isShowAnswer: boolean;
  setIsShowAnswer: any;
  isNewGame: boolean;
  setIsNewGame: any;
  isFirstClick: boolean;
  setIsFirstClick: any;
  soundVolume: number;
};

const PossibleAnswerOfAudioCall = ({
  currentWord,
  word,
  index,
  isShowAnswer,
  setIsShowAnswer,
  isNewGame,
  setIsNewGame,
  isFirstClick,
  setIsFirstClick,
  soundVolume,
}: PropsType): JSX.Element => {
  const dispatch = useDispatch();

  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = React.useState(false);

  const onSomeWordClick = () => {
    if (currentWord && isFirstClick) {
      if (word.word === currentWord.word) {
        setIsNewGame(false);
        setIsShowAnswer(true);
        setIsCorrectAnswer(true);
        setIsFirstClick(false);
        sound.playSound(correctSound, soundVolume);
        dispatch(pushCorrectAnswers(currentWord));
      } else {
        setIsNewGame(false);
        setIsShowAnswer(true);
        setIsWrongAnswer(true);
        setIsFirstClick(false);
        sound.playSound(wrongSound, soundVolume);
        dispatch(pushWrongAnswers(currentWord));
      }
    }
  };

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
        {!isNewGame && isShowAnswer && isWrongAnswer && <Image width="10" height="auto" src={noImg} />}
        {!isNewGame && isShowAnswer && isCorrectAnswer && <Image width="20" height="auto" src={yesImg} />}
        <span className={styles.color}>{index + 1}</span> {word.wordTranslate}
      </span>
    </div>
  );
};

export default PossibleAnswerOfAudioCall;
