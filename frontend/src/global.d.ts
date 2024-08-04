export {};

declare global {
  interface ApiListResponse<T> {
    data: T[];
    meta: {
      _total: number;
    };
  }

  interface ApiDetailsResponse<T> {
    data: T;
  }
}
