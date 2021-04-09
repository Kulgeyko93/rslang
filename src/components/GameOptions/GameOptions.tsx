import React from 'react';
import Form from 'react-bootstrap/Form';
import { groups } from '../../const/games';
import styles from './GameOptions.module.css';

const select = {
  backgroundColor: 'transparent',
  borderColor: '#000',
  cursor: 'pointer',
  boxShadow: 'none',
  outline: 'none',
};

const option = {
  backgroundColor: 'rgba(253, 253, 255, 0.4)',
};

type PropsType = {
  gameName: string;
};

const GameOptions = ({ gameName }: PropsType): JSX.Element => {
  const [level, setLevel] = React.useState(groups[0]);

  React.useEffect(() => {
    if (window.localStorage.getItem(gameName) !== null) {
      const newValue = window.localStorage.getItem(gameName);
      if (newValue !== null) {
        setLevel(newValue);
      }
    } else {
      window.localStorage.setItem(gameName, level);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(gameName, level);
  }, [gameName, level]);

  const handlerOnChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel(event.target.value as string);
  };

  return (
    <div className={styles.container}>
      <Form style={select}>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Control value={level} onChange={handlerOnChange} size="sm" style={select} as="select" custom>
            {groups &&
              groups.map((item, index) => (
                <option style={option} key={item} value={index}>
                  Уровень сложности {index}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default GameOptions;
