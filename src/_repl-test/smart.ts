import { articleNode$ } from '../network/articleNode';

// tslint:disable:no-any no-console
const log = (tag: string) => (obj?: any) => console.log(tag, obj);
articleNode$
.subscribe(log('articleNode$ V'), log('articleNode$ E'), log('articleNode$ C'));

setTimeout(() => {
  articleNode$.issueRequest('new-article-frg5kd')
  // .subscribe(log('RESPONSE$ V'), log('RESPONSE$ E'), log('RESPONSE$ C'));
}, 100);
