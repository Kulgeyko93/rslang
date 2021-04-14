import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Button, Form, Image, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import InlineSpinner from '../../InlineSpinner';

enum FieldName {
  Username = 'username',
  Email = 'email',
  Password = 'password',
  PasswordConfirm = 'password_confirm',
  Photo = 'photo',
}

interface SubmittedData {
  email: string;
  photo_url: string;
}

interface Props {
  openLogin: () => void;
}

export default function RegisterForm(props: Props): JSX.Element {
  const { openLogin } = props;
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [submittable, setSubmittable] = useState(true);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    const photoField = form[FieldName.Photo];
    if (photoField.files.length) {
      try {
        setSubmittable(false);
        const hasEmpty = Object.values(FieldName).some((key) => key !== FieldName.Photo && form[key].value.length < 1);
        if (!hasEmpty) {
          if (form[FieldName.Password].value !== form[FieldName.PasswordConfirm].value) {
            // eslint-disable-next-line no-alert
            window.alert('Пароли не соответствуют');
            return;
          }
          const uploadFile = photoField.files[0];
          const formData = new FormData();
          formData.append('file', uploadFile);
          const photoRes = await axios.post('/upload', formData);
          const { path } = photoRes.data;
          const registerRes = await axios.post('/users', {
            ...Object.values(FieldName).reduce((acc, fieldName) => {
              if (fieldName === FieldName.Photo) {
                return acc;
              }
              return { ...acc, [fieldName]: form[fieldName].value };
            }, {}),
            photo_url: path,
          });
          setSubmittedData(registerRes.data);
        }
      } catch (err) {
        setSubmittedData(null);
      } finally {
        setSubmittable(true);
      }
    }
  }

  useEffect(() => {
    if (submittedData) {
      setTimeout(() => openLogin(), 3000);
    }
  }, [openLogin, submittedData, dispatch]);

  let content;
  if (submittedData) {
    content = (
      <div>
        <h4>
          <Badge variant="success">Зарегистрировано</Badge>
          &nbsp;{submittedData.email}
        </h4>
        <Image src={submittedData.photo_url} rounded />
      </div>
    );
  } else {
    content = (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control required type="text" placeholder="Имя пользователя" name={FieldName.Username} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Адрес электронной почты</Form.Label>
          <Form.Control required type="email" placeholder="vasily@mail.ru" name={FieldName.Email} />
          <Form.Text className="text-muted">Электронный адрес должен быть уникальным в системе</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control required pattern=".{8,}" type="password" placeholder="Пароль" name={FieldName.Password} />
          <Form.Text className="text-muted">Пароль должен содержать не менее 8 символов без пробелов</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control
            required
            pattern=".{8,}"
            type="password"
            placeholder="Повторите пароль"
            name={FieldName.PasswordConfirm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Загрузить аватар</Form.Label>
          <Form.Control required type="file" placeholder="Аватар d" name={FieldName.Photo} />
          <Form.Text className="text-danger">Все поля, включая аватар, обязательны для заполнения</Form.Text>
        </Form.Group>

        <Button disabled={!submittable} variant="primary" type="submit">
          {!submittable && <InlineSpinner />} &nbsp; Зарегистрироваться
        </Button>
      </Form>
    );
  }

  return content;
}
