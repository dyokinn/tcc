import { useState } from "react"
import CustomDrawer from "../../components/CustomDrawer"
import SearchBar from "../../components/SearchBar"

const TextAnalysis = () => {

    const [scope, setScope] = useState("")
    const [baseText, setBaseText] = useState("")
    const [minScore, setMinScore] = useState("")
    const [maxScore, setMaxScore] = useState("")
    const [analysisType, setAnalysisType] = useState("text-to-text")

    async function getSemanticSearchResults () {

    }

    return (
        <CustomDrawer>
            <h1>Análise</h1>
            <SearchBar 
                onSearch={getSemanticSearchResults}       
                scopeState={[scope, setScope]}
                baseTextState={[baseText, setBaseText]}
                minScoreState={[minScore, setMinScore]}
                maxScoreState={[maxScore, setMaxScore]}
                analysisTypeState={[analysisType, setAnalysisType]}     
            />
        </CustomDrawer>
    )
}

export default TextAnalysis