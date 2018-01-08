import { Article } from './data';

export type GlobalFeedListRequest = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
};
export type GlobalFeedListValue = {
  articles: Article[]
  articlesCount: number
};
export type GlobalFeedListError = {
  msg: string
};
