export interface Result<T> {
  data: T;
  isSuccess: boolean;
  message: string;
  token?: string;
}
