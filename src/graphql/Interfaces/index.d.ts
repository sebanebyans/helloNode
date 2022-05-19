declare type PageInfo = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

declare type PageEdge<T> = {
  nodes: T[];
  cursor: string;
  totalCount: number;
};

declare type PageResult<T> = {
  edges: PageEdge<T>;
  pageInfo: PageInfo;
};
