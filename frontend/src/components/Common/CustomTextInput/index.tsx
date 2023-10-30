import {TextField } from "@mui/material"
import "./index.scss"

interface CustomTextInputProps {
    onChange?: any,
    disabled: boolean,
    label: string,
    placeholder?: string,
    classname?: string,
    value?: string
}

const CustomTextInput = (props: CustomTextInputProps) => {
    return (
        <div className="input-wrapper" >
            <TextField
                className={"custom-input " + props.classname}
                onChange={props.onChange}     
                variant="filled"
                label={props.label} 
                value={props.value} 
                placeholder={props.placeholder}
                type={props.label === "password" ? "password" : "text"}
            />
        </div>
    )
}

export default CustomTextInput