import { CellsActionType } from '../action-types';
import {
  InsertCellBeforeAction,
  UpdateCellAction,
  MoveCellAction,
  DeleteCellActionAction,
} from '../actions';
import { CellDirection, CellType } from '../cell';

export const InsertCellBefore = (
  id: string,
  cellType: CellType
): InsertCellBeforeAction => {
  return {
    type: CellsActionType.INSERT_CELL_BEFORE,
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
