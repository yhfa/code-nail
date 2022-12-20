import produce from 'immer';

import { CellsActionType } from '../action-types';
import { CellsAction } from '../actions';
import { Cell } from '../cell';

interface cellsState {
  data: { [cellId: string]: Cell };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: cellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

export const cellsReducer = produce(
  (state: cellsState = initialState, action: CellsAction): cellsState => {
    const { type, payload } = action;
    switch (type) {
      case CellsActionType.SAVE_CELLS_ERROR: {
        state.error = payload;
        return state;
      }
      case CellsActionType.FETCH_CELLS: {
        state.loading = true;
        state.error = null;
        return state;
      }
      case CellsActionType.FETCH_CELLS_COMPLETE: {
        state.loading = false;
        state.order = payload.map((cell) => cell.id);

        state.data = payload.reduce((prevCells, currentCell) => {
          prevCells[currentCell.id] = currentCell;
          return prevCells;
        }, {} as cellsState['data']);
        return state;
      }
      case CellsActionType.FETCH_CELLS_ERROR: {
        state.loading = false;
        state.error = payload;
        return state;
      }
      case CellsActionType.INSERT_CELL_AFTER: {
        const { id, cellType } = payload;

        const index = state.order.findIndex((cellId) => cellId === id);
        const cell: Cell = {
          id: generateRandomId(),
          type: cellType,
          content: '',
        };

        if (index === -1) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(index + 1, 0, cell.id);
        }

        state.data[cell.id] = cell;

        return state;
      }
      case CellsActionType.MOVE_CELL: {
        const { id, direction } = payload;
        const index = state.order.findIndex((cellId) => cellId === id);

        if (index === -1) return state;
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1)
          return state;

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = id;

        return state;
      }

      case CellsActionType.UPDATE_CELL: {
        const { id, content } = payload;
        state.data[id].content = content;
        return state;
      }

      case CellsActionType.DELETE_CELL: {
        delete state.data[payload];
        state.order = state.order.filter((cellId) => cellId !== payload);
        return state;
      }

      default:
        return state;
    }
  },
  initialState
);

const generateRandomId = () => Math.random().toString(36).substring(2, 7);
