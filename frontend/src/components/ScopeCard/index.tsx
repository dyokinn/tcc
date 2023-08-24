import { useState } from "react";
import CustomButton from "../Common/CustomButton"
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { Collapse } from "@mui/material";
import "./index.scss"
import useTexts from "../../hooks/useTexts";
import IScope from "../../assets/commonInterfaces/IScope";
import IText from "../../assets/commonInterfaces/IText";
import CustomTextInput from "../Common/CustomTextInput";

interface ScopeCardProps {
    scope: IScope
    isFixed?: boolean
}

const ScopeCard = (props:ScopeCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newText, setNewText] = useState("")

    const {texts, setTexts, addText, deleteText} = useTexts({
        scope: props.scope,
        setIsLoading: setIsLoading
    })

    const handleExpansion= () => {
        setTexts(props.scope.texts)
        setIsExpanded((prevState) => !prevState);
      };

    return (
        !props.isFixed && props.scope
        ?   <div className="scope-card">
                <div className="info">
                    <div className="info-box">
                        <h1>{props.scope.name}</h1>
                        <p>{props.scope.description}</p>
                    </div>
                    <div className="actions">
                        <CustomButton disabled={false} classname="edit" variant={"text"} children={<EditIcon className="icon"/>}/>
                        <CustomButton disabled={false} classname="delete" variant={"text"} children={<DeleteIcon className="icon"/>}/>
                        {
                            isExpanded
                            ? <CustomButton disabled={false} variant={"text"} onClick={handleExpansion} children={<ExpandLessIcon className="icon"/>}/>
                            : <CustomButton disabled={false} onClick={handleExpansion} variant={"text"} children={<ExpandMoreIcon className="icon"/>}/>
                        }
                    </div>
                </div>
                <Collapse in={isExpanded}>
                    <div className="expanded">
                        {texts.map((text: IText) => (
                            <div className="text-wrapper">
                                <p className="text-content" key={text.id}>{text.content}</p>
                                <CustomButton disabled={false} variant={"text"} onClick={async (e:any) => await deleteText(text.id)} children={<DeleteIcon className="icon"/>}/>
                            </div>
                        ))}
                        <div>
                            <CustomTextInput disabled={false} label={"new text"} onChange={(e: any) => setNewText(e.target.value)}/>
                            <CustomButton disabled={false} variant={"contained"} onClick={async (e:any) => await addText(newText)}>Add</CustomButton>
                        </div>
                    </div>
                </Collapse>
            </div>

        :   <div className="scope-card fixed">
                <CustomButton disabled={false} classname="add" variant={"text"} children={<AddIcon className="icon"/>}/>
            </div>
    )
}

export default ScopeCard