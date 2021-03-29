export enum Status {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
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
  transcriptions: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}
