import Button from "@mui/material/Button";
import {FilterValuesType} from "./App";

type FilterButtonPropsType = {
    title: string
    filter: FilterValuesType
    onClickHandler: () => void
}
export const FilterButton = ({title, filter, activeFilterValue, onClickHandler}: FilterButtonPropsType) => {

    const color = filter === activeFilterValue ? 'secondary' : 'primary'

    return (
        <Button
            size='small'
            variant="contained"
            color="color"
            onClick={onClickHandler}
        >
            {title}
        </Button>
    )
}