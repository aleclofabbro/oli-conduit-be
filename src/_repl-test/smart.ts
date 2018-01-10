import articleNode$ from '../network/articleNode';
import { ArticleError, ArticleValue,  ArticleRequest } from '../types/services/Article';
import { RequestHandler } from '../types/lib/serviceNode';

export const articleRequestHandler:
  RequestHandler<ArticleRequest, ArticleValue, ArticleError> = (request, val, error, end) => {
  val({
    article: {
      title: `#${request.articleReq}`
    }
  });
  val(`@${request.articleReq}`);
  error({
    articleError: 1
  });
  end();
};
articleNode$.manage(articleRequestHandler);

articleNode$.request$.next({
  articleReq: 3
});

articleNode$.request$.subscribe(console.log, console.error, console.info);
articleNode$.value$.subscribe(console.log, console.error, console.info);