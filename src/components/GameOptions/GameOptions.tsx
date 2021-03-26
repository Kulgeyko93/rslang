import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './GameOptions.module.css';

const GameOptions = (): JSX.Element => {
  const [level, setLevel] = React.useState('1');

  const options = [0, 1, 2, 3, 4, 5];

  const handlerOnChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel(event.target.value as string);
    console.log(event.target.value);
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
            {options &&
              options.map((item, index) => (
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
