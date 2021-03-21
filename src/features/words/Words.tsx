import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWords, selectWordsStatus, selectWordsData, selectWordsError } from './wordsSlice';
import { Status } from '../types';

export function Words(): JSX.Element {
  const dispatch = useDispatch();
  const wordsStatus = useSelector(selectWordsStatus);
  const wordsData = useSelector(selectWordsData);
  const wordsError = useSelector(selectWordsError);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch, fetchWords]);

  let content = null;
  switch (wordsStatus) {
    case Status.Idle:
    case Status.Loading: {
      content = 'Loading';
      break;
    }

    case Status.Succeeded: {
      if (wordsData) {
        const wordFields = wordsData.reduce(
          (wordsAcc: JSX.Element[], wordData) => [
            ...wordsAcc,
            <hr key={`${wordData.id}j`} />,
            <pre key={wordData.id}>{JSON.stringify(wordData, null, 2)}</pre>,
          ],
          [],
        );
        content = <div style={{ textAlign: 'left' }}>{wordFields}</div>;
      }
      break;
    }

    case Status.Failed: {
      if (wordsError) {
        content = <p>Error: {wordsError}</p>;
      }
      break;
    }

    default: {
      throw new Error('Unmatched case');
    }
  }

  return <div>{content}</div>;
}
