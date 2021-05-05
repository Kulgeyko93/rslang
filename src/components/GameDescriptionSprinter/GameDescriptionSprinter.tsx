import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './gameDescription.module.css';

const GameDescriptionSprinter = (): JSX.Element => (
  <Container fluid className={styles.container}>
    <p>Чтобы выбрать ответ &quot;Верно&quot;, нажми соответствующую клавишу &quot;Enter&quot;.</p>
    <p>Чтобы выбрать ответ &quot;Не верно&quot;, нажми соответствующую клавишу &quot;Space&quot;.</p>
    <p>По истечению слов игра закончится.</p>
  </Container>
);

export default GameDescriptionSprinter;
