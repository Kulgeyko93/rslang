import React from 'react';
import { UserAggregatedWord, Word } from '../../../types';
import { AuthState } from '../../../features/auth/authSlice';
import WordCard from './WordCard';

interface Props {
  wordsData: Word[];
  userAggregatedWordsData: UserAggregatedWord[] | null;
  authData: AuthState['data'];
}

export default function WordCards(props: Props): JSX.Element {
  const { wordsData, userAggregatedWordsData, authData } = props;
  const cardElements = wordsData.reduce((wordsAcc: JSX.Element[], wordData) => {
    const wordId = wordData.id;
    const userWord = userAggregatedWordsData?.find(
      (userAggregatedWord: UserAggregatedWord) => userAggregatedWord._id === wordId,
    )?.userWord;
    if (userWord?.optional?.isDeleted) {
      return wordsAcc;
    }

    const currentWordCard = (
      <WordCard key={`${wordId}`} wordData={wordData} userWord={userWord} userId={authData?.userId} />
    );
    return [...wordsAcc, currentWordCard];
  }, []);
  return <div className="cards">{cardElements}</div>;
}
