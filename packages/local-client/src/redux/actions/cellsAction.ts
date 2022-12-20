import { CellsActionType } from '../action-types';
import { Cell, CellDirection, CellType } from '../cell';

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

export interface InsertCellAfterAction {
  type: CellsActionType.INSERT_CELL_AFTER;
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

export interface FetchCellsAction {
  type: CellsActionType.FETCH_CELLS;
  payload?: null;
}

export interface FetchCellsCompleteAction {
  type: CellsActionType.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsErrorAction {
  type: CellsActionType.FETCH_CELLS_ERROR;
  payload: string;
}

export interface SaveCellsErrorAction {
  type: CellsActionType.SAVE_CELLS_ERROR;
  payload: string;
}

export type CellsAction =
  | MoveCellAction
  | DeleteCellActionAction
  | InsertCellAfterAction
  | UpdateCellAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
