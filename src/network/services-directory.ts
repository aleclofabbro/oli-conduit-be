import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { ServiceRequest, RequestStatus } from '../types/service-request';
import { GlobalFeedListRequest, GlobalFeedListValue, GlobalFeedListError } from '../types/services';

export enum ServicesNames {
  GlobalFeedList = 'GlobalFeedList'
}

export const isServiceRequestIssued = (msg: Msg) => msg.status === RequestStatus.Issued;
export const isServiceRequestEnded = (msg: Msg) =>
  msg.status === RequestStatus.Ended || msg.status === RequestStatus.Error;
export const isServiceRequestError = (msg: Msg) => msg.status === RequestStatus.Error;
export const isServiceRequestValue = (msg: Msg) => msg.status === RequestStatus.Value;

export type GlobalFeedList = ServiceRequest<
  ServicesNames.GlobalFeedList,
  GlobalFeedListRequest,
  GlobalFeedListValue,
  GlobalFeedListError
>;
export const isGlobalFeedList = (msg: Msg): msg is GlobalFeedList => msg.name === ServicesNames.GlobalFeedList;

//

export type Msg = GlobalFeedList;

export const msg$ = new Subject<Msg>();
