import {TaskType} from "../../App";


const taskReducer = (state: TaskType[], action: any): TaskType[] => {
    switch(action.type) {
        case '':
            return state
        default:
            return state
    }
}