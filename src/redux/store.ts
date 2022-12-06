import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CellsActionType } from './action-types';

import { reducers } from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

store.dispatch({
  type: CellsActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    cellType: 'code',
  },
});

console.log(store.getState());
