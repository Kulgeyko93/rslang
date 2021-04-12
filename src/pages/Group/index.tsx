import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import { Status, StorageKey, UserAggregatedWord, Word } from '../../types';
import { usePagination, useRequest } from '../../hooks';
import { selectAuthData, selectAuthStatus } from '../../features/auth/authSlice';
import WordCard from './components/WordCard';
import Pagination from './components/Pagination';

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

async function fetchUserAggregatedWords({
  group = 0,
  page = 0,
  userId,
}: {
  group?: number;
  page?: number;
  userId: string;
}) {
  const response = await axios.get(`/users/${userId}/aggregatedWords`, {
    params: {
      group,
      page,
      wordsPerPage: 20,
    },
  });
  return response.data;
}

export default function Group(props: Props): JSX.Element {
  const { match } = props;
  const { groupId } = match.params;
  const authData = useSelector(selectAuthData);
  const authStatus = useSelector(selectAuthStatus);

  const { currentPage, openPreviousPage, openNextPage } = usePagination({
    pageCount: 30,
    storageKey: StorageKey.GroupPageIndex,
  });

  const boundedFetchWords = fetchWords.bind(null, { group: Number(groupId), page: currentPage });
  const { status: wordsStatus, data: wordsData, error: wordsError } = useRequest<Word[]>(boundedFetchWords, [
    currentPage,
  ]);

  const boundedFetchUserAggregatedWords = async () => {
    if (authStatus === Status.Authorized && authData) {
      const response = await fetchUserAggregatedWords({ group: Number(groupId), page: 0, userId: authData.userId });
      return response[0].paginatedResults;
    }
    return null;
  };
  const {
    status: userAggregatedWordsStatus,
    data: userAggregatedWordsData,
    error: userAggregatedWordsError,
  } = useRequest<UserAggregatedWord[]>(boundedFetchUserAggregatedWords, [authStatus]);

  const entityStatuses = [wordsStatus, userAggregatedWordsStatus];
  const isLoadingSomeData = entityStatuses.some((status) => [Status.Idle, Status.Loading].includes(status));
  const hasSomeError = entityStatuses.some((status) => status === Status.Failed);
  const hasLoadedAllData = entityStatuses.every((status) => status === Status.Succeeded);

  let content = null;
  if (isLoadingSomeData) {
    content = 'Загрузка';
  } else if (hasSomeError) {
    if (wordsError || userAggregatedWordsError) {
      content = <p>Error: {wordsError || userAggregatedWordsError}</p>;
    }
  } else if (hasLoadedAllData) {
    if (wordsData) {
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
      content = (
        <div>
          <div className="cards">{cardElements}</div>
          <Pagination currentPage={currentPage} onPreviousClick={openPreviousPage} onNextClick={openNextPage} />
        </div>
      );
    }
  } else {
    throw new Error('Unmatched case');
  }

  return (
    <div className="group-page">
      <h3>Уровень сложности {groupId}</h3>
      {content}
    </div>
  );
}
