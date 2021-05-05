import React from 'react';
import Container from 'react-bootstrap/Container';
import dictionaryImg from '../../assets/dictionary.png';
import styles from './dictionary.module.css';
import DictionarySection from '../../components/DictionarySection/DictionarySection';

const Dictionary = (): JSX.Element => (
  <Container fluid>
    <h4>Словарь</h4>
    <img className={styles.dictionaryImg} src={dictionaryImg} alt="Ученики и словарь" />
    <hr className={styles.color} />
    <DictionarySection url="difficult" text="Сложные слова" />
    <hr className={styles.color} />
    <DictionarySection url="deleted" text="Удалённые слова" />
  </Container>
);

export default Dictionary;
