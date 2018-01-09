interface ServiceRequestBase<Request> {
  id: string;
  request: Request;
}
export interface ServiceRequestIssued<Request> extends ServiceRequestBase<Request> {
  status: RequestStatus.Issued;
}
export interface ServiceRequestEnded<Request> extends ServiceRequestBase<Request> {
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
export type ServiceRequest<Name, Request, Value, Error> =
  (
    ServiceRequestIssued<Request> |
    ServiceRequestValue<Request, Value> |
    ServiceRequestEnded<Request> |
    ServiceRequestError<Request, Error>
  ) & { name: Name };

// const x: ServiceRequestEnded<number> = {
//   status: RequestStatus.Ended,
//   id: 'ddd',
//   request: 1
// };
// x=x