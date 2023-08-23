import Button from '@mui/material/Button';
import "./index.scss"

interface CustomButtonProps {
    onClick?: (e: any) => void,
    disabled: boolean,
    variant: "text" | "outlined" | "contained",
    classname?: string,
    endIcon?: any ,
    children?: React.ReactNode ,
    component?: string
}

const CustomButton = (props: CustomButtonProps) => {
    return (
        <>
            {props.endIcon !== undefined
            ? <Button
                className={'button ' + props.classname}
                onClick={props.onClick}
                variant={props.variant}
                disabled={props.disabled}
                endIcon={props.endIcon}
            >
                {props.children}
            </Button>
            : <Button
                className={'button ' + props.classname}
                onClick={props.onClick}
                variant={props.variant}
                disabled={props.disabled}
                component="label"
            >
                {props.children}
            </Button>
            }
            
        </>
    )
}

export default CustomButton