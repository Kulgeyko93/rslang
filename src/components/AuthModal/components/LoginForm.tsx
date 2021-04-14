import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import InlineSpinner from '../../InlineSpinner';
import { setAuthData } from '../../../features/auth/authSlice';

enum FieldName {
  Email = 'email',
  Password = 'password',
}

interface Props {
  closeAuthModal: () => void;
}

export default function LoginForm(props: Props): JSX.Element {
  const { closeAuthModal } = props;
  const [isSubmittable, setIsSubmittable] = useState(true);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const hasEmpty = Object.values(FieldName).some((key) => form[key].value.length < 1);
    if (!hasEmpty) {
      try {
        setIsSubmittable(false);
        const loginRes = await axios.post(
          '/signin',
          Object.values(FieldName).reduce((acc, fieldName) => ({ ...acc, [fieldName]: form[fieldName].value }), {}),
        );
        if (!loginRes?.data) {
          throw new Error('Авторизация не удалась');
        }
        dispatch(setAuthData(loginRes.data));
        setIsLoginSuccessful(true);
      } catch (err) {
        // eslint-disable-next-line no-alert
        window.alert(err.message);
        setIsLoginSuccessful(false);
      } finally {
        setIsSubmittable(true);
      }
    }
  }

  useEffect(() => {
    if (isLoginSuccessful) {
      setTimeout(() => {
        closeAuthModal();
      }, 3000);
    }
  }, [closeAuthModal, isLoginSuccessful, dispatch]);

  let content;
  if (isLoginSuccessful) {
    content = (
      <div>
        <Badge variant="success">Авторизован</Badge>
      </div>
    );
  } else {
    content = (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Адрес электронной почты</Form.Label>
          <Form.Control type="text" placeholder="vasily@mail.ru" name={FieldName.Email} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="vasily123" name={FieldName.Password} />
        </Form.Group>
        <Button disabled={!isSubmittable} variant="primary" type="submit">
          {!isSubmittable && <InlineSpinner />}
          &nbsp; Войти
        </Button>
      </Form>
    );
  }

  return content;
}
