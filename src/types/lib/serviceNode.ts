import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
export type RequestHandler<Request, Value> = {
  (
    request: Request,
  ): Observable<Value>;
};
export interface RequestWrapper<Request> {
  serviceName: string;
  session: string;
  request: Request;
}
export interface RequestIssued<Request> extends RequestWrapper<Request> {
  status: RequestStatus.Issued;
}
export interface ResponseValue<Request, Value> extends RequestWrapper<Request> {
  status: RequestStatus.Value;
  value: Value;
}
export interface RequestCompleted<Request> extends RequestWrapper<Request> {
  status: RequestStatus.Completed;
}
export enum RequestStatus {
  Issued = 'Issued',
  Value = 'Value',
  Completed = 'Completed'
}
export function build<Request, Value>(
  serviceName: string,
  reqHandler: RequestHandler<Request, Value>
) {
  type ResponseItems =
    LocalResponseValue |
    LocalResponseCompleted;
  type ResponseObservable = Observable<ResponseItems>;
  type ServiceNodeItems = LocalResponseIssued | ResponseItems;
  // type ServiceNode = Observable<ServiceNodeItems> & { issueRequest: RequestFn };
  type LocalResponseIssued = RequestIssued<Request>;
  type LocalResponseValue = ResponseValue<Request, Value>;
  type LocalResponseCompleted = RequestCompleted<Request>;
  interface RequestFn {
    (request: Request, session?: string): ResponseObservable;
  }
  const request$ = new Subject<LocalResponseIssued>();
  const issueRequest: RequestFn = (request: Request, _session?: string) => {
    const session = `${serviceName}:${_session || Math.random()}`;
    request$.next({
      serviceName,
      session,
      request,
      status: RequestStatus.Issued
    });
    const session$ = value$
      .filter(value => value.session === session);
    const valueResponse$ = session$
      .takeWhile(value => value.status === RequestStatus.Value);
    const lastResponse$ = session$
      .filter(value => value.status === RequestStatus.Completed)
      .take(1);
    const response$ = Observable.merge(valueResponse$, lastResponse$);
    return Object.assign(response$, { session });
  }
  const value$ = request$.mergeMap(localRequest => {
    const { session, request } = localRequest;
    // const baseResp = {
    //   serviceName,
    //   session,
    //   request
    // };
    return reqHandler(request)
      .map(value => ({
        serviceName,
        session,
        request,
        status: RequestStatus.Value,
        value
      } as LocalResponseValue))
      .concat([({
        serviceName,
        session,
        request,
        status: RequestStatus.Completed
      } as LocalResponseCompleted)]);
  }).publish();
  value$.connect();
  const serviceNode$: Observable<LocalResponseValue | LocalResponseCompleted | LocalResponseIssued> = Object.assign(
    Observable.merge(value$, request$),
    {
      issueRequest
    });
  return serviceNode$;
}
