import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {changeTodolistFilterAC, FilterValuesType, TodolistType} from "../../../../model/todolists-reducer";
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";
import {Filter} from "../../../../../../common/enums/Filter";

type Props = {
    todolist: TodolistType
}

export const FilterTasksButtons = ({todolist}: Props) => {

    const {filter, id} = todolist

    const dispatch = useAppDispatch();

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === Filter.All ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button
                variant={filter === Filter.Active ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button
                variant={filter === Filter.Completed ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    )
}
