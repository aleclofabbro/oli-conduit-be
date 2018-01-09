type ServiceRequestBase<Request> = {
  id: string;
  request: Request;
};
export type ServiceRequestIssued<Request> = ServiceRequestBase<Request> & {
  status: RequestStatus.Issued;
};
type ServiceRequestEnded<Request> = ServiceRequestBase<Request> & {
  status: RequestStatus.Ended;
};
type ServiceRequestValue<Request, Value> = ServiceRequestBase<Request> & {
  status: RequestStatus.Value;
  value: Value;
};
type ServiceRequestError<Request, Error> = ServiceRequestBase<Request> & {
  status: RequestStatus.Error;
  error: Error;
};

export enum RequestStatus {Issued = 'issued', Value = 'value', Ended = 'end', Error = 'error'}
export type ServiceRequest<Name, Request, Value, Error> =
(
  ServiceRequestIssued<Request> |
  ServiceRequestValue<Request, Value> |
  ServiceRequestEnded<Request> |
  ServiceRequestError<Request, Error>
) & { name: Name };
