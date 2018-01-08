import * as util from 'util';
import { diffString } from 'json-diff';
import { GlobalFeedListService } from '../types/services';
import { defaultState, appState$ } from '../network/appState';

import { msg$ } from '../network/services';
// import { GlobalFeedListService } from './types/services';
// import { RequestStatus } from './types/service-request';

// tslint:disable-next-line:no-any
const log = (tag: any) => (val: any) => {
  const date = new Date();
  const dateTag = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const _val = typeof val === 'object' ? util.inspect(val, {depth: 8, colors: true}) : val;
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
  .pairwise()
  .subscribe(states => {
    log('STATE')(diffString(states[0], states[1]));
    // tslint:disable-next-line:no-any
    (global as any).state = states[1];
  });
appState$.next(defaultState);
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
  value: {articlesCount: 1, articles: []}
});
// // // tslint:disable-next-line:whitespace
// // // tslint:disable-next-line:semicolon
// tslint:disable-next-line:no-any
(global as any).appState$ = appState$; (global as any).msg$ = msg$;