import { Observable, Subject } from '@reactivex/rxjs/dist/package/Rx';
// tslint:disable:no-console
export type RequestHandler<Request, Value, Error> = {
  (
    request: Request,
    value: { (val: Value): void; },
    error: { (error: Error): void; },
    end: { (): void; }
  ): void;
};
export interface ResponseWrapper<Request> {
    name: string;
    session: string;
    request: Request;
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
  Value,
  Error,
  Completed
}
export function serviceNode<Request, Value, Error>(name: string) {
  type LocalRequestHandler = RequestHandler<Request, Value, Error>;
  type LocalRequest = {session: string, request: Request};
  type LocalResponseValue = ResponseValue<Request, Value>;
  type LocalResponseCompleted = ResponseCompleted<Request>;
  type LocalResponseError = ResponseError<Request, Error>;
  const request$ = new Subject<LocalRequest>();
  const doRequest = (request: Request, session?: string) => {
    session = `${name}:${session || Math.random()}`;
    request$.next({
      request,
      session
    });
    return session;
  };
  const value$ = new Subject<LocalResponseValue | LocalResponseError | LocalResponseCompleted>();
  const manage = (reqHandler: LocalRequestHandler): Observable<Value> =>
    request$.mergeMap(localRequest => {
      const {session, request} = localRequest;
      const baseResp = {
        name,
        session,
        request
      };
      const responseSubj$ = new Subject<Value>();
      // responseSubj$.subscribe({
      //   next: (s: Value) => console.log('+++V'),
      //   error: (d) => console.log('+++E'),
      //   complete: () => console.log('+++C')
      // });
      const isStillRunning = () => !responseSubj$.closed && !responseSubj$.isStopped;
      const handlerValue = (value: Value) => {
        // console.log('---V', isStillRunning());
        if (isStillRunning()) {
          value$.next({
            ...baseResp,
            status: RequestStatus.Value,
            value
          });
        }
        responseSubj$.next(value);
      };
      const handlerError = (error: Error) => {
        // console.log('---E', isStillRunning());
        if (isStillRunning()) {
          value$.next({
            ...baseResp,
            status: RequestStatus.Error,
            error
          });
        }
        responseSubj$.error(error);
      };
      const handlerCompleted = () => {
        // console.log('---C', isStillRunning());
        if (isStillRunning()) {
          value$.next({
            ...baseResp,
            status: RequestStatus.Completed
          });
        }
        responseSubj$.complete();
      };
      reqHandler(request, handlerValue, handlerError, handlerCompleted);

      return responseSubj$
        .asObservable();
    });
  return {
    value$,
    request$,
    doRequest,
    manage
  };
}
