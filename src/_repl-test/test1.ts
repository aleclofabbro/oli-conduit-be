// import { Article } from '../types/data/index';
import './';
import { appState$ } from './../network/appState';
import { Value, Request } from '../types/services/globalFeed';
import { RequestStatus } from '../types/lib/serviceRequest';
import { isServiceRequestIssued, ServicesNames, isGlobalFeedList, msg$ } from '../network/servicesDirectory';
// tslint:disable:no-console tslint:disable:no-any

const getGlobalFeed = (req: Request): Value[] => [
  {
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
    articlesCount: 1
  }
];

isServiceRequestIssued({
  name: ServicesNames.GlobalFeed,
  socket: '',
  status: RequestStatus.Value,
  request: {
    limit: 1
  },
  value: {
    articles: [],
    articlesCount: 1
  }
});

msg$
  .filter(isGlobalFeedList)
  .filter(isServiceRequestIssued)
  .do
    (x => null)
      .mergeMap(getGlobalFeed)
      .delay(1000)
      .subscribe(msg => appState$.next({
        ...appState$.value,
        globalFeeds: msg.articles
      }));

msg$
  .next({
    name: ServicesNames.GlobalFeed,
    socket: '',
    status: RequestStatus.Issued,
    request: {
      limit: 1
    }
  });