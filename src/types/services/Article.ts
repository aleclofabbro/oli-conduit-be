import { Article } from '../data/index';

export type ArticleRequest = {
  articleReq: number
};
export type ArticleValue = {
  article: Article
} | string;
export type ArticleError = {
  articleError: number
};
