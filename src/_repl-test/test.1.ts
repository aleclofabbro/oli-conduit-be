import './';
import { Services } from './../network/services';
import { appState$ } from './../network/appState';
import { GlobalFeedListValue, GlobalFeedListRequest } from './../types/services';
import { isGlobalFeedList, msg$ } from '../network/services';
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
  .mergeMap(getGlobalFeed)
  .delay(1000)
  .subscribe(msg => appState$.next({
    ...appState$.value,
    globalFeeds: msg.articles
  }));

msg$.next({
  name: Services.GlobalFeedList,
  socket: '',
  status: 'pending',
  request: {limit: 1}
});