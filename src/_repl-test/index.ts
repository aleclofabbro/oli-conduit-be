import * as util from 'util';
import { GlobalFeedListService } from '../types/services';
import appState$ from '../network/appState';

import { msg$ } from '../network/services';
// import { GlobalFeedListService } from './types/services';
// import { RequestStatus } from './types/service-request';

// tslint:disable-next-line:no-any
const log = (tag: any) => (val: any) => {
  const date = new Date();
  const dateTag = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const _val = util.inspect(val, {depth: 8, colors: true});
  const msg = `
#########################
## [${tag}] ${dateTag}
#########################
${_val}
#########################
`;
  // tslint:disable-next-line:no-console
  console.log(msg);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
appState$
  .subscribe(state => {
    log('STATE')(state);
    // tslint:disable-next-line:no-any
    (global as any).state = state;
  });

msg$.subscribe(log('MSG'));
const x: GlobalFeedListService<'GlobalFeedList'> = {
// const x = {
  name: 'GlobalFeedList',
  socket: 'xxx',
  status: 'error',
  request: {limit: 2},
  error: {msg: '1'}
};
msg$.next(x);
msg$.next({
  name: 'MyFeedList',
  socket: 'xxx',
  status: 'value',
  request: {limit: 2},
  value: {articlesCount: 1}
});
// // // tslint:disable-next-line:whitespace
// // // tslint:disable-next-line:semicolon
// tslint:disable-next-line:no-any
(global as any).x = x; (global as any).msg$ = msg$;