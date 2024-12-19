import {RootState} from "../../app/store";
import {TasksStateType} from "../../app/AppWithRedux";

export const selectTasks = (state: RootState): TasksStateType => state.tasks