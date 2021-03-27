import React from 'react';
import Form from 'react-bootstrap/Form';
import { groups } from '../../const/games';
import styles from './GameOptions.module.css';

type PropsType = {
  setLevelAudioCall: any;
  gameName: string;
};

const GameOptions = ({ gameName, setLevelAudioCall }: PropsType): JSX.Element => {
  const [level, setLevel] = React.useState(groups[0]);

  const handlerOnChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel(event.target.value as string);
    if (gameName === 'Аудиовызов') {
      setLevelAudioCall(event.target.value as string);
    }
  };

  return (
    <div className={styles.container}>
      <Form className={styles.outline}>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Control
            value={level}
            onChange={handlerOnChange}
            size="sm"
            className={styles.outline}
            as="select"
            custom
          >
            {groups &&
              groups.map((item, index) => (
                <option className={styles.option} key={item} value={index}>
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
