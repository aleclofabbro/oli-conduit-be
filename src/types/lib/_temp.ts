import { Observable, Subject } from '@reactivex/rxjs/dist/package/Rx';
export type RequestHandler<Request, Value, Error> = {
  (
    request: Request,
    value: { (val: Value): void; },
    error: { (error: Error): void; },
    end: { (): void; }
  ): void;
};
export enum RequestStatus {
  Value,
  Error,
  Completed
}
interface ServiceRequestBase<Request> {
  id: string;
  request: Request;
}
// interface ServiceRequestIssued<Request> extends ServiceRequestBase<Request> {
//   status: RequestStatus.Issued;
// }
interface ServiceRequestCompleted<Request> extends ServiceRequestBase<Request> {
  status: RequestStatus.Completed;
}
interface ServiceRequestValue<Request, Value> extends ServiceRequestBase<Request> {
  status: RequestStatus.Value;
  value: Value;
}
interface ServiceRequestError<Request, Error> extends ServiceRequestBase<Request> {
  status: RequestStatus.Error;
  error: Error;
}

export function serviceNode<Request, Value, Error>() {
  // value$ è lo stream globale di values.
  const request$ = new Subject<Request>();
  const value$ = new Subject<Value>();
  const manage = (reqHandler: RequestHandler<Request, Value, Error>): Observable<Value> =>
    request$.mergeMap(request => {
      // TODO: generare un id di sessione
      const session = `${Math.random()}`;
      const subj$ = new Subject<Value>();
      reqHandler(
        request,
        // TODO: passare a value$ un {status:value, session, value}
        (value: Value) => {
          subj$.next(value);
          value$.next({
            session,
            status: RequestStatus.Value,
            value
          });
        },
        // TODO: passare a value$ un {status:error, session, error}
        (error: Error) => subj$.error(error),
        // TODO: passare a value$ un {status:end, session, error}
        () => subj$.complete()
      );
      return subj$.asObservable();
    });
  return {
    value$,
    request$,
    manage
  };
}
