import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell, Id } from "../cell.type";

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: Id[];
  data: {
    [key: string]: Cell;
  };
}

const INITIAL_STATE: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce(
  (state: CellsState = INITIAL_STATE, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const { id: cellId, direction } = action.payload;
        const cellIndex = state.order.findIndex((id) => id === cellId);
        const targetIndex = direction === "up" ? cellIndex - 1 : cellIndex + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        [state.order[cellIndex], state.order[targetIndex]] = [
          state.order[targetIndex],
          state.order[cellIndex],
        ];
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        const delteIndex = state.order.findIndex((id) => id === action.payload);
        state.order.splice(delteIndex, 1);
        return state;
      case ActionType.UPDATE_CELL:
        state.data[action.payload.id].content = action.payload.content;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        const { id, type, content } = action.payload;
        const index = state.order.findIndex((elId) => elId === id);
        const cell: Cell = {
          id: randomId(),
          type: type,
          content: content,
        };

        index < 0
          ? state.order.unshift(cell.id)
          : state.order.splice(index + 1, 0, cell.id);

        state.data[cell.id] = cell;
        return state;
      case ActionType.SET_CELLS_STATE:
        state = action.payload;
        return state;
      default:
        return state;
    }
  }
);

const randomId = () => Math.random().toString(36).substring(2, 5);

export default cellsReducer;
