import { createReducer, on } from "@ngrx/store";
import { changeState } from "./game-state.actions";
import { initialState } from "./game-state.state";

const _gameStateReducer = createReducer(initialState,
  on(changeState, (state) => {
    return {
      ...state,
      currentState: 'done'
    };
  }),

)

export function gameStateReducer(state, action) {
  return _gameStateReducer(state, action);

}
