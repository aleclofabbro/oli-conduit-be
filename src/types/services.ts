import { ServiceRequest } from './service-request';

export type GlobalFeedListRequest = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
};
export type GlobalFeedListValue = {
  // articles: Data.Article[]
  articlesCount: number
};
export type GlobalFeedListError = {
  msg: string
};
export type GlobalFeedListService<Name> = ServiceRequest<
  Name,
  GlobalFeedListRequest,
  GlobalFeedListValue,
  GlobalFeedListError
>;