import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import SoundButton from './SoundButton';
import WordControls from './WordControls';
import { Difficulty, UserWord, Word } from '../../../types';

interface Props {
  wordData: Word;
  userWord: UserWord | undefined;
  userId: string | undefined;
}

export default function WordCard(props: Props): JSX.Element {
  const { wordData, userWord, userId } = props;
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
                  <p>{wordTranslate}</p>
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
              <p>→ {textMeaningTranslate}</p>
              <p>
                <SoundButton iconSize={16} soundPath={audioExample} />
                &nbsp;
                <strong dangerouslySetInnerHTML={{ __html: textExample }} />
              </p>
              <p>→ {textExampleTranslate}</p>
            </Col>
          </Row>
          {userId && <WordControls userId={userId} wordId={id} userWord={userWord} />}
        </Container>
      </Card.Body>
    </Card>
  );
}
