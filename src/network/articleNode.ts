import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import axios from 'axios';
import { build, RequestHandler, RequestStatus } from '../types/lib/serviceNode';
import {
  ArticleRequest,
  ArticleValue
} from '../types/services/Article';
type ArticleRequestHandler = RequestHandler<ArticleRequest, ArticleValue>;
const baseUrl = 'https://conduit.productionready.io/api';
export const articleRequestHandler: ArticleRequestHandler =
  (slug) => Observable.fromPromise(axios.get<ArticleValue>(`${baseUrl}/articles/${slug}`))
    .map(resp => resp.data);

export const articleNode$ = build<ArticleRequest, ArticleValue>('articles', articleRequestHandler);
export default articleNode$;