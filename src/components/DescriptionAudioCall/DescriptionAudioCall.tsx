import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import keyboardImg from '../../assets/icons/keyboard.svg';
import styles from './descriptionAudioCall.module.css';

const DescriptionAudioCall = (): JSX.Element => (
  <Container fluid className={styles.container}>
    <p>
      Чтобы управлять игрой с клавиатуры, сначала кликни по иконке
      <span className={styles.img}>
        <Image width="20" height="auto" src={keyboardImg} />
      </span>
      в меню.
    </p>
    <p>Чтобы выбрать нужный ответ, нажми соответствующую клавишу на цифровой клавиатуре.</p>
    <p>Аналог клика по кнопке &quot;Не знаю&quot; — клавиша &quot;Enter&quot;.</p>
    <p>Аналог клика по кнопке &quot;Далее&quot; — клавиша-стрелка вправо.</p>
    <p>Чтобы вызвать произношение слова, нажми клавишу &quot;+&quot; на цифровой клавиатуре.</p>
    <p>После 5 неправильных ответов игра заканчивается.</p>
  </Container>
);

export default DescriptionAudioCall;
