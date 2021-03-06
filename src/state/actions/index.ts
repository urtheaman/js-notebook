import { ActionType } from "../action-types";
import { Id, CellTypes } from "../cell.type";
import { CellsState } from "../reducers/cellsReducer";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: Id;
    direction: "up" | "down";
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: Id;
    content: string;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: Id;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: Id;
    type: CellTypes;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: Id;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: Id;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface SetCellsStateAction {
  type: ActionType.SET_CELLS_STATE;
  payload: CellsState;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | InsertCellAfterAction
  | BundleStartAction
  | BundleCompleteAction
  | SetCellsStateAction;
