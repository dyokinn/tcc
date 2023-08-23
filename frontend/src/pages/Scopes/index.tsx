import { useContext, useEffect, useState } from "react"
import CustomDrawer from "../../components/CustomDrawer"
import ScopeCard from "../../components/ScopeCard"
import axios from "axios"
import IScope from "../../assets/commonInterfaces/IScope"
import "./index.scss"
import api from "../../assets/api"
import { log } from "console"
import { CustomAuthContext } from "../../contexts/useAuth"

const Scopes = () => {
    const [scopes, setScopes] = useState<IScope[]>([])
    const {userId} = useContext(CustomAuthContext);

    useEffect(() => {
        const getScopes = async () => {
            try {
                const response = await api.get(
                    "/scopes/"
                )
                console.log(response.data);
                setScopes(response.data)
            } catch (error) {
                console.log("erro")
            }
            
        }

        getScopes()
        }
    , [])

    return (
        <CustomDrawer>
            <div>
                <h1 className="">Scopes</h1>
                <div className="scope-wrapper">
                    {scopes.map( scope => (
                        <ScopeCard
                            scope = {scope}
                        />
                    ))}
                    <ScopeCard isFixed scope={{} as IScope}/>
                </div>
            </div>
        </CustomDrawer>
    )
}

export default Scopes