import React from 'react';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../constants/textbook';

import './style.scss';

export default function Textbook(): JSX.Element {
  const groupCards = COLORS.map((color, index) => (
    <NavLink to={`/groups/${index}`} className={color} key={color}>
      <h6 className="group-title">Уровень сложности {index}</h6>
      <img className="group-img" alt="group" src={`${process.env.PUBLIC_URL}/img/group${index}.png`} />
    </NavLink>
  ));

  return (
    <div className="textbook">
      <h4 className="title">Учебник</h4>
      <div className="groups">{groupCards}</div>
    </div>
  );
}
