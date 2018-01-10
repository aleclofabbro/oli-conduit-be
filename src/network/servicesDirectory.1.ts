import { ReqIssue, ServicesNames } from './servicesDirectory';
import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import * as AmountSrvTypes from '../types/services/Amount';
import * as ArticleSrvTypes from '../types/services/Article';

interface ServiceRequestBase<Request> {
  id: string;
  request: Request;
}
interface ServiceRequestIssued<Request> extends ServiceRequestBase<Request> {
  status: RequestStatus.Issued;
}
interface ServiceRequestEnded<Request> extends ServiceRequestBase<Request> {
  status: RequestStatus.Ended;
}
interface ServiceRequestValue<Request, Value> extends ServiceRequestBase<Request> {
  status: RequestStatus.Value;
  value: Value;
}
interface ServiceRequestError<Request, Error> extends ServiceRequestBase<Request> {
  status: RequestStatus.Error;
  error: Error;
}
export enum RequestStatus {Issued = 'issued', Value = 'value', Ended = 'end', Error = 'error'}

export enum ServicesNames {
  Amount = '-AmountService-',
  Article = '-ArticleService-'
}

export type AmountServiceRequestIssued =
  ServiceRequestIssued<AmountSrvTypes.Request> & {name: ServicesNames.Amount};
export type AmountServiceRequestValue =
  ServiceRequestValue<AmountSrvTypes.Request, AmountSrvTypes.Value> & {name: ServicesNames.Amount};
export type AmountServiceRequestEnded =
  ServiceRequestEnded<AmountSrvTypes.Request> & {name: ServicesNames.Amount};
export type AmountServiceRequestError =
  ServiceRequestError<AmountSrvTypes.Request, AmountSrvTypes.Error> & {name: ServicesNames.Amount};
export type AmountServiceRequest =
  AmountServiceRequestIssued |
  AmountServiceRequestValue |
  AmountServiceRequestEnded |
  AmountServiceRequestError;

export type ArticleServiceRequestIssued =
  ServiceRequestIssued<ArticleSrvTypes.Request> & {name: ServicesNames.Article};
export type ArticleServiceRequestValue =
  ServiceRequestValue<ArticleSrvTypes.Request, ArticleSrvTypes.Value> & {name: ServicesNames.Article};
export type ArticleServiceRequestEnded =
  ServiceRequestEnded<ArticleSrvTypes.Request> & {name: ServicesNames.Article};
export type ArticleServiceRequestError =
  ServiceRequestError<ArticleSrvTypes.Request, ArticleSrvTypes.Error> & {name: ServicesNames.Article};
export type ArticleServiceRequest =
  ArticleServiceRequestIssued |
  ArticleServiceRequestValue |
  ArticleServiceRequestEnded |
  ArticleServiceRequestError;

export type Msg =
  AmountServiceRequest |
  ArticleServiceRequest;

export type ReqIssue =
  AmountServiceRequestIssued |
  ArticleServiceRequestIssued;

export type ReqValue =
  AmountServiceRequestValue |
  ArticleServiceRequestValue;

export type ReqError =
  AmountServiceRequestError |
  ArticleServiceRequestError;

export type ReqEnded =
  AmountServiceRequestEnded |
  ArticleServiceRequestEnded;

const msg$ = new Subject<Msg>();

export function manageRequestIssue(name: ServicesNames) {
  return msg$
    .filter<T>(msg => msg.status === RequestStatus.Issued)
    .filter(msg => msg.status === RequestStatus.Issued);
}

// handle(ServicesNames)

// const x = {
//   [ServicesNames.Amount] : 12
// };

// x=x

function f<A, B, C>(a: A, b: B, c: C) {
  return [a, b, c];
}

const x = f(true, 4, '');