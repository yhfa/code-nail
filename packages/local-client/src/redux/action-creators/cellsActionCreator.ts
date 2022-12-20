import { Dispatch } from 'redux';
import axios from 'axios';

import { RootState } from '../';
import { CellsActionType } from '../action-types';
import {
  InsertCellAfterAction,
  UpdateCellAction,
  MoveCellAction,
  DeleteCellActionAction,
  CellsAction,
} from '../actions';
import { Cell, CellDirection, CellType } from '../cell';

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: CellsActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      cellType,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: CellsActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const moveCell = (
  id: string,
  direction: CellDirection
): MoveCellAction => {
  return {
    type: CellsActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellActionAction => {
  return {
    type: CellsActionType.DELETE_CELL,
    payload: id,
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<CellsAction>) => {
    dispatch({
      type: CellsActionType.FETCH_CELLS,
    });

    try {
      const { data }: { data: { data: { cells: Cell[] } } } = await axios.get(
        '/cells'
      );

      dispatch({
        type: CellsActionType.FETCH_CELLS_COMPLETE,
        payload: data.data.cells,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CellsActionType.FETCH_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<CellsAction>, getState: () => RootState) => {
    const { data, order } = getState().cells;
    const cells = order.map((id) => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CellsActionType.SAVE_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};
