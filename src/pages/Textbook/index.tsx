import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { GROUP_COLORS } from '../../constants';
import getColorFromRgbArray from '../../utils/getColorFromRgbArray';

export default function Textbook(): JSX.Element {
  const groups = Array.from(Array(6).keys());
  const groupCards = groups.map((i) => {
    const backgroundColor = getColorFromRgbArray(GROUP_COLORS[i]);
    return (
      <NavLink to={`/groups/${i}`} className="group-card" key={i} style={{ backgroundColor }}>
        <h3 className="group-title">Уровень сложности {i}</h3>
        <img className="group-img" alt="group" src={`${process.env.PUBLIC_URL}/img/group${i}.png`} />
      </NavLink>
    );
  });

  return (
    <div className="textbook">
      <div className="groups">{groupCards}</div>
    </div>
  );
}
