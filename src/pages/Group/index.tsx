import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { DictionaryType, Status, StorageKey, UserAggregatedWord, Word } from '../../types';
import { usePagination, useRequest } from '../../hooks';
import { fetchUserAggregatedWords, fetchWords } from '../../api';
import { selectAuthData, selectAuthStatus } from '../../features/auth/authSlice';
import WordCards from './components/WordCards';
import Pagination from './components/Pagination';
import { COLORS } from '../../constants/textbook';

import './style.scss';

interface MatchParams {
  groupId: string;
  type?: DictionaryType;
}

type Props = RouteComponentProps<MatchParams>;

export default function Group(props: Props): JSX.Element {
  const { match } = props;
  const { groupId, type: dictionaryType } = match.params;
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
    let filter;
    if (dictionaryType === DictionaryType.Difficult) {
      filter = `{"$and":[{"page":${currentPage}, "userWord.difficulty":"HARD"}]}`;
    } else if (dictionaryType === DictionaryType.Deleted) {
      filter = `{"$and":[{"page":${currentPage}, "userWord.optional.isDeleted":true}]}`;
    } else {
      filter = `{"page":{"$eq":${currentPage}}}`;
    }
    if (authStatus === Status.Authorized && authData) {
      const response = await fetchUserAggregatedWords({
        group: Number(groupId),
        userId: authData.userId,
        filter,
      });
      return response;
    }
    return null;
  };
  const {
    status: userAggregatedWordsStatus,
    data: userAggregatedWordsData,
    error: userAggregatedWordsError,
  } = useRequest<UserAggregatedWord[] | null>(boundedFetchUserAggregatedWords, [
    authStatus,
    currentPage,
    dictionaryType,
  ]);

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
    if (wordsData && userAggregatedWordsData) {
      let currentWords;
      if (dictionaryType) {
        currentWords = wordsData.filter((wordData) => {
          const wordId = wordData.id;
          return userAggregatedWordsData.some((userAggregatedWord) => userAggregatedWord._id === wordId);
        });
      } else {
        currentWords = wordsData;
      }
      content = (
        <div>
          <WordCards
            wordsData={currentWords}
            userAggregatedWordsData={userAggregatedWordsData}
            authData={authData}
            dictionaryType={dictionaryType}
          />
          <Pagination currentPage={currentPage} onPreviousClick={openPreviousPage} onNextClick={openNextPage} />
        </div>
      );
    } else if (wordsData && !userAggregatedWordsData) {
      content = (
        <div>
          <WordCards
            wordsData={wordsData}
            userAggregatedWordsData={userAggregatedWordsData}
            authData={authData}
            dictionaryType={dictionaryType}
          />
          <Pagination currentPage={currentPage} onPreviousClick={openPreviousPage} onNextClick={openNextPage} />
        </div>
      );
    }
  } else {
    throw new Error('Unmatched case');
  }

  return (
    <div className="group-page">
      <h3 className={COLORS[Number(groupId)]}>Уровень сложности {groupId}</h3>
      {content}
    </div>
  );
}
