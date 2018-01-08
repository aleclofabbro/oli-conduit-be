import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { ServiceRequest, RequestStatus } from '../types/lib/serviceRequest';
import * as GlobalFeed from '../types/services/globalFeed';

export const isServiceRequestIssued = (msg: Msg) => msg.status === RequestStatus.Issued;
export const isServiceRequestEnded =
  (msg: Msg) => msg.status === RequestStatus.Ended || msg.status === RequestStatus.Error;
export const isServiceRequestError = (msg: Msg) => msg.status === RequestStatus.Error;
export const isServiceRequestValue = (msg: Msg) => msg.status === RequestStatus.Value;

export enum ServicesNames {
  GlobalFeed = 'GlobalFeed'
}

export type GlobalFeed =
  ServiceRequest<ServicesNames.GlobalFeed, GlobalFeed.Request, GlobalFeed.Value, GlobalFeed.Error>;
export const isGlobalFeedList = (msg: Msg): msg is GlobalFeed => msg.name === ServicesNames.GlobalFeed;

//

export type Request = GlobalFeed.Request;

export type Msg = GlobalFeed;

export const msg$ = new Subject<Msg>();

export const issueRequest = (request: Request) => {
  msg$.next();
};