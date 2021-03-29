import React from 'react';
import Image from 'react-bootstrap/Image';
import volumeImg from '../../assets/icons/volume.svg';
import { volume } from '../../const/games';
import { Word } from '../../types';
import { sound } from '../../utils/sound';
import styles from './AudioCallResultsItem.module.css';

type PropsType = {
  answer: Word;
};

const AudioCallResultsItem = ({ answer }: PropsType): JSX.Element => {
  const onSoundImgClick = () => {
    const soundUrl = `${process.env.REACT_APP_BASE_URL}/${answer.audio}`;
    sound.playSound(soundUrl, volume);
  };

  return (
    <div className={styles.word}>
      <Image className={styles.img} width="20" height="auto" src={volumeImg} onClick={onSoundImgClick} />
      <p className={styles.bold}>{answer.word}</p>
      <p className={styles.margin}>{answer.wordTranslate}</p>
    </div>
  );
};

export default AudioCallResultsItem;
