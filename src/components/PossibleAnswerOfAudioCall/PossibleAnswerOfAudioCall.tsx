import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import yesImg from '../../assets/icons/yes.svg';
import noImg from '../../assets/icons/no.svg';
import styles from './PossibleAnswerOfAudioCall.module.css';
import { pushWrongAnswers, pushCorrectAnswers } from '../../features/audioCall/audioCallSlice';
import { sound } from '../../utils/sound';
import { volume } from '../../const/games';
import { Word } from '../../features/types';

const correctSound = 'assets/sounds/correct.mp3';
const wrongSound = 'assets/sounds/wrong.mp3';

type PropsType = {
  currentWord: Word | null;
  word: Word;
  index: number;
  isShowAnswer: boolean;
  setIsShowAnswer: any;
};

const PossibleAnswerOfAudioCall = ({
  currentWord,
  word,
  index,
  isShowAnswer,
  setIsShowAnswer,
}: PropsType): JSX.Element => {
  const dispatch = useDispatch();

  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = React.useState(false);

  const onSomeWordClick = () => {
    if (currentWord) {
      if (word.word === currentWord.word) {
        setIsShowAnswer(true);
        setIsCorrectAnswer(true);
        sound.playSound(correctSound, volume);
        dispatch(pushCorrectAnswers(currentWord));
      } else {
        setIsShowAnswer(true);
        setIsWrongAnswer(true);
        sound.playSound(wrongSound, volume);
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
        {isWrongAnswer && <Image width="10" height="auto" src={noImg} />}
        {isCorrectAnswer && <Image width="20" height="auto" src={yesImg} />}
        <span className={styles.color}>{index + 1}</span> {word.wordTranslate}
      </span>
    </div>
  );
};

export default PossibleAnswerOfAudioCall;
