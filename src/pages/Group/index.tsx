import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { VolumeUpFill, ExclamationTriangle, X } from 'react-bootstrap-icons';
import './style.scss';
import { Status, Word } from '../../types';
import { useRequest } from '../../hooks';
import { sound } from '../../utils/sound';
import { volume } from '../../const/games';

interface MatchParams {
  groupId: string;
}

type Props = RouteComponentProps<MatchParams>;

async function fetchWords({ group = 0, page = 0 }: { group?: number; page?: number }) {
  const response = await axios.get('/words', {
    params: {
      group,
      page,
    },
  });
  return response.data;
}

export default function Group(props: Props): JSX.Element {
  const { match } = props;
  const { groupId } = match.params;
  const boundedFetchWords = fetchWords.bind(null, { group: Number(groupId), page: 0 });
  const { status, data, error } = useRequest<Word[]>(boundedFetchWords);

  let content = null;
  switch (status) {
    case Status.Idle:
    case Status.Loading: {
      content = 'Загрузка';
      break;
    }

    case Status.Succeeded: {
      if (data) {
        const cardElements = data.reduce((wordsAcc: JSX.Element[], wordData) => {
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
          const currentCard = (
            <Card key={`${id}`}>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <Card.Img src={`${process.env.REACT_APP_BASE_URL}/${image}`} />
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <Button
                            variant="light"
                            onClick={() => {
                              const soundUrl = `${process.env.REACT_APP_BASE_URL}/${audio}`;
                              sound.playSound(soundUrl, volume);
                            }}
                          >
                            <VolumeUpFill size={20} />
                          </Button>
                        </Col>
                        <Col>
                          <Button variant="light">
                            <ExclamationTriangle size={20} color="#ff0303" />
                          </Button>
                        </Col>
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
                        <Button
                          variant="light"
                          onClick={() => {
                            const soundUrl = `${process.env.REACT_APP_BASE_URL}/${audioMeaning}`;
                            sound.playSound(soundUrl, volume);
                          }}
                        >
                          <VolumeUpFill size={16} />
                        </Button>
                        &nbsp;
                        <strong dangerouslySetInnerHTML={{ __html: textMeaning }} />
                      </p>
                      <p>→ {textMeaningTranslate}</p>
                      <p>
                        <Button
                          variant="light"
                          onClick={() => {
                            const soundUrl = `${process.env.REACT_APP_BASE_URL}/${audioExample}`;
                            sound.playSound(soundUrl, volume);
                          }}
                        >
                          <VolumeUpFill size={16} />
                        </Button>
                        &nbsp;
                        <strong dangerouslySetInnerHTML={{ __html: textExample }} />
                      </p>
                      <p>→ {textExampleTranslate}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button variant="outline-danger">
                        <ExclamationTriangle />
                        &nbsp; Сложные слова
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="outline-dark">
                        <X size={20} />
                        &nbsp; Удаленные слова
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          );
          return [...wordsAcc, currentCard];
        }, []);
        content = <div className="cards">{cardElements}</div>;
      }
      break;
    }

    case Status.Failed: {
      if (error) {
        content = <p>Error: {error}</p>;
      }
      break;
    }

    default: {
      throw new Error('Unmatched case');
    }
  }

  return (
    <div className="group-page">
      <h3>Уровень сложности {groupId}</h3>
      {content}
    </div>
  );
}
