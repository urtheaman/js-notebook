import { Dispatch } from "redux";
import bundle from "../../bundler";
import { ActionType } from "../action-types";
import {
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  Action,
  SetCellsStateAction,
} from "../actions";
import { CellTypes, Direction, Id } from "../cell.type";
import { CellsState } from "../reducers/cellsReducer";

export const moveCell = (id: Id, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const updateCell = (id: Id, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: Id): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellAfter = (
  id: Id,
  type: CellTypes,
  content: string
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
      content,
    },
  };
};

export const setCellsState = (cells: CellsState): SetCellsStateAction => {
  return {
    type: ActionType.SET_CELLS_STATE,
    payload: cells,
  };
};

export const createBundle = (id: Id, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId: id,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId: id,
        bundle: result,
      },
    });
  };
};
