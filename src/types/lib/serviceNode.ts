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
export function serviceNode<Request, Value, Error>() {
  // value$ è lo stream globale di values.
  const request$ = new Subject<Request>();
  const value$ = new Subject<Value>();
  const manage = (reqHandler: RequestHandler<Request, Value, Error>): Observable<Value> =>
    // TODO: generare un id di sessione
    request$.mergeMap(request => {
      const subj$ = new Subject<Value>();
      reqHandler(
        request,
        // TODO: passare a value$ un {status:value, session, value}
        (value: Value) => subj$.next(value),
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
