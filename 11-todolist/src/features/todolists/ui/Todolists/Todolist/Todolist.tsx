import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {FilterValuesType, TodolistType} from "../../../../../app/App";
import {addTaskAC} from "../../../model/tasks-reducer";
import {changeTodolistFilterAC} from "../../../model/todolists-reducer";
import {useDispatch} from "react-redux";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";


type PropsType = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: PropsType) => {
    const {title, filter, id} = todolist


    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC({title, todolistId: id}))
    }


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}
