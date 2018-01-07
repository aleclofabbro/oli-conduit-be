import { ServiceRequest /*, RequestStatus*/ } from './service-request';

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
export type GlobalFeedListService/*<Name>*/ = ServiceRequest<
  // Name,
  GlobalFeedListRequest,
  GlobalFeedListValue,
  GlobalFeedListError
>;

// const x: GlobalFeedListService/*<'serv'>*/ = {
//   name: 'serv',
//   socket: 'xxx',
//   status: RequestStatus.Error,
//   request: {limit: 2},
//   error: {msg: '1'}
// };

// // // tslint:disable-next-line:semicolon
// // // tslint:disable-next-line:whitespace
// // // tslint:disable-next-line:semicolon
// const y = x