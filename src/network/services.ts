import { Subject } from '@reactivex/rxjs/dist/package/Rx';
import { GlobalFeedListService } from '../types/services';

export const globalFeedListReq$ = new Subject<GlobalFeedListService>();
