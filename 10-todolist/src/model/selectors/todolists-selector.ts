import {RootState} from "../../app/store";
import {TodolistType} from "../../app/AppWithRedux";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists