import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { GlobalFeedListService } from '../types/services';

export enum Services {
  GlobalFeedList = 'GlobalFeedList',
  MyFeedList = 'MyFeedList'
}

export type _GlobalFeedListService = GlobalFeedListService<'GlobalFeedList'>;
export type _MyFeedListService = GlobalFeedListService<'MyFeedList'>;

export const msg$ = new Subject<
  _GlobalFeedListService |
  _MyFeedListService
>();
