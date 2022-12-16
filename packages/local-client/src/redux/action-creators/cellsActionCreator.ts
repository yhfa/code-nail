import { CellsActionType } from '../action-types';
import {
  InsertCellAfterAction,
  UpdateCellAction,
  MoveCellAction,
  DeleteCellActionAction,
} from '../actions';
import { CellDirection, CellType } from '../cell';

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
