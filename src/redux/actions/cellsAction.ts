import { CellsActionType } from '../action-types';
import { CellDirection, CellType } from '../cell';

export interface MoveCellAction {
  type: CellsActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: CellDirection;
  };
}

export interface DeleteCellActionAction {
  type: CellsActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellBeforeAction {
  type: CellsActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    cellType: CellType;
  };
}

export interface UpdateCellAction {
  type: CellsActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type CellsAction =
  | MoveCellAction
  | DeleteCellActionAction
  | InsertCellBeforeAction
  | UpdateCellAction;