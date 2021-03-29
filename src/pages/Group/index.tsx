import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import './style.scss';
import { Status, Word } from '../../types';
import { useRequest } from '../../hooks';

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
      content = 'Loading';
      break;
    }

    case Status.Succeeded: {
      if (data) {
        const wordFields = data.reduce((wordsAcc: JSX.Element[], wordData) => {
          const { id, image } = wordData;
          return [
            ...wordsAcc,
            <hr key={`${id}j`} />,
            <Card key={`${id}`} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={`${process.env.REACT_APP_BASE_URL}/${image}`} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the cards content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>,
            <pre key={`${id}k`}>{JSON.stringify(wordData, null, 2)}</pre>,
          ];
        }, []);
        content = <div style={{ textAlign: 'left' }}>{wordFields}</div>;
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
