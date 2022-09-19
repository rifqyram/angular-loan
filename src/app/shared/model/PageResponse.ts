export interface PageResponse<T> {
  content: T[];
  count: number;
  totalPage: number;
  page: number;
  size: number;
}
