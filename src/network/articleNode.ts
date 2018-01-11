import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import axios from 'axios';
import { build, RequestHandler } from '../types/lib/serviceNode';
import {
  ArticleRequest,
  ArticleValue,
  ArticleError
} from '../types/services/Article';
type ArticleRequestHandler = RequestHandler<ArticleRequest, ArticleValue, ArticleError>;
const baseUrl = 'https://conduit.productionready.io/api';
export const articleRequestHandler: ArticleRequestHandler =
  (slug, val, error, end) => Observable.fromPromise(axios.get<ArticleValue>(`${baseUrl}/articles/${slug}`))
    .map(resp => resp.data)
    .subscribe(val, error, end);

export const articleNode$ = build<ArticleRequest, ArticleValue, ArticleError>('articles', articleRequestHandler);
export default articleNode$;