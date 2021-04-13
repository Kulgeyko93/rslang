import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import './style.scss';
import { Status, StorageKey, UserAggregatedWord, Word } from '../../types';
import { usePagination, useRequest } from '../../hooks';
import { fetchWords, fetchUserAggregatedWords } from '../../api';
import { selectAuthData, selectAuthStatus } from '../../features/auth/authSlice';
import WordCards from './components/WordCards';
import Pagination from './components/Pagination';
import getColorFromRgbArray from '../../utils/getColorFromRgbArray';
import { GROUP_COLORS } from '../../constants';

interface MatchParams {
  groupId: string;
}

type Props = RouteComponentProps<MatchParams>;

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
      const response = await fetchUserAggregatedWords({
        group: Number(groupId),
        page: currentPage,
        userId: authData.userId,
      });
      return response;
    }
    return null;
  };
  const {
    status: userAggregatedWordsStatus,
    data: userAggregatedWordsData,
    error: userAggregatedWordsError,
  } = useRequest<UserAggregatedWord[] | null>(boundedFetchUserAggregatedWords, [authStatus, currentPage]);

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
      content = (
        <div>
          <WordCards wordsData={wordsData} userAggregatedWordsData={userAggregatedWordsData} authData={authData} />
          <Pagination currentPage={currentPage} onPreviousClick={openPreviousPage} onNextClick={openNextPage} />
        </div>
      );
    }
  } else {
    throw new Error('Unmatched case');
  }

  return (
    <div className="group-page">
      <h3 style={{ backgroundColor: getColorFromRgbArray(GROUP_COLORS[Number(groupId)]) }}>
        Уровень сложности {groupId}
      </h3>
      {content}
    </div>
  );
}
