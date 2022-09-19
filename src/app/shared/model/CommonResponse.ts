export interface CommonResponse<T> {
  code: number;
  status: string
  message: string;
  data: T
}
