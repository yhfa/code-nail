import { Dispatch } from 'redux';

import bundle from '../../bundler';
import { BundlesActionType } from '../action-types';
import { BundlesAction } from '../actions';

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<BundlesAction>) => {
    dispatch({
      type: BundlesActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: BundlesActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
