export enum RequestStatus {Issued = 'issued', Value = 'value', Ended = 'end', Error = 'error'}
type ServiceRequestBase<Request> = {
  socket: string;
  request: Request;
};
export type ServiceRequestIssued<Request> = ServiceRequestBase<Request> & {
  status: RequestStatus.Issued;
};
export type ServiceRequestEnded<Request> = ServiceRequestBase<Request> & {
  status: RequestStatus.Ended | RequestStatus.Error;
};
export type ServiceRequestValue<Request, Value> = ServiceRequestBase<Request> & {
  status: RequestStatus.Value;
  value: Value;
};
export type ServiceRequestError<Request, Error> = ServiceRequestBase<Request> & {
  status: RequestStatus.Error;
  error: Error;
};

export type ServiceRequest<Name, Request, Value, Error> =
  (
    ServiceRequestIssued<Request> |
    ServiceRequestValue<Request, Value> |
    ServiceRequestEnded<Request> |
    ServiceRequestError<Request, Error>
  ) & { name: Name };
