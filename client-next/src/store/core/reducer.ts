import { createReducer } from 'typesafe-actions';
import { CoreState, CoreAction } from './types';
import {
  SET_LAYER,
  SET_USER,
  SHOW_AUTH_MODAL,
  CHANGE_AUTH_MODAL_MODE,
  CLOSE_AUTH_MODAL
} from './actions';
import { produce } from 'immer';

const initialState: CoreState = {
  layer: false,
  auth: {
    visible: false,
    mode: 'LOGIN',
  },
  user: null,
};

const core = createReducer<CoreState, CoreAction>(initialState, {
  [SET_LAYER]: (state, action) => ({
    ...state,
    layer: action.payload,
  }),
  [SET_USER]: (state, action) => ({
    ...state,
    user: action.payload,
  }),
  [SHOW_AUTH_MODAL]: (state, action) =>
    produce(state, draft => {
      draft.auth.mode = action.payload;
      draft.auth.visible = true;
      draft.layer = true;
    }),
  [CHANGE_AUTH_MODAL_MODE]: (state, action) =>
    produce(state, draft => {
      draft.auth.mode = action.payload;
    }),
  [CLOSE_AUTH_MODAL]: state =>
    produce(state, draft => {
      draft.auth.visible = false;
      draft.layer = false;
    }),
});

export default core;
