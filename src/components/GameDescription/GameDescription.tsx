import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './gameDescription.module.css';

const GameDescription = (): JSX.Element => (
  <Container fluid className={styles.container}>
    <p>Чтобы играть с клавиатуры, кликни в любую точку поля игры.</p>
    <p>Чтобы выбрать нужный ответ, нажми соответствующую клавишу на цифровой клавиатуре.</p>
    <p>Клавиша &quot;Enter&quot; — аналог клика по кнопке &quot;Не знаю&quot;.</p>
    <p>Клавиша-стрелка вправо — аналог клика по кнопке &quot;Далее&quot;.</p>
    <p>Клавиша &quot;+&quot; на цифровой клавиатуре — чтобы услышать слово.</p>
    <p>После 5 неправильных ответов игра закончится.</p>
  </Container>
);

export default GameDescription;
