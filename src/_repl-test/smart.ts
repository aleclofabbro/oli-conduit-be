import { articleNode$ } from '../network/articleNode';

// tslint:disable:no-any no-console
const log = (tag: string) => (obj?: any) => console.log(tag, obj);
articleNode$.subscribe(log('articleNode$ V'), log('articleNode$ E'), log('articleNode$ C'));

setTimeout(() => {
  articleNode$.request({ articleReq: 3 });
  setTimeout(() => {
    articleNode$.request({ articleReq: 3 });
  }, 2000);
}, 10);
