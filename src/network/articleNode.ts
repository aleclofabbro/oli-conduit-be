import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { serviceNode, RequestHandler } from '../types/lib/serviceNode';
import {
  ArticleRequest,
  ArticleValue,
  ArticleError
} from '../types/services/Article';
type ArticleRequestHandler = RequestHandler<ArticleRequest, ArticleValue, ArticleError>;
// tslint:disable-next-line:no-console no-any
const log = (tag: string) => (obj?: any) => console.log(tag, obj);

export const articleRequestHandler: ArticleRequestHandler = (request, val, error, end) => {
  log('Handler')('req');
  const msgs = [
    // () => error({
    //   articleError: 1
    // }),
    // () => end(),
    () => val({
      article: {
        title: `#${request.articleReq}`
      }
    }),
    // () => end(),
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
export const articleNode$ = serviceNode<ArticleRequest, ArticleValue, ArticleError>('articles', articleRequestHandler);
export default articleNode$;