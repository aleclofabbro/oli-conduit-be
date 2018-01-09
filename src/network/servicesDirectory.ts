import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { ServiceRequest, RequestStatus, ServiceRequestEnded } from '../types/lib/serviceRequest';
import * as GlobalFeed from '../types/services/globalFeed';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { Scheduler } from '@reactivex/rxjs/dist/package/Rx';

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
export type GlobalFeedHandlerMsg =
  {status: RequestStatus.Error, error: GlobalFeed.Error}  |
  {status: RequestStatus.Value, value: GlobalFeed.Value} |
  {status: RequestStatus.Ended};
export interface GlobalFeedHandler {
  (req: GlobalFeed.Request):
    Observable<GlobalFeedHandlerMsg>;
}
//
//
export interface Request { service: ServicesNames.GlobalFeed; request: GlobalFeed.Request; }
export interface Handler { service: ServicesNames.GlobalFeed; handler: GlobalFeedHandler; }
export type Values = GlobalFeed.Value;
export type HandlerMsg = GlobalFeedHandlerMsg;

export type Msg = GlobalFeed;

export const msgSubj$ = new Subject<Msg>();
export const msg$ = msgSubj$; // .observeOn(Scheduler.queue);

export function issueRequest(request: Request) {
  const id: string = String(Math.random());
  const requestIssue: Msg = {
    status: RequestStatus.Issued,
    id,
    name: request.service,
    request: request.request
  };
  setImmediate(() =>
    msgSubj$.next(requestIssue)
  );
  return msg$
    .filter(msg => msg.id === id)
    // .filter(msg => isServiceRequestValue(msg))
    .mergeMap<Msg, Values>(msg => {
      switch (msg.status) {
        case RequestStatus.Value:
          return [msg.value];
        case RequestStatus.Error:
          return Observable.throw(msg.error);
        default:
          return [];
      }
    })
    .takeUntil(msg$
      .filter(msg => msg.id === id && msg.status === RequestStatus.Ended)// || isServiceRequestError(msg))
      .mapTo(true)
      .take(1)
      // .concat([true])
    );
}

export function manageRequest(handler: Handler) {
  // const [ serviceName, handler] = handler;

  return msgSubj$
    .filter(msg => msg.name === handler.service)
    .filter(msg => isServiceRequestIssued(msg))
    .mergeMap(msg =>
      handler.handler(msg)
        .mergeMap<HandlerMsg, Msg>(handlerMsg => {
          switch (handlerMsg.status) {
            case RequestStatus.Value:
              return [{
                ...msg,
                status: RequestStatus.Value,
                value: handlerMsg.value
              }];
            case RequestStatus.Error:
              return [{
                ...msg,
                status: RequestStatus.Error,
                error: handlerMsg.error
              }];
            case  RequestStatus.Ended:
              return [{
                name: msg.name,
                id: msg.id,
                request: msg.request,
                status: RequestStatus.Ended
              }];
            default:
              return [];
          }
        })
        // .concat<Msg>([{
        //   name: msg.name,
        //   id: msg.id,
        //   request: msg.request,
        //   status: RequestStatus.Ended
        // }])
        // .takeUntil(msgSubj$
        //   // .filter(msg => msg.id === id)
        //   .filter(msg => isServiceRequestEnded(msg) || isServiceRequestError(msg))
        //   .mapTo(true)
        //   .take(1)
        //   // .concat([true])
        // );
      )
    .subscribe(
      msg => msgSubj$.next(msg),
      // tslint:disable-next-line:no-console
      error => console.error(`PANIC: serviceHandler for <${handler.service}> crashed`, error),
      // error => msgSubj$.error(error),
      // tslint:disable-next-line:no-console
      () => console.log(`END: <${handler.service}>`),
    );
}
