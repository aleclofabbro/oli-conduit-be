import appState$ from './network/appState';

appState$
  .subscribe(state => {
    const date = new Date();
    const dateTag = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // tslint:disable-next-line:no-console
    console.log(dateTag, state);
    // tslint:disable-next-line:no-any
    (global as any).state = state;
  });
