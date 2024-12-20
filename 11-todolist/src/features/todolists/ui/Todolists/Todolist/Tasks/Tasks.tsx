import {TodolistType} from "../../../../../../app/App";
import List from "@mui/material/List";
import {useSelector} from "react-redux";
import {selectTasks} from "../../../../model/tasks-selector";
import {Task} from "./Task/Task";


type PropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: PropsType) => {
    const {filter, id} = todolist

    const tasks = useSelector(selectTasks)

    const allTodolistTasks = tasks[id]
    let tasksForTodolist = allTodolistTasks

    if (filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }


    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map(task => {
                            return <Task key={task.id} task={task} todolist={todolist}/>
                        })}
                    </List>
            }
        </>
    )
}







