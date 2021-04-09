import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { GROUP_COLORS } from '../../constants';

export default function Textbook(): JSX.Element {
  const groups = Array.from(Array(6).keys());
  const groupCards = groups.map((i) => {
    const backgroundColor = `rgba(${[...GROUP_COLORS[i], 0.5].join(', ')})`;
    return (
      <NavLink to={`/groups/${i}`} className="group-card" key={i} style={{ backgroundColor }}>
        <h3 className="group-title">Уровень сложности {i}</h3>
        <img className="group-img" alt="group" src={`${process.env.PUBLIC_URL}/img/group${i}.png`} />
      </NavLink>
    );
  });

  return (
    <div className="textbook">
      <h1>Textbook</h1>
      <div className="groups">{groupCards}</div>
    </div>
  );
}
