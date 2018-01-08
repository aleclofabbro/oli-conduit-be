import { BehaviorSubject } from '@reactivex/rxjs';
import { Article } from '../types/data/index';

export type AppState = {
  globalFeeds: Article[];
  myFeeds: Article[];
};

export const defaultState: AppState = {
  myFeeds: [],
  globalFeeds: []
};

export const appState$ = new BehaviorSubject<AppState>(defaultState);