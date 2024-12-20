import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useSelector} from "react-redux";
import {selectTodolists} from "../../model/todolists-selector";

export const Todolists = () => {
    const todolists = useSelector(selectTodolists)

    return (
        <>
            {todolists.map((tl) => (
                <Grid key={tl.id}>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <Todolist todolist={tl}/>
                    </Paper>
                </Grid>
            ))}
        </>
    )
}