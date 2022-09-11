export interface PageResponse<T> {
  content: T[];
  long: number;
  totalPage: number;
  page: number;
  size: number;
}
