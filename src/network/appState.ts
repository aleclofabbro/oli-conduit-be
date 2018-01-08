import { BehaviorSubject } from '@reactivex/rxjs';
import { AppState } from '../types/data';

export const defaultState: AppState = {
  myFeeds: [],
  globalFeeds: []
};

export const appState$ = new BehaviorSubject<AppState>(defaultState);