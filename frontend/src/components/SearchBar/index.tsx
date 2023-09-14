import { SetStateAction, useEffect, useState} from "react"
import "./index.scss"
import { Autocomplete, Collapse, TextField } from "@mui/material"
import CustomSelect from "../Common/CustomSelect"
import CustomTextInput from "../Common/CustomTextInput"
import CustomButton from "../Common/CustomButton"
import SearchIcon from '@mui/icons-material/Search';
import api from "../../assets/api"
import useNearOptions from "../../hooks/useNearOptions"
import INearOptions from "../../assets/commonInterfaces/INearOptions"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IScope from "../../assets/commonInterfaces/IScope"
import IText from "../../assets/commonInterfaces/IText"

interface SearchBarProps {
    scopeState?: any[]
    baseTextState?: any[]
    minScoreState?: any[]
    maxScoreState?: any[]
    nearOptionsState?: any[]
    setRows: any,
    endElements?: any
}


const SearchBar = ({scopeState=[], baseTextState=[], minScoreState=[], maxScoreState=[],nearOptionsState=[], ...props}: SearchBarProps) => {
    
    const [scope, setScope] = scopeState
    const [baseText, setBaseText] = baseTextState
    const [minScore, setMinScore] = minScoreState
    const [maxScore, setMaxScore] = maxScoreState
    const [scopes, setScopes] = useState<any[]>([])

    const [isExpanded, setIsExpanded] = useState(false)
    const [firstOption, setFirstOption] = useState("")
    const [secondOption, setSecondOption] = useState("")

    const {nearOptions, addOption, deleteOption} = useNearOptions()

    const handleExpansion= () => {
        setIsExpanded((prevState) => !prevState);
    };

    const getScore = async () => {
        try {
            const parsedNearOptions = nearOptions.map(opt => opt.firstOption + "|" + opt.secondOption).join("&")
            console.log(parsedNearOptions);
            
            const response = await api.get(
                "/texts/compare-by-text",
                {
                    params: {
                        scope_id: (scope as IScope).id,
                        text_id: (baseText as IText).id,
                        min_score: minScore,
                        max_score: maxScore,
                        near_options: parsedNearOptions
                    }
                }
            )
            let data = response.data
            props.setRows(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getScopes () {
            try {
                const response = await api.get(
                    "/scopes/"
                )
                let data = response.data
                setScopes(data)
            } catch (error) {
                console.log(error)
            }
        }
        getScopes()
    }, [])

    return (
        <div id="search-bar">
            <div className="row" id="main">
                <Autocomplete
                    disablePortal
                    id="scope"
                    className="autocomplete"
                    options={scopes}
                    sx={{ width: 300 }}
                    value={scope == null ? scopes[0] : scope} 
                    onChange={(e:any, newValue:any) => {
                        setScope(newValue)
                    }} 
                    getOptionLabel={option => option.name}
                    renderInput={(params) => 
                        <TextField  
                            {...params}
                            label="Scope" 
                            className="autocomplete"
                        />
                    }
                />  
                <Autocomplete
                    disablePortal
                    id="text"
                    options={scope == null ? [] : scope.texts} 
                    sx={{ width: 600 }}
                    value={baseText} 
                    onChange={(e:any, newValue:any) => setBaseText(newValue)} 
                    getOptionLabel={option => option.content}
                    renderInput={(params) => 
                        <TextField  
                            {...params}
                            label="Base Text"  
                            className="autocomplete"
                        />
                    }
                />  
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
                {
                    isExpanded
                    ? <CustomButton disabled={false} variant={"text"} onClick={handleExpansion} children={<ExpandLessIcon className="icon"/>}/>
                    : <CustomButton disabled={false} onClick={handleExpansion} variant={"text"} children={<ExpandMoreIcon className="icon"/>}/>
                }
                <CustomButton
                    variant={"contained"}
                    onClick={async e => await getScore()}
                    disabled={false}
                >
                    <SearchIcon className="icon"/>
                </CustomButton>
                {props.endElements}
            </div>
            
            <Collapse in={isExpanded}>
                    <div className="expanded">
                        <div>
                            {nearOptions.map((option: INearOptions) => (
                                <div className="text-wrapper row">
                                    <p className="text-content">"{option.firstOption}"  near  "{option.secondOption}"</p>
                                    <CustomButton disabled={false} variant={"text"} onClick={async (e:any) => await deleteOption(option.firstOption, option.secondOption)} children={<DeleteIcon className="icon"/>}/>
                                </div>
                            ))}
                        </div>
                        <div className="actions row">
                            <CustomTextInput disabled={false} label={"first term"} value={firstOption} onChange={(e: any) => setFirstOption(e.target.value)}/>
                            <CustomTextInput disabled={false} label={"second term"} value={secondOption} onChange={(e: any) => setSecondOption(e.target.value)}/>
                            <CustomButton disabled={false} variant={"outlined"} onClick={async (e:any) => await addOption(firstOption, secondOption, setFirstOption, setSecondOption)} children={<AddIcon className="icon"/>} />
                        </div>
                    </div>
            </Collapse>
        </div>
    )
}

export default SearchBar