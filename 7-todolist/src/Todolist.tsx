import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
// import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button";
import {Box, Checkbox, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {filterButtonsContainerSx, filterButtonSx, getListItemSx} from "./Todolist.styles";
import {FilterButton} from "./FilterButton";


type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTask,
        updateTodolist
    } = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskCallback = (title: string) => {
        addTask(title, props.todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(props.todolistId, title)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <Typography align='center'>
                    <EditableSpan value={title} onChange={updateTodolistHandler}/>
                </Typography>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }

                            const changeTaskTitleHandler = (title: string) => {
                                updateTask(todolistId, task.id, title)
                            }

                            return (
                                <ListItem
                                    disablePadding={true}
                                    key={task.id}
                                    sx={getListItemSx(task.isDone)}
                                >
                                    <Box>
                                        <Checkbox size={'small'} checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    </Box>
                                    <IconButton aria-label="delete" onClick={removeTaskHandler} title={'x'}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                {/*<FilterButton*/}
                {/*    title={'all'}*/}
                {/*    filter={filter}*/}
                {/*    activeFilterValue={'all'}*/}
                {/*    onClickHandler={() => changeFilterTasksHandler('all')}/>*/}

                <Button
                    sx={filterButtonSx}
                    size='small'
                    variant="contained"
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterTasksHandler('all')}>All</Button>

                <Button
                    sx={filterButtonSx}
                    size='small'
                    variant="contained"
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterTasksHandler('active')}>Active</Button>

                <Button
                    sx={filterButtonSx}
                    size='small'
                    variant="contained"
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
            </Box>
        </div>
    )
}





