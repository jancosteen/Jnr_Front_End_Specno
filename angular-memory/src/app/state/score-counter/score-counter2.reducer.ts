import { createReducer, on } from "@ngrx/store";
import {increment2, reset } from "./score-counter.actions";

import { initialState } from "./score-counter.state";

const _scoreCounter2Reducer = createReducer(initialState,
  on(increment2, (state) => {
    return {
      ...state,
      counter2: state.counter2 + 1
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter2: 0
    };
  })
)

export function scoreCounter2Reducer(state, action) {
  return _scoreCounter2Reducer(state, action);

}
