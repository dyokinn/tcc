import { useState } from "react"
import CustomDrawer from "../../components/CustomDrawer"
import SearchBar from "../../components/SearchBar"
import api from "../../assets/api"
import CustomTable from "../../components/Common/CustomTable"
import IScope from "../../assets/commonInterfaces/IScope"
import IText from "../../assets/commonInterfaces/IText"
import IRowScore from "../../assets/commonInterfaces/IRowScore"

const TextAnalysis = () => {

    const [scope, setScope] = useState<IScope | null>(null)
    const [baseText, setBaseText] = useState<IText | null>(null)
    const [minScore, setMinScore] = useState("")
    const [maxScore, setMaxScore] = useState("")
    const [nearOptions, setNearOptions] = useState([])
    
    const [rows, setRows] = useState<IRowScore[]>([])

    return (
        <CustomDrawer>
            <h1>Análise</h1>
            <SearchBar 
                scopeState={[scope, setScope]}
                baseTextState={[baseText, setBaseText]}
                minScoreState={[minScore, setMinScore]}
                maxScoreState={[maxScore, setMaxScore]}
                setRows={setRows}
            />
            <CustomTable
                rows={rows}
            />
        </CustomDrawer>
    )
}

export default TextAnalysis