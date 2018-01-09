// import { Article } from '../types/data/index';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import './';
import { appState$ } from './../network/appState';
import { Value, Request } from '../types/services/globalFeed';
import { RequestStatus } from '../types/lib/serviceRequest';
import { isGlobalFeed, isServiceRequestIssued, issueRequest, msg$, ServicesNames, manageRequest } from '../network/servicesDirectory';
// tslint:disable:no-console tslint:disable:no-any

const getGlobalFeed = (req: Request) => Observable.of<Value>({
    articles: [
      {
        slug: 'string',
        title: 'string',
        description: 'string',
        body: 'string',
        tagList: ['string[]'],
        createdAt: 'string',
        updatedAt: 'string',
        favorited: true,
        favoritesCount: 1,
        author: {
          username: 'string',
          bio: 'string',
          image: 'string',
          following: true
        }
      }
    ],
    articlesCount: req.limit || 0
  })
.delay(1000);

isServiceRequestIssued({
  id: '',
  status: RequestStatus.Value,
  name: ServicesNames.GlobalFeed,
  request: {
    limit: 1
  },
  value: {
    articles: [],
    articlesCount: 1
  }
});

manageRequest([ServicesNames.GlobalFeed, getGlobalFeed]);
  // .filter(isGlobalFeed)
  // .filter(isServiceRequestIssued)
  // .do (x => null)
  // .mergeMap(getGlobalFeed)
  // // .subscribe(msg$)
  // .subscribe(msg => );

issueRequest([ServicesNames.GlobalFeed, {
  limit: 3
}])
.subscribe(
  msg => {
    console.log('VAL', msg);
    appState$.next({
      ...appState$.value,
      // tslint:disable-next-line:no-any
      globalFeeds: (msg as any).value.articles
    });
  },
  err => console.log('ERR', err),
  () => console.log('END')
);