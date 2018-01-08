import { GlobalFeedListService } from './types/services';
import { msg$ } from './network/services-directory';
// import { GlobalFeedListService } from './types/services';
// import { RequestStatus } from './types/services-directory';
import appState$ from './network/appState';

appState$
  .subscribe(state => {
    const date = new Date();
    const dateTag = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // tslint:disable-next-line:no-console
    console.log(dateTag, state);
    // tslint:disable-next-line:no-any
    (global as any).state = state;
  });

msg$.subscribe(console.log);
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
(global as any).x = x;