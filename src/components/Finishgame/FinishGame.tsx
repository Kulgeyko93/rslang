import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

type FinishProps = {
  score: number;
};

const FinishGame = ({ score }: FinishProps): JSX.Element => (
  <>
    <div className="finish">
      <div className="score">
        Ваш результат: {score}.
      </div>
    </div>

    <Button variant="success">
      <NavLink to="/">На главную станицу</NavLink>
    </Button>

  </>

);

export default FinishGame;
