export enum Status {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
  Authorized = 'AUTHORIZED',
}

export enum StorageKey {
  Auth = 'auth',
  Statistics = 'statistics',
  AuthTime = 'auth_time',
  GroupPageIndex = 'group_page_index',
}

export interface EntityState<T> {
  status: Status;
  data: T | null;
  error: string | undefined;
}

export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export enum Difficulty {
  Easy = 'EASY',
  Hard = 'HARD',
}

export interface UserWord {
  difficulty?: Difficulty;
  optional?: {
    isDeleted: boolean;
  };
}

export interface UserAggregatedWord extends Word {
  _id: string;
  userWord: UserWord;
}

export interface Settings {
  showTranslations: boolean;
  showControls: boolean;
}
