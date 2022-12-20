import { Dispatch } from 'redux';

import { CellsAction } from '../actions';
import { CellsActionType } from '../action-types';
import { saveCells } from '../action-creators';
import { RootState } from '..';

let timer: number;

export const persistMiddleware =
  ({
    dispatch,
    getState,
  }: {
    dispatch: Dispatch<CellsAction>;
    getState: () => RootState;
  }) =>
  (next: (action: CellsAction) => void) =>
  (action: CellsAction) => {
    next(action);

    if (
      [
        CellsActionType.INSERT_CELL_AFTER,
        CellsActionType.UPDATE_CELL,
        CellsActionType.MOVE_CELL,
        CellsActionType.DELETE_CELL,
      ].includes(action.type)
    ) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => saveCells()(dispatch, getState), 250);
    }
  };
