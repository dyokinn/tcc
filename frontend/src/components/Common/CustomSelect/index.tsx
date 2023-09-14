import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import "./index.scss"

interface SelectProps {
    items: {
        value: string,
        text: string
    }[],
    value: string,
    label: string,
    setValue: any,
}

const CustomSelect = (props:SelectProps) => {
    return (
        <FormControl sx={{ minWidth: 130, maxHeight: 40}}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select sx={{height: 40}}
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
                label={props.label}
                id="demo-simple-select"
                className="select"
                autoWidth

            >
            {props.items.map(item => (
                <MenuItem value={item.value}>{item.text}</MenuItem>
            ))}
            
            </Select>
        </FormControl>
    )
}

export default CustomSelect