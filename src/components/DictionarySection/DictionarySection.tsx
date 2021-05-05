import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { COLORS } from '../../constants/textbook';

import './dictionarySection.scss';

type PropsType = {
  url: string;
  text: string;
};

const DictionarySection = ({ url, text }: PropsType): JSX.Element => {
  const groupCards = COLORS.map((color, index) => (
    <NavLink to={`/dictionary/${url}/groups/${index}`} className={color} key={color}>
      <h3 className="groupTitle">Уровень сложности {index}</h3>
    </NavLink>
  ));

  return (
    <div>
      <h5 className="margin">{text}</h5>
      <Container>
        <div className="groups">{groupCards}</div>
      </Container>
    </div>
  );
};

export default DictionarySection;
