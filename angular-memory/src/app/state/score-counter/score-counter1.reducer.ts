import { createReducer, on } from "@ngrx/store";
import { increment1, increment2, reset } from "./score-counter.actions";

import { initialState } from "./score-counter.state";

const _scoreCounter1Reducer = createReducer(initialState,
  on(increment1, (state) => {
    return {
      ...state,
      counter1: state.counter1 + 1
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter1: 0
    };
  })
)

export function scoreCounter1Reducer(state, action) {
  return _scoreCounter1Reducer(state, action);

}
