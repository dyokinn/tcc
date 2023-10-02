import { useState } from "react"
import CustomDrawer from "../../components/CustomDrawer"
import SearchBar from "../../components/SearchBar"
import api from "../../assets/api"
import CustomTable from "../../components/Common/CustomTable"
import IScope from "../../assets/commonInterfaces/IScope"
import IText from "../../assets/commonInterfaces/IText"
import IRowScore from "../../assets/commonInterfaces/IRowScore"

const TextAnalysis = () => {


    
    const [rows, setRows] = useState<IRowScore[]>([])

    return (
        <CustomDrawer>
            <h1>Análise</h1>
            <SearchBar 
                setRows={setRows}
            />
            {
                rows.length > 0
                ? <CustomTable
                    rows={rows}
                />
                : <p>No data!</p>
            }
        </CustomDrawer>
    )
}

export default TextAnalysis