import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "../MenuButton/MenuButton";
import Switch from "@mui/material/Switch";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme} from "../../../app/app-selectors";
import {getTheme} from "../../theme/theme";
import {changeThemeAC} from "../../../app/app-reducer";

export const Header = () => {
    const themeMode = useSelector(selectTheme)

    const theme = getTheme(themeMode)

    const dispatch = useDispatch()

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === "light" ? "dark" : 'light'))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}