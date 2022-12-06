import { BundlesAction } from '../actions';

interface BundlesState {
  loading: boolean;
  error: string | null;
}

const initialState: BundlesState = {
  loading: false,
  error: null,
};

export const bundlesReducer = (
  state = initialState,
  action: BundlesAction
): BundlesState => {
  switch (action.type) {
    default:
      return state;
  }
};
