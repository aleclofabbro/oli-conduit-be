export enum RequestStatus {Pending, Value, Ended, Error}
type ServiceRequestBase<Request> = {
  name: string;
  socket: string;
  status: RequestStatus;
  request: Request;
};
type ServiceRequestPending<Request> = ServiceRequestBase<Request> & {
  status: RequestStatus.Pending;
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

export type ServiceRequest<Request, Value, Error> =
  ServiceRequestPending<Request> |
  ServiceRequestValue<Request, Value> |
  ServiceRequestEnded<Request> |
  ServiceRequestError<Request, Error>;

export default ServiceRequest;