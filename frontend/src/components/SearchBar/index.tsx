import { SetStateAction, useEffect, useState} from "react"
import "./index.scss"
import axios from "axios"
import { Autocomplete, TextField } from "@mui/material"
import CustomSelect from "../Common/CustomSelect"
import CustomTextInput from "../Common/CustomTextInput"
import CustomButton from "../Common/CustomButton"
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    scopeState?: any[]
    baseTextState?: any[]
    minScoreState?: any[]
    maxScoreState?: any[]
    analysisTypeState?: any[]
    onSearch: () => void
    endElements?: any
}


const SearchBar = ({scopeState=[], baseTextState=[], minScoreState=[], maxScoreState=[], analysisTypeState=[], ...props}: SearchBarProps) => {
    
    const [scopes, setScopes] = useState([])
    const [scope, setScope] = scopeState
    const [baseText, setBaseText] = baseTextState
    const [minScore, setMinScore] = minScoreState
    const [maxScore, setMaxScore] = maxScoreState
    const [analysisType, setAnalysisType] = analysisTypeState

    useEffect(() => {
        async function getScopes () {
            try {
                const response = await axios.get(
                    "http://localhost:5000/scope/"
                )
                let data = response.data
                console.log(data)
                setScopes(data)
            } catch (error) {
                console.log(error)
            }
        }
        getScopes()
    }, [])

    return (
        <div id="search-bar">
            {scopeState.length === 2
                ? <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={scope}
                sx={{ width: 300 }}
                value={scope} 
                onChange={(e:any, newValue:any) => setScope(newValue)} 
                getOptionLabel={option => option.name}
                renderInput={(params) => 
                    <TextField  
                        {...params}
                        label="Scope"  
                        placeholder="select a scope"                      
                    />
                }
            />  
            : null
            }
            {baseTextState.length === 2
                ? <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={baseText}
                sx={{ width: 300 }}
                value={baseText} 
                onChange={(e:any, newValue:any) => setBaseText(newValue)} 
                getOptionLabel={option => option.name}
                renderInput={(params) => 
                    <TextField  
                        {...params}
                        label="Base Text"  
                        placeholder="select a base text"                      
                    />
                }
            />  
            : null
            }
            {minScoreState.length === 2
            ? <CustomTextInput 
                onChange={(e: { target: { value: SetStateAction<string> } }) => setMinScore(e.target.value)} 
                disabled={false} 
                label={"Min score"}
                value={minScore}
                />
            : null
            }
            {maxScoreState.length === 2
            ? <CustomTextInput 
                onChange={(e: { target: { value: SetStateAction<string> } }) => setMaxScore(e.target.value)} 
                disabled={false} 
                label={"Max score"}
                value={maxScore}
                />
            : null
            }
            {analysisType.length === 2
            ?  <CustomSelect items={[
                {
                    text: "texto-texto",
                    value: "text-to-text"
                },
                {
                    text: "texto-conceito",
                    value: "text-to-concept"
                },
            ]} value={analysisType} setValue={setAnalysisType} label="Analysis Type"/>    
            : null
            }
            <CustomButton
                variant={"contained"}
                onClick={props.onSearch}
                disabled={false}
            >
                <SearchIcon className="icon"/>
            </CustomButton>
            {props.endElements}
        </div>
    )
}

export default SearchBar