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
