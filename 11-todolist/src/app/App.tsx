import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import {useSelector} from "react-redux";
import {selectTheme} from "./app-selectors";
import {getTheme} from "../common/theme/theme";
import {Main} from "./Main";
import {Header} from "../common/components/Header/Header";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    const themeMode = useSelector(selectTheme)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default App;
