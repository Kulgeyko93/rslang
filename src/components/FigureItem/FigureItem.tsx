import React from 'react';
import Figure from 'react-bootstrap/Figure';

type PropsType = {
  img: string;
  text: string;
  name?: string;
};

const FigureItem = ({ img, text, name }: PropsType): JSX.Element => (
  <Figure>
    {name === '' ? (
      <Figure.Image width="20%" height="auto" alt="преимущество" src={img} />
    ) : (
      <Figure.Image width="100%" height="auto" alt="разработчик" src={img} />
    )}
    <Figure.Caption>{name}</Figure.Caption>
    <Figure.Caption>{text}</Figure.Caption>
  </Figure>
);

FigureItem.defaultProps = {
  name: '',
};

export default FigureItem;
