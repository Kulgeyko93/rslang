import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ExclamationTriangle, X } from 'react-bootstrap-icons';
import axios from 'axios';
import { Difficulty, UserWord } from '../../../types';

interface Props {
  userId: string;
  wordId: string;
  userWord: UserWord | undefined;
}

async function createUserWord({ userId, wordId, userWord }: { userId: string; wordId: string; userWord: UserWord }) {
  const response = await axios.post(`users/${userId}/words/${wordId}`, userWord);
  return response.data;
}

async function updateUserWord({ userId, wordId, userWord }: { userId: string; wordId: string; userWord: UserWord }) {
  const response = await axios.put(`users/${userId}/words/${wordId}`, userWord);
  return response.data;
}

export default function WordControls(props: Props): JSX.Element {
  const { userId, wordId, userWord } = props;
  return (
    <Row>
      <Col>
        <Button
          variant="outline-danger"
          onClick={async () => {
            if (userWord) {
              const newUserWord = { ...userWord, difficulty: Difficulty.Hard };
              await updateUserWord({ userId, wordId, userWord: newUserWord });
            } else {
              const newUserWord = { difficulty: Difficulty.Hard };
              await createUserWord({ userId, wordId, userWord: newUserWord });
            }
          }}
        >
          <ExclamationTriangle />
          &nbsp; Сложные слова
        </Button>
      </Col>
      <Col>
        <Button
          variant="outline-dark"
          onClick={async () => {
            if (userWord) {
              const newUserWord = { ...userWord, optional: { isDeleted: true } };
              await updateUserWord({ userId, wordId, userWord: newUserWord });
            } else {
              const newUserWord = { optional: { isDeleted: true } };
              await createUserWord({ userId, wordId, userWord: newUserWord });
            }
          }}
        >
          <X size={20} />
          &nbsp; Удаленные слова
        </Button>
      </Col>
    </Row>
  );
}
