import Button from "@mui/material/Button";

type ButtonPropsType = {
	title: string
	onClick?:()=> void
	className?: string
}

export const ButtonComp = ({title, onClick, className}: ButtonPropsType) => {
	return (
		<Button
			size='small'
			variant="contained"
			className={className} onClick={onClick}>{title}</Button>
	)
}
