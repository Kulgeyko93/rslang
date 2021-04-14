import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ArrowRepeat, ExclamationTriangle, X } from 'react-bootstrap-icons';
import axios from 'axios';
import { DictionaryType, Difficulty, UserWord } from '../../../types';
import InlineSpinner from '../../../components/InlineSpinner';

interface Props {
  userId: string;
  wordId: string;
  userWord: UserWord | undefined;
  addHardWordLabel: () => void;
  deleteWordFromList: () => void;
  dictionaryType: DictionaryType | undefined;
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
  const { userId, wordId, userWord, addHardWordLabel, deleteWordFromList, dictionaryType } = props;
  const [isAddingToHardWords, setIsAddingToHardWords] = useState(false);
  const [isDeletingFromList, setIsDeletingFromList] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const inlineSpinner = <InlineSpinner size=".8rem" />;
  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );
  let controls;
  if (dictionaryType === DictionaryType.Difficult) {
    controls = (
      <Col>
        <Button
          variant="outline-secondary"
          onClick={async () => {
            setIsRestoring(true);
            try {
              if (userWord) {
                const newUserWord = { ...userWord, difficulty: Difficulty.Easy };
                await updateUserWord({ userId, wordId, userWord: newUserWord });
              }
              deleteWordFromList();
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(e);
            } finally {
              setIsRestoring(false);
            }
          }}
          disabled={isRestoring}
        >
          {isRestoring ? inlineSpinner : <ArrowRepeat />}
          &nbsp; Восстановить
        </Button>
      </Col>
    );
  } else if (dictionaryType === DictionaryType.Deleted) {
    controls = (
      <Col>
        <Button
          variant="outline-secondary"
          onClick={async () => {
            setIsRestoring(true);
            try {
              if (userWord) {
                const newUserWord = { ...userWord, optional: { ...userWord.optional, isDeleted: false } };
                await updateUserWord({ userId, wordId, userWord: newUserWord });
              }
              deleteWordFromList();
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(e);
            } finally {
              setIsRestoring(false);
            }
          }}
          disabled={isRestoring}
        >
          {isRestoring ? inlineSpinner : <ArrowRepeat />}
          &nbsp; Восстановить
        </Button>
      </Col>
    );
  } else {
    controls = (
      <>
        <Col>
          <Button
            variant="outline-danger"
            onClick={async () => {
              setIsAddingToHardWords(true);
              try {
                if (userWord) {
                  const newUserWord = { ...userWord, difficulty: Difficulty.Hard };
                  await updateUserWord({ userId, wordId, userWord: newUserWord });
                } else {
                  const newUserWord = { difficulty: Difficulty.Hard };
                  await createUserWord({ userId, wordId, userWord: newUserWord });
                }
                addHardWordLabel();
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
              } finally {
                setIsAddingToHardWords(false);
              }
            }}
            disabled={isAddingToHardWords || isDeletingFromList}
          >
            {isAddingToHardWords ? inlineSpinner : <ExclamationTriangle />}
            &nbsp; Сложные слова
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-dark"
            onClick={async () => {
              setIsDeletingFromList(true);
              try {
                if (userWord) {
                  const newUserWord = { ...userWord, optional: { isDeleted: true } };
                  await updateUserWord({ userId, wordId, userWord: newUserWord });
                } else {
                  const newUserWord = { optional: { isDeleted: true } };
                  await createUserWord({ userId, wordId, userWord: newUserWord });
                }
                if (isMounted.current) {
                  deleteWordFromList();
                }
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
              } finally {
                setIsDeletingFromList(false);
              }
            }}
            disabled={isDeletingFromList || isAddingToHardWords}
          >
            {isDeletingFromList ? inlineSpinner : <X size={20} />}
            &nbsp; Удаленные слова
          </Button>
        </Col>
      </>
    );
  }
  return <Row>{controls}</Row>;
}
