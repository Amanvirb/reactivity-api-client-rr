export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResponse<T> {
  items: T;
  pagination: Pagination;

  constructor(items: T, Pagination: Pagination) {
    this.items = items;
    this.pagination = Pagination;
  }
}

export class PagingParams {
  pageNumber;
  pageSize;

  constructor(pageNumber = 1, pageSize = 2) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
