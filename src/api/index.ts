import axios from 'axios';
import { Word, UserAggregatedWord } from '../types';

export async function fetchWords({ group = 0, page = 0 }: { group?: number; page?: number }): Promise<Word[]> {
  const response = await axios.get('/words', {
    params: {
      group,
      page,
    },
  });
  return response.data;
}

export async function fetchUserAggregatedWords({
  group,
  userId,
  filter,
}: {
  group: number;
  userId: string;
  filter: string;
}): Promise<UserAggregatedWord[]> {
  const response = await axios.get(`/users/${userId}/aggregatedWords`, {
    params: {
      group,
      page: 0,
      wordsPerPage: 20,
      filter,
    },
  });
  return response.data[0].paginatedResults;
}
