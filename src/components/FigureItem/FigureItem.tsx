import React from 'react';
import Figure from 'react-bootstrap/Figure';
import styles from './FigureItem.module.css';

type PropsType = {
  img: string;
  text: string;
  name?: string;
};

const FigureItem = ({ img, text, name }: PropsType): JSX.Element => (
  <Figure>
    {name === '' ? (
      <Figure.Image width="21%" height="auto" alt="преимущество" src={img} />
    ) : (
      <Figure.Image width="100%" height="auto" alt="разработчик" src={img} />
    )}
    <Figure.Caption className={styles.text}>{name}</Figure.Caption>
    <Figure.Caption className={styles.text}>{text}</Figure.Caption>
  </Figure>
);

FigureItem.defaultProps = {
  name: '',
};

export default FigureItem;
