import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { GROUP_COLORS } from '../../constants';
import styles from './dictionarySection.module.css';

type PropsType = {
  url: string;
  text: string;
};

const DictionarySection = ({ url, text }: PropsType): JSX.Element => {
  const groups = Array.from(Array(6).keys());
  const groupCards = groups.map((i) => {
    const backgroundColor = `rgba(${[...GROUP_COLORS[i], 0.5].join(', ')})`;
    return (
      <NavLink to={`/dictionary/${url}/groups/${i}`} className={styles.groupCard} key={i} style={{ backgroundColor }}>
        <h3 className={styles.groupTitle}>Уровень сложности {i}</h3>
      </NavLink>
    );
  });

  return (
    <div>
      <h5 className={styles.margin}>{text}</h5>
      <Container>
        <div className={styles.groups}>{groupCards}</div>
      </Container>
    </div>
  );
};

export default DictionarySection;
