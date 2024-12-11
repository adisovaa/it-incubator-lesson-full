import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        id,
        title,
        tasks,
        filter,
        removeTask,
        changeTodolistFilter,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        todolistId,
        removeTodolist,
        changeTodolistTitle
    } = props

    const addTaskHandler = (taskTitle: string) => {
        addTask(taskTitle, id)
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeTodolistFilter(filter, props.todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, id)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                {/*<h3>{title}</h3>*/}
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>


            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }
                            const changeTaskTitleHandler = (newTitle: string) => {
                                changeTaskTitle(task.id, newTitle, id)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'All' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('All')}/>
                <Button className={filter === 'Active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('Active')}/>
                <Button className={filter === 'Completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('Completed')}/>
            </div>
        </div>
    )
}
