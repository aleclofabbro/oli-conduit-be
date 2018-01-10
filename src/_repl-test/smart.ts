import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import articleNode$ from '../network/articleNode';
import { ArticleError, ArticleValue,  ArticleRequest } from '../types/services/Article';
import { RequestHandler } from '../types/lib/serviceNode';

// tslint:disable:no-any
// tslint:disable:no-console
const log = (tag: string) => (obj?: any) => console.log(tag, obj);

export const articleRequestHandler:
  RequestHandler<ArticleRequest, ArticleValue, ArticleError> = (request, val, error, end) => {
  log('Handler')('req');
  const msgs = [
    // () => end(),
    () => val({
      article: {
        title: `#${request.articleReq}`
      }
    }),
    () => val(`@${request.articleReq}`),
    // () => error({
    //   articleError: 1
    // }),
    () => end(),
    () => end(),
  ];
  Observable
  .interval(200)
  .delay(100)
  .take(msgs.length)
  .subscribe(n => msgs[n]());

};

articleNode$.manage(articleRequestHandler)
  //  .subscribe(()=>{});
  .subscribe(log('Manage$ V'), log('Manage$ E'), log('Manage$ C'));
articleNode$.request$
    .subscribe(()=>{});
  //   .subscribe(log('Request$ V'), log('Request$ E'), log('Request$ C'));

articleNode$.value$
    .subscribe(()=>{});
    // .subscribe(log('value$ V'), log('value$ E'), log('value$ C'));


setTimeout(() => {
      articleNode$.doRequest({
    articleReq: 3
  });
  // .subscribe(log('val$ value'), log('val$ error'), log('val$ completed'));
}, 10);
