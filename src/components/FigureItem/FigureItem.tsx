import React from 'react';
import Figure from 'react-bootstrap/Figure';

type PropsType = {
  img: string;
  text: string;
  name?: string;
};

const textStyle = {
  fontSize: '1rem',
  color: '#000000',
};

const FigureItem = ({ img, text, name }: PropsType): JSX.Element => (
  <Figure>
    {name === '' ? (
      <Figure.Image width="55px" height="55px" alt="преимущество" src={img} />
    ) : (
      <Figure.Image width="100%" height="auto" alt="разработчик" src={img} />
    )}
    <Figure.Caption style={textStyle}>
      <b>{name}</b>
    </Figure.Caption>
    <Figure.Caption style={textStyle}>{text}</Figure.Caption>
  </Figure>
);

FigureItem.defaultProps = {
  name: '',
};

export default FigureItem;
