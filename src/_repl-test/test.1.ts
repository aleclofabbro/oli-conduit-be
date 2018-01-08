import { RequestStatus } from '../types/service-request';
import './';
import { appState$ } from './../network/appState';
import { GlobalFeedListValue, GlobalFeedListRequest } from './../types/services';
import { ServicesNames, isGlobalFeedList, msg$, isServiceRequestIssued } from '../network/services-directory';
// tslint:disable:no-console
// tslint:disable:no-any

const getGlobalFeed = (req: GlobalFeedListRequest): GlobalFeedListValue[] => [{
  articles: [{
    slug: 'string',
    title: 'string',
    description: 'string',
    body: 'string',
    tagList: ['string[]'],
    createdAt: 'string',
    updatedAt: 'string',
    favorited: true,
    favoritesCount: 1,
    author:  {
      username: 'string',
      bio: 'string',
      image: 'string',
      following: true
    }
  }],
  articlesCount: 1
}];

msg$
  .filter(isGlobalFeedList)
  .filter(isServiceRequestIssued)
  .do(x => null)
  .mergeMap(getGlobalFeed)
  .delay(1000)
  .subscribe(msg => appState$.next({
    ...appState$.value,
    globalFeeds: msg.articles
  }));

msg$.next({
  name: ServicesNames.GlobalFeedList,
  socket: '',
  status: RequestStatus.Issued,
  request: {limit: 1}
});