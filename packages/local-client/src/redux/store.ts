import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistMiddleware } from './middleware';

import { reducers } from './reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);
