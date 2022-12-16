import produce from 'immer';
import { BundlesActionType } from '../action-types';

import { BundlesAction } from '../actions';

interface BundlesState {
  [cellId: string]:
    | {
        bundling: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

export const bundlesReducer = produce(
  (state: BundlesState = initialState, action: BundlesAction): BundlesState => {
    const { type, payload } = action;
    switch (type) {
      case BundlesActionType.BUNDLE_START: {
        state[payload.cellId] = {
          bundling: true,
          code: '',
          error: '',
        };
        return state;
      }
      case BundlesActionType.BUNDLE_COMPLETE: {
        state[payload.cellId] = {
          bundling: false,
          code: payload.bundle.code,
          error: payload.bundle.error,
        };
        return state;
      }
      default:
        return state;
    }
  },
  initialState
);
