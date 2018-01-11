import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
export type RequestHandler<Request, Value, Error> = {
  (
    request: Request,
    value: { (val: Value): void; },
    error: { (error: Error): void; },
    end: { (): void; }
  ): void;
};
export interface ResponseWrapper<Request> {
  serviceName: string;
  session: string;
  request: Request;
}
export interface ResponseIssued<Request> extends ResponseWrapper<Request> {
  status: RequestStatus.Issued;
}
export interface ResponseValue<Request, Value> extends ResponseWrapper<Request> {
  status: RequestStatus.Value;
  value: Value;
}
export interface ResponseCompleted<Request> extends ResponseWrapper<Request> {
  status: RequestStatus.Completed;
}
export interface ResponseError<Request, Error> extends ResponseWrapper<Request> {
  status: RequestStatus.Error;
  error: Error;
}

export enum RequestStatus {
  Issued = 'Issued',
  Value = 'Value',
  Error = 'Error',
  Completed = 'Completed'
}
export function build<Request, Value, Error>(
  serviceName: string,
  reqHandler: RequestHandler<Request, Value, Error>
) {
  type ResponseItems =
    LocalResponseValue |
    LocalResponseCompleted |
    LocalResponseError;
  type Response = Observable<ResponseItems> & { session: string };
  type ServiceNodeItems = LocalResponseIssued | ResponseItems;
  type ServiceNode = Observable<ServiceNodeItems> & { issueRequest: RequestFn };
  type LocalResponseIssued = ResponseIssued<Request>;
  type LocalResponseValue = ResponseValue<Request, Value>;
  type LocalResponseCompleted = ResponseCompleted<Request>;
  type LocalResponseError = ResponseError<Request, Error>;
  interface RequestFn {
    (request: Request, session?: string): Response;
  }
  const request$ = new Subject<LocalResponseIssued>();
  const issueRequest: RequestFn = (request: Request, _session?: string) => {
    const session = `${serviceName}:${_session || Math.random()}`;
    // setTimeout(() => {
    request$.next({
      serviceName,
      session,
      request,
      status: RequestStatus.Issued
    });
    // }, 0);
    const session$ = value$
      .filter(value => value.session === session);
    const valueResponse$ = session$
      .takeWhile(value => value.status === RequestStatus.Value);
    const lastResponse$ = session$
      .filter(value => value.status === RequestStatus.Completed || value.status === RequestStatus.Error)
      .take(1);
    const response$ = Observable.merge(valueResponse$, lastResponse$);
    return Object.assign(response$, { session });
  };
  const value$ = request$.mergeMap(localRequest => {
    const { session, request } = localRequest;
    const baseResp = {
      serviceName,
      session,
      request
    };
    const responseSubj$ = new Subject<LocalResponseValue | LocalResponseError | LocalResponseCompleted>();
    const isStillRunning = () => !responseSubj$.closed && !responseSubj$.isStopped;
    const handlerValue = (value: Value) => {
      if (isStillRunning()) {
        responseSubj$.next({
          ...baseResp,
          status: RequestStatus.Value,
          value
        });
      }
    };
    const handlerError = (error: Error) => {
      if (isStillRunning()) {
        responseSubj$.next({
          ...baseResp,
          status: RequestStatus.Error,
          error
        });
        responseSubj$.complete();
      }
    };
    const handlerCompleted = () => {
      if (isStillRunning()) {
        responseSubj$.next({
          ...baseResp,
          status: RequestStatus.Completed
        });
        responseSubj$.complete();
      }
    };
    reqHandler(request, handlerValue, handlerError, handlerCompleted);
    return responseSubj$;
  }).publish();
  value$.connect();
  const serviceNode$: ServiceNode = Object.assign(
    Observable.merge(value$, request$),
    {
      issueRequest
    });
  return serviceNode$;
}
