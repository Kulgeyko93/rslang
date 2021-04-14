/* eslint-disable react/no-danger */
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import SoundButton from './SoundButton';
import WordControls from './WordControls';
import { DictionaryType, Difficulty, UserWord, Word } from '../../../types';
import { selectSettingsData } from '../../../features/settings/settingsSlice';

interface Props {
  wordData: Word;
  userWord: UserWord | undefined;
  userId: string | undefined;
  addHardWordLabel: () => void;
  deleteWordFromList: () => void;
  dictionaryType: DictionaryType | undefined;
}

export default function WordCard(props: Props): JSX.Element {
  const settingsData = useSelector(selectSettingsData);
  const { showTranslations = true, showControls = true } = settingsData?.optional || {};
  const { wordData, userWord, userId, addHardWordLabel, deleteWordFromList, dictionaryType } = props;
  const {
    id,
    image,
    word,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    audio,
    audioMeaning,
    audioExample,
  } = wordData;

  const difficultWordlabel =
    userWord && userWord.difficulty === Difficulty.Hard ? (
      <Button variant="light">
        <ExclamationTriangle size={20} color="#ff0303" />
      </Button>
    ) : null;

  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Card.Img src={`${process.env.REACT_APP_BASE_URL}/${image}`} />
            </Col>
            <Col>
              <Row>
                <Col>
                  <SoundButton iconSize={20} soundPath={audio} />
                </Col>
                <Col>{difficultWordlabel}</Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    <strong>{word}</strong>
                  </p>
                  <p>{transcription}</p>
                  {showTranslations ? <p>{wordTranslate}</p> : null}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="middle">
            <Col>
              <p>
                <SoundButton iconSize={16} soundPath={audioMeaning} />
                &nbsp;
                <strong dangerouslySetInnerHTML={{ __html: textMeaning }} />
              </p>
              {showTranslations ? <p>→ {textMeaningTranslate}</p> : null}
              <p>
                <SoundButton iconSize={16} soundPath={audioExample} />
                &nbsp;
                <strong dangerouslySetInnerHTML={{ __html: textExample }} />
              </p>
              {showTranslations ? <p>→ {textExampleTranslate}</p> : null}
            </Col>
          </Row>
          {userId && showControls && (
            <WordControls
              userId={userId}
              wordId={id}
              userWord={userWord}
              addHardWordLabel={addHardWordLabel}
              deleteWordFromList={deleteWordFromList}
              dictionaryType={dictionaryType}
            />
          )}
        </Container>
      </Card.Body>
    </Card>
  );
}
