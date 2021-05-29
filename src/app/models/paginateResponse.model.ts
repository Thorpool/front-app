class IPaginateResponse <T> {
  data: T;
  current_page: string;
  per_page: number;
  last_page: number;
  total: number;
}
