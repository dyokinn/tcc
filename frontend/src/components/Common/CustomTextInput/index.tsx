import {TextField } from "@mui/material"
import "./index.scss"

interface CustomTextInputProps {
    onChange?: any,
    disabled: boolean,
    label: string,
    placeholder?: string,
    value?: string
}

const CustomTextInput = (props: CustomTextInputProps) => {
    return (
        <div className="input-wrapper" >
            <TextField
                className="custom-input"
                onChange={props.onChange}     
                variant="filled"
                label={props.label} 
                value={props.value} 
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default CustomTextInput