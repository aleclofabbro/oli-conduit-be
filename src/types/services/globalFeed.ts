import { Article } from '../data/index';

export type Request = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
};
export type Value = {
  articles: Article[]
  articlesCount: number
};
export type Error = {
  msg: string
};
