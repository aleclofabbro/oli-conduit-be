import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { GlobalFeedListService } from '../types/services';

export enum Services {
  GlobalFeedList = 'GlobalFeedList',
  MyFeedList = 'MyFeedList'
}

export type GlobalFeedList = GlobalFeedListService<Services.GlobalFeedList>;
export const isGlobalFeedList = (msg: Msg): msg is GlobalFeedList => msg.name === Services.GlobalFeedList;

export type MyFeedList = GlobalFeedListService<'MyFeedList'>;

export type Msg =
  GlobalFeedList |
  MyFeedList |
  {name: Services, abort: string};

export const msg$ = new Subject<Msg>();
