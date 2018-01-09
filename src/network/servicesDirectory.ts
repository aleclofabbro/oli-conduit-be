import { ServicesNames } from './servicesDirectory';
import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { ServiceRequest, RequestStatus } from '../types/lib/serviceRequest';
import * as GlobalFeed from '../types/services/globalFeed';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

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
export const isGlobalFeed = (msg: Msg): msg is GlobalFeed => msg.name === ServicesNames.GlobalFeed;
export interface GlobalFeedHandler { (req: GlobalFeed.Request): Observable<GlobalFeed.Value>; }

//
//
export type Request = [ServicesNames.GlobalFeed, GlobalFeed.Request];
export type Handler = [ServicesNames.GlobalFeed, GlobalFeedHandler];

export type Msg = GlobalFeed;

export const msg$ = new Subject<Msg>();

export function issueRequest(request: Request) {
  const id: string = String(Math.random());
  const requestIssue: Msg = {
    status: RequestStatus.Issued,
    id,
    name: request[0],
    request: request[1]
  };
  setImmediate(() => msg$.next(requestIssue));
  return msg$
    .filter(msg => msg.id === id)
    .filter(msg => isServiceRequestValue(msg))
    // .map(msg => msg.value)
    .takeUntil(msg$
      // .filter(msg => msg.id === id)
      .filter(msg => isServiceRequestEnded(msg) || isServiceRequestError(msg))
      .mapTo(true)
      .take(1)
      // .concat([true])
    );
}

export function manageRequest(handler: Handler) {
  return msg$
    .filter(msg => msg.name === handler[0])
    .filter(isServiceRequestIssued)
    .mergeMap(msg =>
      handler[1](msg)
      .map(value => ({
        ...msg,
        status: RequestStatus.Value,
        value
      }))
      .do(x=>x)
      .concat([{
        ...msg,
        status: RequestStatus.Ended,
      }])
      // .catch((error) => {
      //   const _ = {
      //     ...msg,
      //     status: RequestStatus.Error,
      //     error
      //   };
      // })
    )
    .subscribe(msg => msg$.next(msg as Msg));
}
