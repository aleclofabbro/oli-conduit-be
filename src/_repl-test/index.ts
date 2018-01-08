import * as util from 'util';
import { diffString } from 'json-diff';
import { appState$ } from '../network/appState';

import { msg$ } from '../network/servicesDirectory';

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
msg$.subscribe(log('MSG'));
// // // tslint:disable-next-line:whitespace
// // // tslint:disable-next-line:semicolon
// tslint:disable-next-line:no-any
(global as any).appState$ = appState$; (global as any).msg$ = msg$;