import { serviceNode } from '../types/lib/serviceNode';
import {
  ArticleRequest,
  ArticleValue,
  ArticleError
} from '../types/services/Article';

const articleNode$ = serviceNode<ArticleRequest, ArticleValue, ArticleError>();
export default articleNode$;