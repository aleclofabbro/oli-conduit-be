export enum RequestStatus {Pending = 'pending', Value = 'value', Ended = 'ended', Error = 'error'}
type ServiceRequestBase<Request> = {
  socket: string;
  request: Request;
};
type ServiceRequestPending<Request> = ServiceRequestBase<Request> & {
  status: 'pending';
};
type ServiceRequestEnded<Request> = ServiceRequestBase<Request> & {
  status: 'ended';
};
type ServiceRequestValue<Request, Value> = ServiceRequestBase<Request> & {
  status: 'value';
  value: Value;
};
type ServiceRequestError<Request, Error> = ServiceRequestBase<Request> & {
  status: 'error';
  error: Error;
};

export type ServiceRequest<Name, Request, Value, Error> =
  (
    ServiceRequestPending<Request> |
    ServiceRequestValue<Request, Value> |
    ServiceRequestEnded<Request> |
    ServiceRequestError<Request, Error>
  ) & { name: Name };

export default ServiceRequest;