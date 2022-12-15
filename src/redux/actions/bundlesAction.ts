import { BundlesActionType } from '../action-types';

export interface BundleStartAction {
  type: BundlesActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: BundlesActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export type BundlesAction = BundleStartAction | BundleCompleteAction;
