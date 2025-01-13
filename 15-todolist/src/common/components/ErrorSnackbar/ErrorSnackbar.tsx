import Button from "@mui/material/Button"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { useAppSelector } from "common/hooks"
import { selectError } from "../../../app/appSelectors"
import { useDispatch } from "react-redux"
import { Alert } from "@mui/material"
import { setAppErrorAC } from "../../../app/app-reducer"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useDispatch()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppErrorAC(null))
  }

  return (
    <div>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant={"filled"}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
