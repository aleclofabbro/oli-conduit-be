import { BehaviorSubject } from '@reactivex/rxjs';
import { AppState } from '../types/data';

const defaultState: AppState = {
  myFeeds: [],
  globalFeeds: []
};

const appState$ = new BehaviorSubject<AppState>(defaultState);

export default appState$;
